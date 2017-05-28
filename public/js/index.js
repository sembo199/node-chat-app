var socket = io();

socket.on('connect', function () {
  console.log('Connected to server!');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server!');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

socket.on('newUser', function (message) {
  console.log(`${message.from}: ${message.text}`);
});

socket.on('newUserNotify', function (message) {
  console.log(`${message.from}: ${message.text}`);
});
