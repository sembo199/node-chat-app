const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.emit('newMessage', {
    from: 'sembo199',
    text: 'Hey',
    createdAt: 123
  });

  socket.on('createMessage', (newMessage) => {
    newMessage.createdAt = new Date();
    console.log(`New message from ${newMessage.from}: ${newMessage.text} at ${newMessage.createdAt}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from server!');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
