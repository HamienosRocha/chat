const socket = io('http://localhost:7031');
const messagesPanel = document.querySelector('.messages');
const chatForm = document.querySelector('#chat');

function renderMessage(message) {
  const newDiv = document.createElement('div');
  newDiv.innerHTML = `<div class="message"><strong>${message.author}</strong>: ${message.message}</div>`;
  messagesPanel.appendChild(newDiv);
}

socket.on('previousMessages', function (messages) {
  for (message of messages) {
    renderMessage(message);
  }
});

socket.on('receivedMessage', function (message) {
  renderMessage(message);
});

chatForm.addEventListener('submit', function (event) {
  event.preventDefault(); // n enviar

  const author = document.querySelector('input[name="username"]').value;
  const message = document.querySelector('input[name="message"]').value;

  if (author.length && message.length) {
    const messageObj = {
      author: author,
      message: message,
    };

    renderMessage(messageObj);

    // evento de envio - objeto enviado
    socket.emit('sendMessage', messageObj);
  }
});
