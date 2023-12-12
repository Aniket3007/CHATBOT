document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('botStarterMessage').textContent = "Hello! How can I assist you with inventory management?";
});

function getResponse() {
    var userSelect = document.getElementById('inputField');
    var userQuestion = userSelect.value;
    userSelect.selectedIndex = 0;

    if (userQuestion) {
        var botAnswer = getBotResponse(userQuestion);
        addChat("Bot", botAnswer);

        if (botAnswer.includes("Please provide")) {
            document.getElementById('userResponse').style.display = 'block';
        } else {
            document.getElementById('userResponse').style.display = 'none';
        }
    }
}

function getBotResponse(input) {
    switch (input) {
        case 'Check product availability':
            return "Please provide the product ID for availability status.";
        case 'Expected delivery time':
            return "Delivery times vary by product. Please provide the product ID for specific details.";
        case 'Report a delay':
            return "I'm sorry to hear about the delay. Please provide the order number for further assistance?";
        case 'Vendor information':
            return "Please provide the vendor ID or name for detailed information.";
        case 'Order status':
            return "To check the status of an order, Please provide the order ID.";
        case 'Restock information':
            return "To get restock information, Please provide the product ID.";
        case 'Shipping details':
            return "For shipping details, Please provide the order ID.";
        case 'Return policy':
            return "Our return policy allows returns within 30 days of receipt.";
        case 'Damage report':
            return "To report a damaged item, Please provide the order ID and a description of the damage.";
        case 'Bulk order inquiry':
            return "For bulk orders, Please provide the product ID and the desired quantity.";
        default:
            return "Sorry, I don't understand that query. Can you be more specific?";
    }
}

function sendTextResponse() {
    var userInput = document.getElementById('textInput').value;
    document.getElementById('textInput').value = '';

    if (userInput) {
        addChat("User", userInput);
        sendToServer(userInput);
        document.getElementById('userResponse').style.display = 'none';
    }
}

function addChat(sender, message) {
    var chatDiv = document.getElementById('chatbox');
    var messageDiv = document.createElement('div');
    messageDiv.className = sender === "User" ? 'userText' : 'botText';
    messageDiv.innerHTML = `<span>${message}</span>`;
    chatDiv.appendChild(messageDiv);
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

function sendToServer(input) {
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: input }),
    })
    .then(response => response.text())
    .then(data => {
        addChat("Bot", data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
