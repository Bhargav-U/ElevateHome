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
  (1, 4, 1), 
  (2, 1, 1), 
  (2, 2, 1), 
  (2, 3, 1), 
  (2, 4, 1), 
  (3, 1, 1), 
  (3, 2, 1), 
  (3, 3, 1), 
  (3, 4, 1), 
  (4, 1, 1), 
  (4, 2, 1), 
  (4, 3, 1), 
  (4, 4, 1), 
  (5, 1, 1), 
  (5, 2, 1), 
  (5, 3, 1), 
  (5, 4, 1);
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
    1, 'College', 'SSN', 'Ssn1!Som2@Sase3#'
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

