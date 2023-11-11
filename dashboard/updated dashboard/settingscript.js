// Display feedback popup
function displayFeedbackPopup(message, success) {
    const feedbackPopup = document.createElement("div");
    feedbackPopup.classList.add("feedback-popup");
    feedbackPopup.textContent = message;

    if (success) {
        feedbackPopup.classList.add("success");
    } else {
        feedbackPopup.classList.add("error");
    }

    document.body.appendChild(feedbackPopup);

    setTimeout(() => {
        document.body.removeChild(feedbackPopup);
    }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
    // Select the Wi-Fi settings form and Save button
    const wifiSettingsForm = document.getElementById("wifi-settings-form");
    const saveWifiSettingsButton = document.getElementById("save-wifi-settings");

    // Add an event listener to the Save button
    saveWifiSettingsButton.addEventListener("click", function () {
        // Retrieve the values from the form
        const label = document.getElementById("wifi-label").value;
        const ssid = document.getElementById("wifi-ssid").value;
        const password = document.getElementById("wifi-password").value;

        // Create a JSON object with the data
        const wifiSettingsData = {
            Case: 2, // Default value
            Ssid: ssid,
            Password: password,
            Label: label,
        };

        // Make an HTTP POST request to the server
        fetch("http://localhost:8000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(wifiSettingsData),
        })
        .then(response => {
            // Handle the response from the server
            if (response.ok) {
                console.log("Data sent successfully");

                // Clear the input fields
                document.getElementById("wifi-label").value = "";
                document.getElementById("wifi-ssid").value = "";
                document.getElementById("wifi-password").value = "";

                // Display success feedback popup
                displayFeedbackPopup("Changes saved successfully", true);
            } else {
                console.error("Error sending data to the server");
                // Display an error popup when there's a network error or similar
                displayFeedbackPopup("Failed to save changes", false);
            }
        })
        .catch(error => {
            console.error("An error occurred:", error);
            // Display an error popup when there's a network error or similar
            displayFeedbackPopup("Failed to save changes", false);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the Room settings form and Save button
    const roomSettingsForm = document.getElementById("room-settings-form");
    const saveRoomSettingsButton = document.getElementById("save-room-settings");

    // Add an event listener to the Save button
    saveRoomSettingsButton.addEventListener("click", function () {
        // Retrieve the values from the form
        const roomID = document.getElementById("room-id").value;
        const roomName = document.getElementById("room-name").value;
        const appliance1 = document.getElementById("appliance1").value;
        const appliance2 = document.getElementById("appliance2").value;
        const appliance3 = document.getElementById("appliance3").value;
        const appliance4 = document.getElementById("appliance4").value;

        // Create JSON object for Room
        const roomData = {
            Case: 3,
            Room: roomID,
            Room_name: roomName,
        };

        // Create JSON objects for each appliance
        const appliance1Data = {
            Case: 4,
            Room: roomID,
            Appliance: "1",
            Appliance_name: appliance1,
        };

        const appliance2Data = {
            Case: 4,
            Room: roomID,
            Appliance: "2",
            Appliance_name: appliance2,
        };

        const appliance3Data = {
            Case: 4,
            Room: roomID,
            Appliance: "3",
            Appliance_name: appliance3,
        };

        const appliance4Data = {
            Case: 4,
            Room: roomID,
            Appliance: "4",
            Appliance_name: appliance4,
        };

        // Make HTTP POST requests to the server for Room and appliances
        Promise.all([
            fetch("http://localhost:8000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(roomData),
            }),
            fetch("http://localhost:8000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appliance1Data),
            }),
            fetch("http://localhost:8000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appliance2Data),
            }),
            fetch("http://localhost:8000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appliance3Data),
            }),
            fetch("http://localhost:8000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appliance4Data),
            }),
        ])
        .then((responses) => {
            // Check if all requests were successful
            const allResponsesSuccessful = responses.every((response) =>
                response.ok
            );

            if (allResponsesSuccessful) {
                console.log("Data sent successfully");

                // Clear the input fields
                document.getElementById("room-id").value = "";
                document.getElementById("room-name").value = "";
                document.getElementById("appliance1").value = "";
                document.getElementById("appliance2").value = "";
                document.getElementById("appliance3").value = "";
                document.getElementById("appliance4").value = "";

                // Display success feedback popup
                displayFeedbackPopup("Changes saved successfully", true);
            } else {
                console.error("Error sending data to the server");
                // Display an error popup when there's a network error or similar
                displayFeedbackPopup("Failed to save changes", false);
            }
        })
        .catch((error) => {
            console.error("An error occurred:", error);
            // Display an error popup when there's a network error or similar
            displayFeedbackPopup("Failed to save changes", false);
        });
    });
});
