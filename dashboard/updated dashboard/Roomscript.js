// Function to get the current state as a string of 1s and 0s
function getCurrentStateString() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    let stateString = "";

    for (let i = 0; i < toggleSwitches.length; i++) {
        const isChecked = toggleSwitches[i].checked ? "1" : "0";
        stateString += isChecked;
    }

    return stateString;
}

// Function to send an HTTP POST request when toggle state changes
function sendPostRequestOnChange(room) {
    // Get the current state as a string of 1s and 0s
    const currentState = getCurrentStateString();

    // Define the data to be sent in the request body, including the room value
    const requestData = {
        Case: 1,
        Room: room, // Set the Room value based on the parameter
        States: currentState,
    };

    // Send the request to the server using fetch
    fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        // Update the toggle switches based on the response
        updateToggleSwitches(data.State);
    })
    .catch(error => {
        console.error("HTTP POST request failed: " + error);
    });
}

// Function to send an HTTP POST request every second
function sendPostRequest(room) {
    // Define the data to be sent in the request body, including the room value
    const requestData = {
        Case: 6,
        Room: room, // Set the Room value based on the parameter
        Request: "1",
    };

    // Send the request to the server using fetch
    fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        // Update the toggle switches based on the response
        updateToggleSwitches(data.State);
    })
    .catch(error => {
        console.error("HTTP POST request failed: " + error);
    });
}

// Function to update toggle switches based on the response
function updateToggleSwitches(state) {
    // Split the state string into an array of values (assuming they are 1 or 0)
    const statesArray = state.split(",");

    // Get all the toggle switches on the page
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');

    // Update the toggle switches based on the response
    for (let i = 0; i < toggleSwitches.length; i++) {
        const toggleSwitch = toggleSwitches[i];
        const isChecked = statesArray[i] === "1";
        toggleSwitch.checked = isChecked;
    }
}

// Function to send the POST request every second
function sendRequestInterval(room) {
    sendPostRequest(room);
    setTimeout(() => sendRequestInterval(room), 1000); // Send the request again after 1 second
}

// Function to update the room name based on the server response
function updateRoomName(roomName) {
    const roomHeader = document.querySelector('.body-header h1');
    roomHeader.textContent = roomName;
}

// Function to send an HTTP POST request to get the room name
function sendRoomNameRequest(room) {
    // Define the data to be sent in the request body
    const requestData = {
        Case: 6,
        Room: room, // Set the Room value based on the parameter
        Request: "3",
    };

    // Send the request to the server using fetch
    fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        // Update the room name based on the response
        updateRoomName(data.Room_name);
    })
    .catch(error => {
        console.error("HTTP POST request for room name failed: " + error);
    });
}

// Function to send the room name request initially and periodically
function sendRoomNameRequestInterval(room) {
    sendRoomNameRequest(room);
    setInterval(() => sendRoomNameRequest(room), 60000); // Send the request every 60 seconds
}

// Function to update the appliance names based on the server response
function updateApplianceNames(applianceNames) {
    const applianceLabels = document.querySelectorAll('.toggle-switch label');

    // Split the appliance names into an array using the '|' delimiter
    const applianceArray = applianceNames.split("|");

    // Update the appliance labels based on the response
    for (let i = 0; i < applianceLabels.length; i++) {
        if (i < applianceArray.length) {
            applianceLabels[i].textContent = applianceArray[i];
        } else {
            // If there are fewer appliance names than toggles, clear the label
            applianceLabels[i].textContent = "";
        }
    }
}

// Function to send an HTTP POST request to get the appliance names
function sendApplianceNamesRequest(room) {
    // Define the data to be sent in the request body
    const requestData = {
        Case: 6,
        Room: room, // Set the Room value based on the parameter
        Request: "4",
    };

    // Send the request to the server using fetch
    fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        // Update the appliance names based on the response
        updateApplianceNames(data.Appliances);
    })
    .catch(error => {
        console.error("HTTP POST request for appliance names failed: " + error);
    });
}

// Function to send the appliance names request initially and periodically
function sendApplianceNamesRequestInterval(room) {
    sendApplianceNamesRequest(room);
    setInterval(() => sendApplianceNamesRequest(room), 1000); // Send the request every 1 second
}

// Add an event listener to the toggle switches to send a POST request when they change
const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
toggleSwitches.forEach(function (toggleSwitch) {
    toggleSwitch.addEventListener("change", () => sendPostRequestOnChange(room));
});

// Extract the room number from the URL query parameters
function getRoomNumberFromQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("room");
}

// Get the room number from the URL
const room = getRoomNumberFromQueryParams();

// Start sending requests on page load
sendRequestInterval(room);

// Start sending room name requests on page load
sendRoomNameRequestInterval(room);

// Start sending appliance names requests on page load
sendApplianceNamesRequestInterval(room);
