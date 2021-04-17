// importanto o express, path padrão
const express = require('express');
const path = require('path');

// criação da aplicação, informe da porta acessada pelo websocket
const app = express();
const server = require('http').createServer(app); //http
const io = require('socket.io')(server); // wss

// public files, views engine in html, not ejs
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// render the view
app.use('/', (req, res) => {
  res.render('index.html');
});

// sem db
let messages = [];

// toda vez que um cliente conectar
io.on('connection', socket => {
  console.log(`Socket conectado: ${socket.id}`);

  //envia todas messages assim que um socket conectar
  socket.emit('previousMessages', messages);

  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  });
});

server.listen(7031);
