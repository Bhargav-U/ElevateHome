/* 
 *  ELEVATE HOMES
 *  Author: "Bhargav-U"
 *  Code Name: ESP32 Based Home Automation System 
 *  Baud Rate: 115200 
 *  Board Name: Espressif ESP32-WROOM-32 16M 128Mbit Flash WiFi Bluetooth Module(use it as DOIT ESP32 DEVKIT V1)
 */

//Include the required libraries
#include <WiFi.h>

#include <HTTPClient.h>

#include <EEPROM.h>

#include <Adafruit_Sensor.h>

#include <DHT.h>

// Define the pin and sensor type for DHT sensor
#define DHTPIN "Put your dht pin gpio number"
#define DHTTYPE "Put your dht type"
DHT dht(DHTPIN, DHTTYPE);
float temperature, humidity;

// Flags to track the device and server status
bool deviceOnline = false;
bool serverOnline = false;

// EEPROM settings
const int eepromSize = 512;
const int eepromStartAddress = 0;

// Variables to store Wi-Fi credentials
String savedSsid = "";
String savedPassword = "";

// HTTP client for making server requests
HTTPClient http;
const char * serverAddress = "put your server url"//"http://your system ip address :8000/"; -> if if you are using your system as server
bool serverWasOffline = false;
String Room_id = "";

// Number of pins and their corresponding switch and relay pins
const int numPins = 4;
const int switchpins[numPins] = {
    switch_pin_1,
    switch_pin_2,
    switch_pin_3,
    switch_pin_4
};
const int relaypins[numPins] = {
    relay_pin_1,
    relay_pin_2,
    relay_pin_3,
    relay_pin_4
};

// State variables
String currentState = "0000"; // Current switch states
String pastState = "0000"; // Previous switch states
String relayStates = "0000"; // Relay control states

//RTOS TASKS
TaskHandle_t task1Handle = NULL;
TaskHandle_t task2Handle = NULL;

// Function to write a string to EEPROM
void writeStringToEEPROM(int addr,
    const String & data) {
    for (int i = 0; i < eepromSize; i++) {
        EEPROM.write(i, 0); // Clear the EEPROM
    }

    for (size_t i = 0; i < data.length(); i++) {
        EEPROM.write(addr + i, data[i]); // Write the string to EEPROM
    }
    EEPROM.write(addr + data.length(), 0); // Null-terminate the string
    EEPROM.commit();
}

// Function to read a string from EEPROM
String readStringFromEEPROM(int addr) {
    String data = "";
    char c;
    do {
        c = EEPROM.read(addr);
        if (c != 0) {
            data += c;
            addr++;
        }
    } while (c != 0);
    return data;
}

// Function to connect to Wi-Fi
bool connectToWiFi(const char * ssid,
    const char * password) {
    WiFi.begin(ssid, password);
    int attempt = 0;
    while (WiFi.status() != WL_CONNECTED && attempt < 5) {
        Serial.println("Connecting to WiFi...");
        attempt++;
        delay(1000);
    }
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Connected to WiFi");
        deviceOnline = true;
    }
    return WiFi.status() == WL_CONNECTED;
}

// Function to write Wi-Fi credentials to EEPROM
void writeWiFiCredentialsToEEPROM(const String & json) {
    writeStringToEEPROM(eepromStartAddress, json);
}

//Function to create a handshake between teh device and server
void sendMacHandshake() {
    uint8_t mac[6];
    WiFi.macAddress(mac);

    String macAddress = "";
    for (int i = 0; i < 6; i++) {
        macAddress += String(mac[i], 16);
        if (i < 5) {
            macAddress += ":";
        }
    }

    String jsonData = "{\"Mac\":\"" + macAddress + "\"}";

    http.begin(serverAddress);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
        String response = http.getString();

        if (response.indexOf("Room_id") != -1) {
            int startIdx = response.indexOf("Room_id") + 9;
            int endIdx = response.lastIndexOf("}");
            String room_id_str = response.substring(startIdx, endIdx);
            Room_id = room_id_str;
        }
    }

    http.end();
}

// Function to check device status
void checkDeviceStatus() {
    if (WiFi.status() == WL_CONNECTED) {
        deviceOnline = true;
    } else {
        deviceOnline = false;
    }
}

