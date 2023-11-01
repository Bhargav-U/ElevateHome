#include <EEPROM.h>

const int eepromSize = 512;
const int eepromStartAddress = 0;

void writeStringToEEPROM(int addr, const String &data) {
  for (size_t i = 0; i < data.length(); i++) {
    EEPROM.write(addr + i, data[i]);
  }
  EEPROM.write(addr + data.length(), 0); // Null-terminate the string
  EEPROM.commit();
}

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

void setup() {
  Serial.begin(115200);
  EEPROM.begin(eepromSize);

  // Clean the EEPROM by writing zeros
  for (int i = 0; i < eepromSize; i++) {
    EEPROM.write(i, 0);
  }
  EEPROM.commit();

  // Define and save the JSON data
  String jsonData = "{\"Ssid\":\"ssid_of_your_wifi\",\"Password\":\"password_of_your_wifi\"}";
  writeStringToEEPROM(eepromStartAddress, jsonData);

  // Read the JSON data from EEPROM
  String savedJson = readStringFromEEPROM(eepromStartAddress);

  // Print the saved SSID and Password
  Serial.println("Saved SSID: " + savedJson.substring(savedJson.indexOf("Ssid") + 7, savedJson.indexOf("\",\"Password\"")));
  Serial.println("Saved Password: " + savedJson.substring(savedJson.indexOf("Password") + 11, savedJson.length() - 2));
}

void loop() {
  // Your main code can go here if needed
}
