<h1>THis is in progress updates will be made shortly</h1>

<!---Heading--->

<h1 align="center">ElevateHome</h1>
<p align="center">
  A simple home automation project using esp32
</p>

<!---Page image--->

<p align="center">
 <img src="https://5.imimg.com/data5/SELLER/Default/2021/10/KZ/JC/AR/138951723/work-from-home-solution-500x500.jpg" alt="pretty image maybe">
</p>


<!---Skill set i used for the project--->

<p align="center">
  <img src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white" alt="shields">
  <img src="https://img.shields.io/badge/espressif-E7352C?style=for-the-badge&logo=espressif&logoColor=white" alt="shields">
  <img src="https://img.shields.io/badge/adafruit-000000?style=for-the-badge&amp;logo=adafruit&amp;logoColor=white" alt="shields">
  <br>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="shields">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="shields">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="shields">
  <img src="https://img.shields.io/badge/Arduino_IDE-00979D?style=for-the-badge&logo=arduino&logoColor=white" alt="shields">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" alt="shields">
  <br>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="shields">
  <img src="https://img.shields.io/badge/PyCharm-000000.svg?&style=for-the-badge&logo=PyCharm&logoColor=wh" alt="shields">
  <img src="https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=white" alt="shields">
  <img src="https://img.shields.io/badge/Grafana-orange?style=for-the-badge" alt="shields">
</p>


<!---Code section--->

<h2>Code</h2>
<h3>ESP32 CODE:</h3>

```c++
/* 
 *  ELEVATE HOMES
 *  Authors: "Bhargav-U", [Author 2], [Author 3]
 *  Code Name: Home Automation System
 *  Baud Rate: 115200 
 *  Board Name: Espressif ESP32-WROOM-32 16M 128Mbit Flash WiFi Bluetooth Module(use DOIT ESP32 DEVKIT V1)
*/

#include <WiFi.h>

#include <HTTPClient.h>

#include <EEPROM.h>

#include <Adafruit_Sensor.h>

#include <DHT.h>

// Define the pin and sensor type for DHT sensor
#define DHTPIN 27
#define DHTTYPE DHT11
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
const char * serverAddress = "http://mylaptop:8000(using thsis port)/,give your server url,in my case server is running in local network on my laptop";
bool serverWasOffline = false;

// Number of pins and their corresponding switch and relay pins
const int numPins = 4;
//Replace with gpio pins that you used
const int switchpins[numPins] = {
    pin1,
    pin2,
    pin3,
    pin4
};
const int relaypins[numPins] = {
    pin1,
    pin2,
    pin3,
    pin4
};

// State variables
String currentState = "0000"; // Current switch states
String pastState = "0000"; // Previous switch states
String relayStates = "0000"; // Relay control states

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
        String postData = "{\"Case\": 1, \"Room\": \"1\", \"States\": \"" + currentState + "\"}";
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
        String jsonData = "{\"Case\": 6, \"Room\": \"1\", \"Request\": \"5\"}";
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
                    connectToWiFi(savedSsid.c.str(), savedPassword.c_str());
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
    String newState = "";
    for (int i = 0; i < numPins; i++) {
        newState += String(digitalRead(switchpins[i]));
    }

    if (newState != currentState) {
        currentState = newState;
        pastState = currentState;
        Serial.println("State changed to: " + currentState);
        if (deviceOnline && serverOnline) {
            String postData = "{\"Case\": 1, \"Room\": \"1\", \"States\": \"" + currentState + "\"}";

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
    String jsonData = "{\"Case\": 6, \"Room\": \"1\", \"Request\": \"1\"}";

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
        String jsonPayload = "{\"Case\": 5, \"Room\": \"1\", \"Sensor\": \"1\", \"Sensor_name\": \"DHT\", \"Readings\": \"t/" + String(temperature) + "/h/" + String(humidity) + "\"}";
        int httpResponseCode = http.POST(jsonPayload);

        if (httpResponseCode > 0) {
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
        } else {
            Serial.print("HTTP Error: ");
            Serial.println(httpResponseCode);
        }

        http.end();
    }
}

void setup() {
    Serial.begin(115200); // Initialize serial communication with baud rate 115200
    dht.begin();
    for (int i = 0; i < numPins; i++) {
        pinMode(switchpins[i], INPUT_PULLUP);
    }

    for (int i = 0; i < numPins; i++) {
        pinMode(relaypins[i], OUTPUT); // Set relay pins to OUTPUT
    }

    EEPROM.begin(eepromSize);
    handleWiFi();
}

void loop() {
    checkServerStatus();
    printStatus();
    if (!deviceOnline) {
        handleWiFi();
    }
    getSwitchStates();
    if (!deviceOnline || !serverOnline) {
        relayStates = currentState;
    } else {
        askForRelayStates();
    }
    controlRelays(relayStates);
    sendSensorDataToServer();
    delay(1000);
}

```


