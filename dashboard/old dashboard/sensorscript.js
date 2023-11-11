// Function to send data to the server every second
function sendDataEverySecond() {
    const jsonData = {
        Case: 6,
        Room: "1",
        Request: "2",
    };

    // Send the JSON data to the server
    sendDataToServer(jsonData);
}

// Send data every second
setInterval(sendDataEverySecond, 1000);

// Function to update text color based on temperature and humidity values
function updateTextColor(temperature, humidity) {
    const temperatureElement = document.querySelector(".temperature .sensor-value");
    const humidityElement = document.querySelector(".humidity .sensor-value");

    // Update temperature text color
    if (parseFloat(temperature) > 35) {
        temperatureElement.style.color = "#EE9322";
    } else if (parseFloat(temperature) < 15) {
        temperatureElement.style.color = "#33d9f7";
    } else {
        temperatureElement.style.color = "white"; // Reset to default color
    }

    // Update humidity text color
    if (parseFloat(humidity) > 80) {
        humidityElement.style.color = "#EE9322";
    } else if (parseFloat(humidity) < 40) {
        humidityElement.style.color = "#33d9f7";
    } else {
        humidityElement.style.color = "white"; // Reset to default color
    }
}

// Function to send JSON data to the server
function sendDataToServer(data) {
    fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((responseData) => {
            // Parse the response to extract temperature and humidity
            const dataParts = responseData.Data.split("/");
            const temperature = dataParts[1];
            const humidity = dataParts[3];

            // Update the sensor values on the webpage
            const temperatureElement = document.querySelector(".temperature .sensor-value");
            const humidityElement = document.querySelector(".humidity .sensor-value");

            temperatureElement.textContent = `${temperature}°C`;
            humidityElement.textContent = `${humidity}%`;

            // Update text color based on values
            updateTextColor(temperature, humidity);
        })
        .catch((error) => {
            console.error("Error sending data to server:", error);
        });
}

// Initial update of text color based on default values
updateTextColor("25", "50");
