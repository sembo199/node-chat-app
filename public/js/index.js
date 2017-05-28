var socket = io();

socket.on('connect', function () {
  console.log('Connected to server!');

  socket.emit('createMessage', {
    from: 'Sembo199',
    text: 'Hey, this is Sem.'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server!');
});

socket.on('newMessage', function (message) {
  console.log(`${message.from} says: ${message.text}`);
});
