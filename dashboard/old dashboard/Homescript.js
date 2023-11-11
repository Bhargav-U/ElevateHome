function updateGreeting() {
    var date = new Date();
    var hour = date.getHours();

    var greetingMessage = document.getElementById('greeting-message');

    if (hour >= 5 && hour < 12) {
        greetingMessage.textContent = 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        greetingMessage.textContent = 'Good Afternoon';
    } else {
        greetingMessage.textContent = 'Good Evening';
    }
}

updateGreeting();

