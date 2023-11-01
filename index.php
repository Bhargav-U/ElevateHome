<?php
header("Access-Control-Allow-Origin: *");
header(
    "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept" //not recommeneded if you are deploying it as a product ,only for testing and prototyping
);
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Database credentials
$host = "127.0.0.1"; //I am using local host if you are using a remote server replace with its address
$username = "put your name here";
$password = "put your password here";
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
        } elseif ($json_data !== null && isset($json_data["Case"])) {
            // Establish the database connection
            $conn = connectToDatabase($host, $username, $password, $database);

            switch ($json_data["Case"]) {
                case 1:
                    if (
                        isset($json_data["Room"]) &&
                        isset($json_data["States"])
                    ) {
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
                    if (
                        isset($json_data["Room"]) &&
                        isset($json_data["Request"])
                    ) {
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
                                        $sensor_data[] =
                                            $row["Sensor_readings"];
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
                                        $appliance_names[] =
                                            $row["Appliance_name"];
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

                            case 6:
                                // Handle Case 6 within Case 6

                                // Query to count the rows in the Room_data table
                                $count_sql =
                                    "SELECT COUNT(Room_id) as Count FROM Room_data";
                                $count_result = $conn->query($count_sql);

                                if (
                                    $count_result &&
                                    $count_result->num_rows > 0
                                ) {
                                    $row = $count_result->fetch_assoc();
                                    $count = $row["Count"];
                                } else {
                                    echo "Error getting count from the database.";
                                    break;
                                }

                                // Query to fetch room names
                                $names_sql =
                                    "SELECT Room_name FROM Room_data ORDER BY Room_id";
                                $names_result = $conn->query($names_sql);

                                $names = [];

                                while (
                                    $names_row = $names_result->fetch_assoc()
                                ) {
                                    $names[] = $names_row["Room_name"];
                                }

                                $response = [
                                    "Count" => $count,
                                    "Names" => $names,
                                ];
                                echo json_encode($response);
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
    }
} else {
    // For other request methods, return an error response
    http_response_code(405); // Method Not Allowed
    echo "Method not allowed.";
}
?>

