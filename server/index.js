const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected')

  socket.on('disconnect', () => {
    console.log('The user has disconnected');
  });

  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
  
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(message, callback) => {
    console.log('createMessage from client', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
  });
}); 

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});