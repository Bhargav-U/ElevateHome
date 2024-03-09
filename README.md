<a href='none' target="_blank"><img alt='' src='https://img.shields.io/badge/Under dev-100000?style=for-the-badge&logo=&logoColor=white&labelColor=FF0000&color=FF0000'/></a>

<!---Heading--->
![Image 6](https://drive.google.com/uc?id=16cjoj2_qw8i7_SMm-ISf5IxbGw2Aqjxj)
<p align="center">
  A simple home automation project using esp32<br>
  <a href='https://www.canva.com/design/DAFzlFBbA8w/Mm4hW3mSl3njbyM1p4ljBw/edit?utm_content=DAFzlFBbA8w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' target="_blank"><img alt='canva' src='https://img.shields.io/badge/Check_this out!-100000?style=for-the-badge&logo=canva&logoColor=46E5FA&labelColor=050505&color=000000'/></a>
</p>

***

<!---Skill set i used for the project--->
<h2>
  Made using,
</h2>
<p align="center">
<a href='https://www.espressif.com/' target="_blank"><img alt='espressif' src='https://img.shields.io/badge/Esp32-100000?style=for-the-badge&logo=espressif&logoColor=FD0000&labelColor=FFFFFF&color=black'/></a>
<br>
<a href='https://www.arduino.cc/' target="_blank"><img alt='Arduino' src='https://img.shields.io/badge/Arduino_ide-100000?style=for-the-badge&logo=Arduino&logoColor=008CFF&labelColor=FFFFFF&color=000000'/></a>
<a href='https://www.adafruit.com/' target="_blank"><img alt='Adafruit' src='https://img.shields.io/badge/Adafruit-100000?style=for-the-badge&logo=Adafruit&logoColor=000000&labelColor=FFFFFF&color=000000'/></a>
<br>
<a href='https://www.php.net/' target="_blank"><img alt='PHP' src='https://img.shields.io/badge/PHP-100000?style=for-the-badge&logo=PHP&logoColor=7D02FF&labelColor=FFFFFF&color=000000'/></a>
<a href='https://grafana.com/' target="_blank"><img alt='grafana' src='https://img.shields.io/badge/grafana-100000?style=for-the-badge&logo=grafana&logoColor=FD9800&labelColor=FFFFFF&color=000000'/></a>
<a href='https://grafana.com/' target="_blank"><img alt='mysql' src='https://img.shields.io/badge/Mysql-100000?style=for-the-badge&logo=mysql&logoColor=001EFF&labelColor=FFFFFF&color=000000'/></a>
<a href='' target="_blank"><img alt='HTML' src='https://img.shields.io/badge/HTML-100000?style=for-the-badge&logo=HTML&logoColor=FFFF00&labelColor=FFFFFF&color=000000'/></a>
<a href='' target="_blank"><img alt='css' src='https://img.shields.io/badge/CSS-100000?style=for-the-badge&logo=css&logoColor=FFFF00&labelColor=FFFFFF&color=000000'/></a>
<br>
<a href='' target="_blank"><img alt='javascript' src='https://img.shields.io/badge/Javascript-100000?style=for-the-badge&logo=javascript&logoColor=FFFF00&labelColor=FFFFFF&color=000000'/></a>
<a href='' target="_blank"><img alt='Node.js' src='https://img.shields.io/badge/Nodejs-100000?style=for-the-badge&logo=Node.js&logoColor=25FF08&labelColor=FFFFFF&color=000000'/></a>
<a href='' target="_blank"><img alt='React' src='https://img.shields.io/badge/React-100000?style=for-the-badge&logo=React&logoColor=03D1ED&labelColor=FFFFFF&color=000000'/></a>
<a href='https://easyeda.com/' target="_blank"><img alt='easyeda' src='https://img.shields.io/badge/easyeda-100000?style=for-the-badge&logo=easyeda&logoColor=03D1ED&labelColor=FFFFFF&color=000000'/></a>
<a href='https://www.freecad.org/' target="_blank"><img alt='freecad' src='https://img.shields.io/badge/freecad-100000?style=for-the-badge&logo=freecad&logoColor=03D1ED&labelColor=FFFFFF&color=000000'/>
</a>
<a href='https://www.python.org/' target="_blank"><img alt='python' src='https://img.shields.io/badge/Python-100000?style=for-the-badge&logo=python&logoColor=FDED06&labelColor=FFFFFF&color=000000'/></a>
<a href='https://httpd.apache.org/' target="_blank"><img alt='apache' src='https://img.shields.io/badge/Apache-100000?style=for-the-badge&logo=apache&logoColor=FF0000&labelColor=FFFFFF&color=000000'/></a>

***

<!---server setup section--->
<h2>SETTING UP YOUR SERVER:</h3>
If you are using a linux debian based operating system like ubuntu then simply paste the following commands on your terminal and run them<br>
<a href='https://www.apachefriends.org/' target="_blank"><img alt='xampp' src='https://img.shields.io/badge/Use_ xampp  for-100000?style=for-the-badge&logo=xampp&logoColor=FD4704&labelColor=black&color=black'/></a><a href='https://www.microsoft.com/en-us/windows' target="_blank"><img alt='windows' src='https://img.shields.io/badge/windows_os-100000?style=for-the-badge&logo=windows&logoColor=02B4FF&labelColor=black&color=black'/></a>
<h4>
  WEBSERVER SETUP:
  <br>
<a href='https://www.debian.org/' target="_blank"><img alt='debian' src='https://img.shields.io/badge/setup_for debian based operating systems-100000?style=for-the-badge&logo=debian&logoColor=FF0000&labelColor=black&color=black'/></a>
  <br>
PROJECT MADE ON <a href='https://ubuntu.com/' target="_blank"><img alt='ubuntu' src='https://img.shields.io/badge/Ubuntu-100000?style=for-the-badge&logo=ubuntu&logoColor=F75A00&labelColor=black&color=black'/></a>
<br>

</h4>

<h6>
  CREATE A DIRECTORY(OPTIONAL)
</h6>

```bash
#open a location you can easily acess on your file structure
cd /path to your loaction
#create a project directory at that location
mkdir project
#open the folder
cd project
#create a server directory
mkdir server
#open server folder
cd server
#create a php file for the server
gedit index.php
#paste the server php code form the project repo in this file and save the file
```

<h6>
  PORT NUMBERS AND FIREWALL FOR REFERNCE:
</h6>

```bash
#sudo lsof -i :port number --> gives the port user
#mysql:3306
#php:8000(not fixed but i use this)
#grafana:3000
#To see if firewall is running
sudo ufw status
#Allow port that you are using for php webserver in my case i am using 8000
sudo ufw allow 8000
```

<h6>
  APACHE:
</h6>

```bash
#update your system
sudo apt update
#install apcahe webserver
sudo apt install apache2
#start apache
sudo service apache2 start
#enable apache to start at boot
sudo systemctl enable apache2
#check if it is up and running
sudo systemctl status apache2
```

<h6>
  PHP:
</h6>

```bash
#update the system
sudo apt update
#install php
sudo apt install php
#check if  installation is sucessfull
php -v
```

<h6>
  Running the php server:
</h6>

```bash
#once you have fimished setting up the server ,to run teh php file use the following command,
cd /path/to/the/folder/directory/where/you/have/your/php/file/for/the/server
#it is a good practice to create a seperate folder for your server as mentioned above
#run this to start the server,you will see all the incomming http requests on the terminal now
php -S 0.0.0.0:8000
```

<P>
  Now after you setup you server and it is running properly,<a href='https://github.com/Bhargav-U/ElevateHome/blob/main/test_code' target="_blank"><img alt='python' src='https://img.shields.io/badge/use_test code-100000?style=plastic&logo=python&logoColor=white&labelColor=black&color=black'/></a>  file and run the main.py to test and understand the format in which data is being sent processes,how server is responding etc.Doing this will help you understand the esp code easily.Note that the code dosent include error handling so if you try to connect to server when it is offline you will face errors.
</P>


MYSQL:

</h6>
<P>
  if you are using a remote database then no need to do the mysql setup,simply chnage the credentials in the php code so that server connects to your database
</P>

```bash
#update the system
sudo apt update
#install mysql server and client
sudo apt install mysql-server
sudo apt install mysql-client
#start mysql
sudo systemctl start mysql
#enable it at boot
sudo systemctl enable mysql
#check if it is up and running
sudo systemctl status mysql
#setup mysql installation
sudo mysql_secure_installation
#open mysql and check if setup is sucessfull
sudo mysql -u root -p
#install the php mysql extension ,if not installed
sudo apt install php-mysql
```

<P>
  Run the below queries on the your mysql
</P>

```sql


CREATE DATABASE Home_data;
USE Home_data;

CREATE TABLE Current_home_state (
  Room_id INT, Appliance_id TINYINT,
  State TINYINT
);
INSERT INTO Current_home_state (Room_id, Appliance_id, State)
VALUES
  (1, 1, 0),
  (1, 2, 0),
  (1, 3, 0),
  (1, 4, 0),
  (2, 1, 0),
  (2, 2, 0),
  (2, 3, 0),
  (2, 4, 0),
  (3, 1, 0),
  (3, 2, 0),
  (3, 3, 0),
  (3, 4, 0),
  (4, 1, 0),
  (4, 2, 0),
  (4, 3, 0),
  (4, 4, 0),
  (5, 1, 0),
  (5, 2, 0),
  (5, 3, 0),
  (5, 4, 0);
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
  (1, 1, 'DHT11', ''),
  (2, 1, 'DHT11', ''),
  (3, 1, 'DHT11', ''),
  (4, 1, 'DHT11', ''),
  (5, 1, 'DHT11', '');
CREATE TABLE Wifi_data (
  wifi_id INT,
  label VARCHAR(255),
  ssid VARCHAR(255),
  password VARCHAR(255)
);
INSERT INTO Wifi_data (wifi_id, label, ssid, password)
VALUES
  (
    1, 'default', 'ssid', 'password'
  );
CREATE TABLE Room_data (
  Room_id INT AUTO_INCREMENT PRIMARY KEY,
  Room_name VARCHAR(255) DEFAULT "New Room",
  Mac VARCHAR(255) NOT NULL UNIQUE
);
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
  (1, 4, 'Device 4'),
  (2, 1, 'Device 1'),
  (2, 2, 'Device 2'),
  (2, 3, 'Device 3'),
  (2, 4, 'Device 4'),
  (3, 1, 'Device 1'),
  (3, 2, 'Device 2'),
  (3, 3, 'Device 3'),
  (3, 4, 'Device 4'),
  (4, 1, 'Device 1'),
  (4, 2, 'Device 2'),
  (4, 3, 'Device 3'),
  (4, 4, 'Device 4'),
  (5, 1, 'Device 1'),
  (5, 2, 'Device 2'),
  (5, 3, 'Device 3'),
  (5, 4, 'Device 4');

```

<h6>
  GRAFANA:
<h6>
<P>
  Refer too grafana website to see how to install and configure it on your system
</P>

***

<!---esp setup section--->
<h2>SETTING UP YOUR ESP:</h3>
<p>
-You can use a esp32 devlopment board,jumper wires,relay module(4 relays),switches,wires to handle ac current to make youself a circuit based on the generic circuit i have attached below<br>
-You can use my gerber file named "Elevatehomegerber" to order your own pcb and make a custom designed project which doesnt have the tiring work of wiring etc,simply get the pcb,buy the components,solder them onto teh pcb and you are reday to go.<br>
-You can also use the stl file to print a simple enclosure for the project by using the stl file named "Case".<br>
-After you are done making your hardware setup follow the instructions below to program your esp.<br>
-Refer to the <a href='https://github.com/Bhargav-U/ElevateHome/blob/main/WiringSetupManual.pdf' target="_blank"><img alt='linux' src='https://img.shields.io/badge/SETUP_MANUAL-100000?style=for-the-badge&logo=linux&logoColor=00E2FF&labelColor=black&color=black'/></a> for more instructions on genral setup and wiring.
</p>

<!----images for fun--->
<h3>PCB PROTOTYPE:</h3>

![raw](https://drive.google.com/uc?id=1RBd2ZmTgvuzbGFZQTlqQlUxnjKq3edtd)

![Image 1](https://drive.google.com/uc?id=1Gu9-k0qEiEavpGbncVH5dmDsF5wCb9Fu)


![Image 2](https://drive.google.com/uc?id=1I7FXmiWv21L09XKe7GRvesDb1F20xc1e)


***


***


<!---instruction for uploading code on esp--->
<h2>PROGRAMMING THE PROJECT:</h2
The below instructions are for programming your project using arduino ide.<br>
Note:Mkae sure that esp32 boards is insatlled on your ide<br>
<p>
-It dosent matter if you made your own circuit or used the custom pcb your project will have a boot and a reset pin<br>
-To upload the code you need to make sure that you esp is in boot mode<br>
-Power on your esp and connect it to your laptop either using a ftdi or a usb cable<br>
	

-Go to the boards section and select esp32doitdevkit(depends on what you are using but in my case i used this)<br>
-Select the port to which the esp is connected and on serial monitor set teh baud rate to 115200<br>
-No look at the serial monitor,press and hold the boot button,now keep holding teh boot button and press and release the reset button you will see a messge saying "waiting for download",now relase the boot button and click on the uplaod button on the ide<br>
-Once code is uploaded click the reset button<br>
-In the below explanation section i have explained which code to upload and changes you need to do<br>
</p>



***

<!---explanation section--->
<h2>SAVING YOUR WIFI CREDENTIALS TO YOUR EEPROM:</h3>

```c++
  String jsonData = "{\"Ssid\":\"Put_your_ssid_here\",\"Password\":\"Put_your_password_here\"}";
```

<p>
    Find this line in the save_wifi_factory.ino code and modify the ssid and passowrd.After you do that upload the code and hit reset now you should see that your ssid and passowrd are written into eeprom.If you are using a local server then make sure you put the wifi credentials of the local network.If you are using a remote server you can put any random values here.Make sure to note down what ever credentials you put here.Once the uploading of the code is done ,if you are your local environemnt you can proceed to uplad the main code and start your work.If you are using a remote server then make sure that what ever ssid and passowrd you saved into the esp are vaild,if not disconnect power to the esp,open your dashboard,make sure dashboard is connected to your server,go to the settings page,in the wifi settings add your wifi ssid and password and save them.once that is done now open you mobile hotspot aand change the name and password to match teh ssid and password in the eeprom,now turn you mobile hotspot and power on your esp.Now after few seconds you esp will connect to the mobile hotspot ,then to the server and fetch the saved credentials and automatically update the inbuilt ssid and password and will connect to the specified wifi network.
</p>

<h2>ESP32 CODE EXPLAINED:</h3>

```c++
#include <WiFi.h>
#include <HTTPClient.h>
#include <EEPROM.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
```

<p>
    This includes all the required libraries
</p>

```c++
  // Define the pin and sensor type for DHT sensor
#define DHTPIN your_sensor_pin
#define DHTTYPE your_dht_type
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
const char * serverAddress = "your server address";
bool serverWasOffline = false;
String Room_id = "";

// Number of pins and their corresponding switch and relay pins
const int numPins = 4;
const int switchpins[numPins] = {
        switch pin 1,
        switch pin 2,
        switch pin 3,
        switch pin 4
};
const int relaypins[numPins] = {
        relay pin 1,
        relay pin 2,
        relay pin 3,
        relay pin 4
};

// State variables
String currentState = "0000"; // Current switch states
String pastState = "0000"; // Previous switch states
String relayStates = "0000"; // Relay control states

```

<p>
  After we include the libraries we are going to create the requied variables and constants this includes declaring the sensor pins,switch pins,relay pins, based on your circuit modify the pin numbers.next we include arrays to store the state of the devices as string which helps us to compare the pasta nd current states in  a simple and straight forward way.As usual we created a global http object that can be acessed throught the code.some boolean variables to save the states.Th saved wifi credentials are intially empty but the data in teh eeprom is written into them ,so before uploading the automation code make sure to upload the wifi_factory_setting code and write your wifi credentials.If youa re working in a local environment it is a good practice to put the wifi credentials of the network the server is connected to to,else you can use any wifi credentials.
</p>

```c++
//RTOS TASKS
TaskHandle_t task1Handle = NULL;
TaskHandle_t task2Handle = NULL;
```

<p>
  Here we created two tasks,this is basically an rtos implemnetation.The idea of having two tasks is to increase the responsiveness of the code.When the server is offline there might be a little delay in the response,as the esp firsts checks for server avilabilty and then proceeds into modifing the relay states and managing the switch states.so adding a two tasks where one handles the local logic to reading switches and other handing the server will be very efficient.
</p>

```c++
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

// Function to write Wi-Fi credentials to EEPROM
void writeWiFiCredentialsToEEPROM(const String & json) {
        writeStringToEEPROM(eepromStartAddress, json);
}


```

<p>
  These function basically write and read the eeprom to get teh saved wifi credentials and to write the new credentials
</p>

```c++
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
```

<p>
  This function is used to connect to the wifi,it saves unessary waiting time by only trying the connection for limited tries.
</p>

```c++
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

```

<p>
  Once the connection is established the esp sends as mac adress handshake in which it sends its mac address to the server.The server will identify the esp based on the mac.If the esp is already saved server will return the assigned room number if not it will assign and new room number save the mac and return the new room number.This logic is responsible for the simple setup process of this project
</p>

```c++
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
```

<p>
  This part of the code is used to check the status of the device and the server.Decice status referes to the esp being connected to wifi and the server status is server's availabilty.When the device is offline the esp attempts to reconnect to the wifi.The logic of the server check is very simple,the esp cheks the servers status and sets a flag in case the server is online,the next time when the server is back online esp checks for the flag ,if flag is enabled esp sends the current device state and then resets the flag.This is to ensure that any changes made manually on the esp when the server was offline are reflected properly on the server.
</p>

```c++
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


```

<p>
  This code handles the wifi connection.Initially esp gets the data from the eeprom uses those credentials to connect to teh wifi,if the connection is sucessfull it asks the server for the saved ssiss and passwords in the server,it checks the ssid and  password from the server ,if it was able to connect to wifi then the new credentials are replaced in the place of old credentials and the board is reseted.so from next time the board simply uses these new credentials.This lgic is what is responsible for the easy wifi connection setup in the dashboard
</p>

```c++
  // Function to control relays
void controlRelays(String state) {
        for (int i = 0; i < numPins; i++) {
                int relayState = state.charAt(i) - '0'; // Convert char to integer
                digitalWrite(relaypins[i], relayState);
        }
}
```

<p>
  This will update the relay pins to the recent relay states
</p>

```c++
  // Function to get switch states
void getSwitchStates() {
        if (currentState != pastState) {
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

```

<p>
  This will look at the past switch pin states and compare it wil the current state,incase if they dont match the past state is updated to the current state and the current state is updated to the server if server and device are online.if not just the paststate string will be updated and no dat is sent to the server.
</p>

```c++
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
```

<p>
  This will ask the server for the current device states as saved on the database,any changes in the dashboard modify the database which inturn will be know to the esp through serever vai this function,If the response from the server is diffrent from teh current relay sates then teh relay states is updated.This function only runs when server and device are online and that logic is handled in another code section 
</p>

```c++
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
        }
}
```

<p>
  As we know that we have sensor here,readings from the sensor are updated to the server when server and device are online.
</p>

```c++
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

```

<p>
    This is the rtos implementaion of a task that handles functions like reading the changes in the switches and updatin the local states and the relay states
</p>

```c++
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

```

<p>
    This is the rtos iplementation of a task  that functions like,asking server for relay states,checking for status,reconnection to wifi,managinf relys,sending sensor data to server
</p>

```c++

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
    if(!serverOnline){
      relayStates = currentState;
      controlRelays(relayStates); 
    }

    
    xTaskCreatePinnedToCore(Manual, "Manual", 2048, NULL, 1, & task1Handle, 1);
    xTaskCreatePinnedToCore(Connected, "Connected", 4096, NULL, 1, & task2Handle, 0);
    
}


void loop() {
        //Nothing runs in loop,two independent tasks in two diffrent cores run the show
}
```

<p>
  These are the setup and the loop functions.we initate serial communication,begin sensor readings,initate the switches and relays,manage the wifi handling.After we are done handiling the wifi there is a small logic that manages the initiation of the relays.If we are online then we simply set the relay states to that in the server,if not we simply set it to the local switch state,thus maintaining the integrity.After we do that we just create two taks that handle the tasks that was mentioned above.These tasks are running on two diffrent cores so they are running indepent to each other and one failing dosent affect other one and what ever might be the case there is stability of the system.
</p>

***

<!---php code explanation--->
<h2>
  EXPLANATION FOR THE SERVER PHP CODE:
</h2>

```php

// Database credentials
$host = "server address";
$username = "username";
$password = "password";
$database = "Home_data";

```
<p>
  These are variables for server credentials
</p>

```php
// Function to establish a database connection
function connectToDatabase($host, $username, $password, $database)
{
    $conn = new mysqli($host, $username, $password, $database);
    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }
    return $conn;
}

```
<p>
  This function will handle the connection to the database server
</p>

```php

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // If it's a GET request, respond with "Server alive!"
    echo "Server alive!";
} 

```
<p>
  If server receives any get request it responds by saying it is alive
</p>


```php
elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the raw HTTP request data
    $request_data = file_get_contents("php://input");

    // Decode the JSON request data
    $json_data = json_decode($request_data, true);

    if ($json_data !== null) {
        // Establish the database connection
        $conn = connectToDatabase($host, $username, $password, $database);
	        if (isset($json_data["Mac"])) {
            // Check if the "Mac" key exists in the JSON data
            $mac = $json_data["Mac"];

            // Check if the provided Mac exists in the database
            $check_sql = "SELECT Room_id FROM Room_data WHERE Mac = ?";
            $check_stmt = $conn->prepare($check_sql);
            $check_stmt->bind_param("s", $mac);
            $check_stmt->execute();
            $check_stmt->bind_result($room_id);
            $check_stmt->fetch();
            $check_stmt->close();

            if ($room_id) {
                // If the Mac exists, return the corresponding Room_id
                $response = ["Room_id" => $room_id];
                echo json_encode($response);
            } else {
                // If the Mac doesn't exist, insert a new entry and return the Room_id
                $insert_sql = "INSERT INTO Room_data (Mac) VALUES (?)";
                $insert_stmt = $conn->prepare($insert_sql);
                $insert_stmt->bind_param("s", $mac);
                $insert_stmt->execute();
                $new_room_id = $insert_stmt->insert_id;
                $insert_stmt->close();

                $response = ["Room_id" => $new_room_id];
                echo json_encode($response);
            }

            // Close the database connection
            $conn->close();
        } 

```
<p>
  Now incase if the request is a post request then teh server will first verify if it is a mac handshake,mac handshake is basically the esp sending its mac.Mac address is used to identify the existing esps and teh new esp.So when a new mac address is identified a new entry for that address is created and the number of that address is returned.If the address already exists then server simply retuns the number for the existing mac address,here each esp is identified as a room and each esp can control 4 applinances.the name of the esp is given from the room in which it is being used 
</p>


```php
	elseif ($json_data !== null && isset($json_data["Case"])) {
            // Establish the database connection
            $conn = connectToDatabase($host, $username, $password, $database);

            switch ($json_data["Case"]) {

.
.
.
.
.

		}
}


```
<p>
  This will handle all other conditions,there is a variable called case.so The case variable will tell the server about the information that is being sent  to the server
</p>


<!---UI--->
<h2>
  USER INTERFACE:
</h2>

<p>
	You can control this project using a web dashboard.The files for the webdashboard has been are uploaded and you can use them ,just make sure to put the server address properly in the javascript code(You just need to change the server address based on your server address).When teh project is connected to wifi ,it iwll automatically show up in your dashboard considering that the server address is correct.Now you simply need to go to the rooms page where you will see a new room pop up.no you can configure the new room,appliance names through the room settings in the settings page.So it's just plug and play.everytime a new device tries to connect to the server it is identified through its mac address and given a room id ,so scaling up multiple nodes is easy and quick as each room has its unique adressing.<br>
</p>

<h3>
	Configuring the project at first connection to the server:
</h3>
once the project is powered on it iwll automatically connect to the server and  in the rooms section of the dashbord,you will see a new room popup like the one in the image below,

![ROOMS](https://drive.google.com/uc?id=1X1JxEKE80KOUFEJobqhScXs0WSc_upsN)

you can chnage the names of the appliance and room,by simply going into the room settings in the settings section of the dashboard,here you simply need to enter the room id od the room you want to configure.The room id is the same teh position of that room in the rooms section.once you set the names ,click on save to make the changes.

![SETTINGS PAGE](https://drive.google.com/uc?id=16Eivd69Q9szRMPJQMQuR2iUJ8mO45xpF)


![ROOM SETTINGS](https://drive.google.com/uc?id=1MIZUK0lfzrg9KcmPFedoKyWSjtVnUuOm)

Now after you configure your room,you can head back to the rooms section and select your room,control teh appliance using the toggle switches

![ROOM](https://drive.google.com/uc?id=18E0XaiUxrRXX1GMdDor9e1qpyGRVMJoC)



***

<p>
	If you are planning to make your self a pcb prototype you can refer to the componets list below,you will find the same components i used for this project,unaffliated links.These worked best for me<br>
<p align = "center">
	<a href='https://drive.google.com/file/d/1veKbc5ochvP25u9h9z88X4OARTv1YUqS/view?usp=sharing' target="_blank"><img alt='' src='https://img.shields.io/badge/Products-100000?style=for-the-badge&logo=&logoColor=white&labelColor=black&color=FF0000'/></a>
</p>
</p>

***

Feel free ask me your questions regarding this project and help me improve my project by providing your valuble suggestions.i know there is a lot of scope for me to improve this project,i am very satisfied that i was able to make a idea of mine a reality.working on the hardware and software i gained a lot of experince regarding iot,microcontrllers,coding,web dev,bits and pieces of ubuntu,hosting webservers,http protocol.i was also able to brush my skills in sql,webdev,php,c.It was a great experience learning pcb designing and cad.but,to make it clear ,there is a lot of scope for improvment and that is where i need people to help me learn.

I appreciate your intrest in my project,please checkout the discussions and also feel free to connect to me.
[![Email](https://img.shields.io/badge/Email-unnambhargav%40gmail.com-black?style=flat-square&logo=gmail)](mailto:unnambhargav@gmail.com)


<p align = "center">
	Made with help from:<br>
	<a href='https://github.com/vatsav123' target="_blank"><img alt='GITHUB' src='https://img.shields.io/badge/VATSAV-100000?style=for-the-badge&logo=GITHUB&logoColor=white&labelColor=FF0000&color=FFFFFF'/></a><br>
 	<a href='https://github.com/nithyapandurangan' target="_blank"><img alt='GITHUB' src='https://img.shields.io/badge/NITHYA-100000?style=for-the-badge&logo=GITHUB&logoColor=white&labelColor=A900FD&color=FFFFFF'/></a><br>
	
</p>




***
