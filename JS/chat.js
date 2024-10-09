document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    function addMessage(content, isUser = true) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'ai-message');

        const textElement = document.createElement('div');
        textElement.textContent = content;
        messageElement.appendChild(textElement);

        const timeElement = document.createElement('div');
        timeElement.classList.add('message-time');
        timeElement.textContent = new Date().toLocaleTimeString();
        messageElement.appendChild(timeElement);

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message);
            messageInput.value = '';
            
            // Simulate AI reply
            setTimeout(() => {
                addMessage('This is a simulated AI response.', false);
            }, 1000);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});