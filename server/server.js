const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    var roomname = _.toLower(params.room);
    socket.join(roomname);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, roomname);
    socket.emit('setRoomName', _.capitalize(roomname));
    io.to(roomname).emit('updateUserList', users.getUserList(roomname));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.to(roomname).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));

    // io.emit -> to every connected user
    // socket.broadcast.emit -> to everyone connected except current user
    // socket.emit -> specifically to one user
    // io.to(roomname).emit -> to a specific room
    // socket.broadcast.to.emit -> to a specific room except current user

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    var userRoom = _.toLower(user.room);

    if (user && isRealString(message.text)) {
      io.to(userRoom).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    var userRoom = _.toLower(user.room);

    if (user) {
      io.to(userRoom).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    var userRoom = _.toLower(user.room);

    if (user) {
      io.to(userRoom).emit('updateUserList', users.getUserList(userRoom));
      io.to(userRoom).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// New features to add:
// --------------------
// Add roomname in tab / sidebar DONE
// To make chatrooms Case-Insensitive DONE
// To make usernames unique, reject new users with existing name
// Add a list of currently active rooms
