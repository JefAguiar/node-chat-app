const socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function (data) {
    const formattedTime = moment(data.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${data.from} ${formattedTime}: ${data.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(data){
  console.log('location from server');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${data.from} ${moment().format('h:mm a')}: `);
  a.attr('href', data.url);
  li.append(a);
  jQuery('#messages').append(li);
});

const messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  },function(){
    messageTextBox.val('');
  });
});

 const buttonSendLocation = jQuery('#send-location');

 buttonSendLocation.on('click', function(){
   if(!navigator.geolocation)
     return alert('Geolocation not supported by your browser');

   buttonSendLocation.attr('disabled', 'disabled').text('Sending location...');

   navigator.geolocation.getCurrentPosition(function(position){
     socket.emit('createLocationMessage', {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     });

     buttonSendLocation.removeAttr('disabled').text('Send location...');

   }, function(err){
     alert('Unable to fetch location.')

     buttonSendLocation.removeAttr('disabled').text('Send location...');;
   })
 });