<h3>PHP SERVER CODE:</h3>


```php
<?php
header("Access-Control-Allow-Origin: *");
header(
    "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"
);
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Database credentials
$host = "127.0.0.1 or use remote server address";
$username = "user_name";
$password = "enter your password here";
$database = "Home_data";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Respond to the OPTIONS request with the appropriate headers
    http_response_code(200); // OK
    header("Content-Length: 0");
    header("Content-Type: text/plain");
    exit();
}

// Function to establish a database connection
function connectToDatabase($host, $username, $password, $database)
{
    $conn = new mysqli($host, $username, $password, $database);
    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }
    return $conn;
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // If it's a GET request, respond with "Server alive!"
    echo "Server alive!";
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the raw HTTP request data
    $request_data = file_get_contents("php://input");

    // Decode the JSON request data
    $json_data = json_decode($request_data, true);

    if ($json_data !== null && isset($json_data["Case"])) {
        // Establish the database connection
        $conn = connectToDatabase($host, $username, $password, $database);

        switch ($json_data["Case"]) {
            case 1:
                if (isset($json_data["Room"]) && isset($json_data["States"])) {
                    // Extract values from JSON
                    $room = $json_data["Room"];
                    $states = $json_data["States"];

                    // Check and update the Dash_data table
                    $state_chars = str_split($states);
                    foreach ($state_chars as $appliance_id => $state_char) {
                        $appliance_id++; // Appliance_id starts from 1

                        // Check if the state in JSON data matches the state in Current_home_state
                        $check_sql =
                            "SELECT State FROM Current_home_state WHERE Room_id = ? AND Appliance_id = ?";
                        $check_stmt = $conn->prepare($check_sql);
                        $check_stmt->bind_param("ii", $room, $appliance_id);
                        $check_stmt->execute();
                        $check_stmt->bind_result($current_state);
                        $check_stmt->fetch();
                        $check_stmt->close();

                        // Update the Current_home_state table
                        $update_sql =
                            "UPDATE Current_home_state SET State = ? WHERE Room_id = ? AND Appliance_id = ?";
                        $update_stmt = $conn->prepare($update_sql);
                        $update_stmt->bind_param(
                            "sii",
                            $state_char,
                            $room,
                            $appliance_id
                        );
                        $update_stmt->execute();
                    }

                    echo "Data updated successfully.";
                } else {
                    echo "Invalid JSON data or missing 'Room' or 'States' element.";
                }
                break;

            case 2:
                if (
                    isset($json_data["Ssid"]) &&
                    isset($json_data["Password"]) &&
                    isset($json_data["Label"])
                ) {
                    // Extract values from JSON
                    $ssid = $json_data["Ssid"];
                    $password = $json_data["Password"];
                    $label = $json_data["Label"];

                    // Update the Wifi_data table
                    $sql =
                        "UPDATE Wifi_data SET ssid = ?, password = ?, label = ? WHERE wifi_id = 1";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("sss", $ssid, $password, $label); // Note: "sss" for three string parameters
                    $stmt->execute();

                    echo "Data updated successfully.";
                } else {
                    echo "Invalid JSON data or missing 'ssid', 'password', or 'label' element.";
                }
                break;

            case 3:
                if (
                    isset($json_data["Room"]) &&
                    isset($json_data["Room_name"])
                ) {
                    // Extract values from JSON
                    $room = $json_data["Room"];
                    $room_name = $json_data["Room_name"];

                    // Update the Room_data table
                    $sql =
                        "UPDATE Room_data SET Room_name = ? WHERE Room_id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("si", $room_name, $room);
                    $stmt->execute();

                    echo "Data updated successfully.";
                } else {
                    echo "Invalid JSON data or missing 'Room' or 'Room_name' element.";
                }
                break;

            case 4:
                if (
                    isset($json_data["Room"]) &&
                    isset($json_data["Appliance"]) &&
                    isset($json_data["Appliance_name"])
                ) {
                    // Extract values from JSON and convert Room and Appliance to integers
                    $room = is_numeric($json_data["Room"])
                        ? (int) $json_data["Room"]
                        : $json_data["Room"];
                    $appliance = is_numeric($json_data["Appliance"])
                        ? (int) $json_data["Appliance"]
                        : $json_data["Appliance"];
                    $appliance_name = $json_data["Appliance_name"];

                    // Update the Appliance_data table
                    $sql =
                        "UPDATE Appliance_data SET Appliance_name = ? WHERE Room_id = ? AND Appliance_id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param(
                        "sii",
                        $appliance_name,
                        $room,
                        $appliance
                    );
                    $stmt->execute();

                    echo "Data updated successfully.";
                } else {
                    echo "Invalid JSON data or missing 'Room', 'Appliance', or 'Appliance_name' element.";
                }
                break;

            case 5:
                if (
                    isset($json_data["Room"]) &&
                    isset($json_data["Sensor"]) &&
                    isset($json_data["Sensor_name"]) &&
                    isset($json_data["Readings"])
                ) {
                    // Extract values from JSON and convert Room and Sensor to integers
                    $room = is_numeric($json_data["Room"])
                        ? (int) $json_data["Room"]
                        : $json_data["Room"];
                    $sensor = is_numeric($json_data["Sensor"])
                        ? (int) $json_data["Sensor"]
                        : $json_data["Sensor"];
                    $sensor_name = $json_data["Sensor_name"];
                    $sensor_readings = $json_data["Readings"];

                    // Update the Current_sensor_data table
                    $sql =
                        "UPDATE Current_sensor_data SET Sensor_name = ?, Sensor_readings = ? WHERE Room_id = ? AND Sensor_id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param(
                        "ssii",
                        $sensor_name,
                        $sensor_readings,
                        $room,
                        $sensor
                    );
                    $stmt->execute();

                    echo "Data updated successfully.";
                } else {
                    echo "Invalid JSON data or missing 'Room', 'Sensor', 'sensor name', or 'Readings' element.";
                }
                break;

            case 6:
                if (isset($json_data["Room"]) && isset($json_data["Request"])) {
                    $room = is_numeric($json_data["Room"])
                        ? (int) $json_data["Room"]
                        : $json_data["Room"];
                    $request = $json_data["Request"];

                    switch ($request) {
                        case 1:
                            // Retrieve and concatenate State values
                            $sql =
                                "SELECT GROUP_CONCAT(State) as State FROM Current_home_state WHERE Room_id = ?";
                            $stmt = $conn->prepare($sql);
                            $stmt->bind_param("i", $room);
                            $stmt->execute();
                            $result = $stmt->get_result();

                            if ($result->num_rows > 0) {
                                $row = $result->fetch_assoc();
                                $state_string = $row["State"];

                                // Create the JSON response with the State string
                                $response = ["State" => $state_string];

                                // Convert the response to JSON and echo it
                                echo json_encode($response);
                            } else {
                                echo "No data found for the specified Room.";
                            }
                            break;

                        case 2:
                            // Handle Case 2 within Case 6
                            $sql =
                                "SELECT Sensor_name, Sensor_readings FROM Current_sensor_data WHERE Room_id = ?";
                            $stmt = $conn->prepare($sql);
                            $stmt->bind_param("i", $room);
                            $stmt->execute();
                            $result = $stmt->get_result();

                            if ($result->num_rows > 0) {
                                $sensor_names = [];
                                $sensor_data = [];

                                while ($row = $result->fetch_assoc()) {
                                    $sensor_names[] = $row["Sensor_name"];
                                    $sensor_data[] = $row["Sensor_readings"];
                                }

                                // Create the JSON response with Sensor_names and Data separated by "|"
                                $response = [
                                    "Sensor_names" => implode(
                                        "|",
                                        $sensor_names
                                    ),
                                    "Data" => implode("|", $sensor_data),
                                ];

                                // Convert the response to JSON and echo it
                                echo json_encode($response);
                            } else {
                                echo "No sensor data found for the specified Room.";
                            }
                            break;

                        case 3:
                            // Handle Case 3 within Case 6
                            $sql =
                                "SELECT Room_name FROM Room_data WHERE Room_id = ?";
                            $stmt = $conn->prepare($sql);
                            $stmt->bind_param("i", $room);
                            $stmt->execute();
                            $result = $stmt->get_result();

                            if ($result->num_rows > 0) {
                                $row = $result->fetch_assoc();
                                $room_name = $row["Room_name"];

                                // Create the JSON response with Room_name
                                $response = ["Room_name" => $room_name];

                                // Convert the response to JSON and echo it
                                echo json_encode($response);
                            } else {
                                echo "No room data found for the specified Room.";
                            }
                            break;

                        case 4:
                            // Handle Case 4 within Case 6
                            $sql =
                                "SELECT Appliance_name FROM Appliance_data WHERE Room_id = ?";
                            $stmt = $conn->prepare($sql);
                            $stmt->bind_param("i", $room);
                            $stmt->execute();
                            $result = $stmt->get_result();

                            if ($result->num_rows > 0) {
                                $appliance_names = [];

                                while ($row = $result->fetch_assoc()) {
                                    $appliance_names[] = $row["Appliance_name"];
                                }

                                // Create the JSON response with Appliance names separated by "|"
                                $response = [
                                    "Appliances" => implode(
                                        "|",
                                        $appliance_names
                                    ),
                                ];

                                // Convert the response to JSON and echo it
                                echo json_encode($response);
                            } else {
                                echo "No appliance data found for the specified Room.";
                            }
                            break;

                        case 5:
                            // Handle Case 5 within Case 6
                            $sql =
                                "SELECT ssid, password FROM Wifi_data WHERE wifi_id = 1";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                $row = $result->fetch_assoc();
                                $ssid = $row["ssid"];
                                $password = $row["password"];

                                // Create the JSON response with ssid and password
                                $response = [
                                    "ssid" => $ssid,
                                    "password" => $password,
                                ];

                                // Convert the response to JSON and echo it
                                echo json_encode($response);
                            } else {
                                echo "No data found for wifi_id 1.";
                            }
                            break;

                        default:
                            echo "Invalid 'Request' value.";
                            break;
                    }
                } else {
                    echo "Invalid JSON data or missing 'Room' or 'Request' element.";
                }
                break;

            default:
                echo "Invalid 'Case' value.";
                break;
        }

        // Close the database connection
        $conn->close();
    } else {
        echo "Invalid JSON data or 'Case' element is missing.";
    }
} else {
    // For other request methods, return an error response
    http_response_code(405); // Method Not Allowed
    echo "Method not allowed.";
}
?>


```


