const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');
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

  socket.on('createMessage', ({ from, text }) => {
    console.log('createMessage from client', { from, text });
    
    socket.broadcast.emit('newMessage', generateMessage(from, text));
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});