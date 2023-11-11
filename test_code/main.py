import requests
import json

while True:
    user_input = input("Enter 'get', 'post', or 'quit' or handshake: ")

    if user_input == 'quit':
        break
    elif user_input == 'handshake':
        mac = str(input("enter device mac:"))
        data ={
            "Mac": mac
        }
        json_data = json.dumps(data)
        print("Sending the following JSON data:")
        print(json_data)
        headers = {'Content-Type': 'application/json'}  # Set the content type to JSON
        response = requests.post("http://localhost:8000/", data=json_data, headers=headers)
        print("Response:", response.text)

    elif user_input == 'get':
        response = requests.get("http://localhost:8000//")
        print("Response:", response.text)
    elif user_input == 'post':
        print("Choose an option:")
        print("1. Change switch states")
        print("2. Change wifi credentials")
        print("3. Change room name")
        print("4. Change appliance name")
        print("5. Send sensor data")
        print("6. Request data")

        post_option = input("Enter the option (1-6): ")

        if post_option == '1':
            room = input("Enter Room: ")
            states = input("Enter States: ")
            data = {
                "Case": 1,
                "Room": room,
                "States": states
            }
        elif post_option == '2':
            room  = input("Enter Room: ")
            ssid  = input("Enter SSID: ")
            label = input("Enter label:")
            password = input("Enter Password: ")
            data = {
                "Case": 2,
                "Ssid": ssid,
                "Password": password,
                "Label": label,
            }
        elif post_option == '3':
            room = input("Enter Room: ")
            room_name = input("Enter Room Name: ")
            data = {
                "Case": 3,
                "Room": room,
                "Room_name": room_name
            }
        elif post_option == '4':
            room = input("Enter Room: ")
            appliance = input("Enter Appliance: ")
            appliance_name = input("Enter Appliance Name: ")
            data = {
                "Case": 4,
                "Room": room,
                "Appliance": appliance,
                "Appliance_name": appliance_name
            }
        elif post_option == '5':
            room = input("Enter Room: ")
            sensor = input("Enter Sensor: ")
            sensorname = input('Enter the name of teh sensor:')
            readings = input("Enter Readings: ")
            data = {
                "Case": 5,
                "Room": room,
                "Sensor": sensor,
                "Sensor_name":sensorname,
                "Readings": readings
            }
        elif post_option == '6':
            room = input("Enter Room: ")
            user_input = 0
            while True:
                print("Menu:")
                print("1. Request for the device states")
                print("2. Request for sensor states")
                print("3. Request for the room name")
                print("4. Request for the Appliance name")
                print("5. Request for the WiFi credentials")
                print("6. Request for the number of rooms")

                user_input = input("Enter your choice: ")

                if int(user_input) >= 1 and int(user_input) <= 6:
                    break;
            data = {
                "Case": 6,
                "Room": room,
                "Request": user_input
            }

        else:
            print("Invalid option. Please choose from 1 to 5.")
            continue

        json_data = json.dumps(data)
        print("Sending the following JSON data:")
        print(json_data)

        headers = {'Content-Type': 'application/json'}  # Set the content type to JSON
        response = requests.post("http://localhost:8000/", data=json_data, headers=headers)
        print("Response:", response.text)
    else:
        print("Invalid input. Please enter 'get', 'post', or 'quit' or handshake.")

print("Exiting the program.")