<h3>MY SQL SETUP:</h3>


```sql


CREATE DATABASE Home_data;
USE Home_data;

CREATE TABLE Current_home_state (
  Room_id INT, Appliance_id TINYINT, 
  State TINYINT
);

INSERT INTO Current_home_state (Room_id, Appliance_id, State) 
VALUES 
  (1, 1, 1), 
  (1, 2, 1), 
  (1, 3, 1), 
  (1, 4, 1);


CREATE TABLE Current_sensor_data (
  Room_id INT, 
  Sensor_id TINYINT, 
  Sensor_name VARCHAR(255), 
  Sensor_readings VARCHAR(255)
);


INSERT INTO Current_sensor_data (
  Room_id, Sensor_id, Sensor_name, Sensor_readings
) 
VALUES 
  (1, 1, 'DHT11', '');


CREATE TABLE Wifi_data (
  wifi_id INT, 
  label VARCHAR(255), 
  ssid VARCHAR(255), 
  password VARCHAR(255)
);


INSERT INTO Wifi_data (wifi_id, label, ssid, password) 
VALUES 
  (
    1, 'College', 'SSN', 'Ssn1!Som2@Sase3#'
  );


CREATE TABLE Room_data (
  Room_id INT, 
  Room_name VARCHAR(255)
);

INSERT INTO Room_data (Room_id, Room_name) 
VALUES 
  (1, 'Testroom');

CREATE TABLE Appliance_data (
  Room_id INT, 
  Appliance_id INT, 
  Appliance_name VARCHAR(255)
);

INSERT INTO Appliance_data (
  Room_id, Appliance_id, Appliance_name
) 
VALUES 
  (1, 1, 'Device 1'), 
  (1, 2, 'Device 2'), 
  (1, 3, 'Device 3'), 
  (1, 4, 'Device 4');
  
  
CREATE TABLE Dash_data (
  Room_id INT, 
  Appliance_id INT, 
  State TINYINT(1), 
  Timestamp TIMESTAMP
);

```