// Function to check server status
void checkServerStatus() {
    checkDeviceStatus();
    Serial.println("Checking server status...");
    if (deviceOnline) {
        if (http.begin(serverAddress)) {
            int httpCode = http.GET();
            if (httpCode == 200) {
                String serverResponse = http.getString();
                if (serverResponse.indexOf("Server alive!") != -1) {
                    serverOnline = true;
                    sendMacHandshake();
                }
            } else {
                serverOnline = false;
            }
            http.end();
        }
    } else {
        Serial.println("Failed to connect to the server");
        serverOnline = false;
    }
    if (!serverOnline) {
        serverWasOffline = true;
    }
    if (serverWasOffline && serverOnline) {
        String postData = "{\"Case\": 1, \"Room\": \"" + Room_id + "\", \"States\": \"" + currentState + "\"}";
        serverWasOffline = false;
        http.begin(serverAddress);
        http.addHeader("Content-Type", "application/json");
        http.POST(postData);
        http.end();
        Serial.println("Server was offline, now it's back online");
    }
}

// Function to print device and server status
void printStatus() {
    Serial.print("Device Status: ");
    Serial.println(deviceOnline ? "Online" : "Offline");
    Serial.print("Server Status: ");
    Serial.println(serverOnline ? "Online" : "Offline");
}

// Function to handle Wi-Fi
void handleWiFi() {
    // Extract Wi-Fi credentials from EEPROM
    String savedJson = readStringFromEEPROM(eepromStartAddress);
    int ssidStart = savedJson.indexOf("Ssid") + 7;
    int ssidEnd = savedJson.indexOf("\",\"Password\"");
    int passwordStart = savedJson.indexOf("Password") + 11;
    int passwordEnd = savedJson.length() - 2;
    savedSsid = savedJson.substring(ssidStart, ssidEnd);
    savedPassword = savedJson.substring(passwordStart, passwordEnd);
    Serial.println("WiFi details from EEPROM:");
    Serial.println("SSID: " + savedSsid);
    Serial.println("Password: " + savedPassword);

    // Try connecting with saved credentials
    if (connectToWiFi(savedSsid.c_str(), savedPassword.c_str())) {
        Serial.println("Saved credentials worked, attempting to proceed to server verification");

        http.begin(serverAddress);
        http.addHeader("Content-Type", "application/json");
        String jsonData = "{\"Case\": 6, \"Room\": \"" + Room_id + "\", \"Request\": \"5\"}";
        String serverSsid = "";
        String serverPassword = "";
        String serverResponse = "";

        int httpResponseCode = http.POST(jsonData);

        if (httpResponseCode == HTTP_CODE_OK) {
            serverOnline = true;
            serverResponse = http.getString();
            int serverSsidStart = serverResponse.indexOf("ssid") + 8;
            int serverSsidEnd = serverResponse.indexOf("\",\"password\"");
            int serverPasswordStart = serverResponse.indexOf("password") + 12;
            int serverPasswordEnd = serverResponse.length() - 2;

            serverSsid = serverResponse.substring(serverSsidStart, serverSsidEnd);
            serverPassword = serverResponse.substring(serverPasswordStart, serverPasswordEnd);

            Serial.println("WiFi details from Server:");
            Serial.println("SSID: " + serverSsid);
            Serial.println("Password: " + serverPassword);

            if (serverSsid != savedSsid || serverPassword != savedPassword) {
                Serial.println("Trying server credentials");
                if (connectToWiFi(serverSsid.c_str(), serverPassword.c_str())) {
                    writeWiFiCredentialsToEEPROM(serverResponse);
                    ESP.restart();
                } else {
                    Serial.println("Server credentials are wrong, trying saved ones");
                    connectToWiFi(savedSsid.c_str(), savedPassword.c_str());
                }
            } else {
                Serial.println("Server and device credentials match");
            }
        } else {
            Serial.println("Server was offline");
            serverOnline = false;
        }
    }
}

// Function to control relays
void controlRelays(String state) {
    for (int i = 0; i < numPins; i++) {
        int relayState = state.charAt(i) - '0'; // Convert char to integer
        digitalWrite(relaypins[i], relayState);
    }
}

