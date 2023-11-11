const responseContainer = document.getElementById("response-data");
const buttonContainer = document.getElementById("button-container");

const serverURL = "http://localhost:8000/";

function sendPostRequest() {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Case: 6,
            Room: 0, // The room number will be set dynamically when a button is clicked
            Request: 6,
        }),
    };

    fetch(serverURL, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data.Count) {
                buttonContainer.innerHTML = "";

                const names = data.Names;

                for (let i = 0; i < names.length; i++) {
                    const button = document.createElement("button");
                    button.textContent = names[i];
                    button.classList.add("square-button");

                    // Add a click event listener to each button to pass room number
                    button.addEventListener("click", () => {
                        // Pass the room number (i + 1) when the button is clicked
                        sendToRoomPage(i + 1);
                    });

                    buttonContainer.appendChild(button);
                }
            } else {
                responseContainer.textContent = "No data available.";
            }
        })
        .catch((error) => {
            console.error("Error: Unable to fetch data from the server.", error);
            responseContainer.textContent = "Error: Unable to fetch data from the server.";
        });
}

const intervalID = setInterval(sendPostRequest, 1000);

window.addEventListener("beforeunload", () => {
    clearInterval(intervalID);
});

function sendToRoomPage(room) {
    // Redirect to the Room.html page with the selected room number
    window.location.href = `Room.html?room=${room}`;
}
