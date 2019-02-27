const socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function (data) {
    console.log('new message from server', data);
});

socket.emit('createMessage', {
    from: 'fromclient@hotmail.com',
    text: 'Hey this is from client'
});