// Function to get switch states
void getSwitchStates() {
    if (pastState != currentState) {
        pastState = currentState;
        Serial.println("State changed to: " + currentState);
        if (deviceOnline && serverOnline) {
            String postData = "{\"Case\": 1, \"Room\": \"" + Room_id + "\", \"States\": \"" + currentState + "\"}";

            http.begin(serverAddress);
            http.addHeader("Content-Type", "application/json");

            int httpResponseCode = http.POST(postData);

            if (httpResponseCode > 0) {
                String response = http.getString();
                Serial.println("HTTP Response Code: " + String(httpResponseCode));
                Serial.println("Response: " + response);
            } else {
                Serial.println("Error on HTTP request");
            }

            http.end();
        } else {
            Serial.println("Server offline, post data not sent");
        }
    }
}

// Function to ask for relay states from the server
void askForRelayStates() {
    String jsonData = "{\"Case\": 6, \"Room\": \"" + Room_id + "\", \"Request\": \"1\"}";

    http.begin(serverAddress);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("HTTP Response Code: " + String(httpResponseCode));
        Serial.println("Response: " + response);

        // Extract the relay states from the response and update relayStates
        int startIdx = response.indexOf("\"State\":\"") + 9;
        int endIdx = response.lastIndexOf("\"}");
        relayStates = response.substring(startIdx, endIdx);

        // Remove commas to get "0000" format
        relayStates.replace(",", "");

        Serial.println("Relay States: " + relayStates);
    } else {
        Serial.println("Error on HTTP request");
    }

    http.end();
}

// Function to send sensor data to the server
void sendSensorDataToServer() {
    if (deviceOnline && serverOnline) {
        temperature = dht.readTemperature();
        humidity = dht.readHumidity();

        HTTPClient http;
        http.begin(serverAddress);
        http.addHeader("Content-Type", "application/json");
        String jsonPayload = "{\"Case\": 5, \"Room\": \"" + Room_id + "\", \"Sensor\": \"1\", \"Sensor_name\": \"DHT\", \"Readings\": \"t/" + String(temperature) + "/h/" + String(humidity) + "\"}";
        int httpResponseCode = http.POST(jsonPayload);

        if (httpResponseCode > 0) {
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
        } else {
            Serial.print("HTTP Error: ");
            Serial.println(httpResponseCode);
        }

        http.end();
    } else {
        Serial.println("Server or device offline sensor data not sent");
    }
}

//RTOS task handling local logic(switches)
void Manual(void * pvParameters) {
    while (1) {
        String newState = "";
        for (int i = 0; i < numPins; i++) {
            newState += String(digitalRead(switchpins[i]));
        }
        if (newState != currentState) {
            currentState = newState;
            relayStates = currentState;
            Serial.println("local action handled!");
            controlRelays(relayStates);
        }

        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

//RTOS task handling connection logic(wifi automation logic)
void Connected(void * pvParameters) {
    while (1) {
        checkServerStatus();
        printStatus();
        if (!deviceOnline) {
            handleWiFi();
        }
        getSwitchStates();
        sendSensorDataToServer();
        if (!serverOnline) {
            relayStates = currentState;
        } else {
            askForRelayStates();
            controlRelays(relayStates);
        }

        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200); // Initialize serial communication with baud rate 115200
    dht.begin();
    for (int i = 0; i < numPins; i++) {
        pinMode(switchpins[i], INPUT_PULLUP);
    }

    String newState = "";
    for (int i = 0; i < numPins; i++) {
        newState += String(digitalRead(switchpins[i]));
    }
    currentState = newState;
    for (int i = 0; i < numPins; i++) {
        pinMode(relaypins[i], OUTPUT); // Set relay pins to OUTPUT
    }

    EEPROM.begin(eepromSize);
    handleWiFi();
    checkServerStatus();
    if (!serverOnline) {
        relayStates = currentState;
        controlRelays(relayStates);
    }

    xTaskCreatePinnedToCore(Manual, "Manual", 2048, NULL, 1, & task1Handle, 1);
    xTaskCreatePinnedToCore(Connected, "Connected", 4096, NULL, 1, & task2Handle, 0);

}

void loop() {
    //Nothing runs in loop,two independent tasks in two diffrent cores run the show
}
