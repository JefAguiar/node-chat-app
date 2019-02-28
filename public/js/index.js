const socket = io();

const scrollToBottom = function(){
   // Selectors
   var messages = jQuery('#messages');
   var newMessage = messages.children('li:last-child')
   // Heights
   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();
 
   if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
     messages.scrollTop(scrollHeight);
   }
};

socket.on('connect', function () {
  console.log('Connected to the server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

const renderTemplate = function (elemtId,
  elemtToAppend,
  data) {

  const template = jQuery(elemtId).html();
  const html = Mustache.render(template, data);
  jQuery(elemtToAppend).append(html);
}

socket.on('newMessage', function (data) {
  renderTemplate('#message-template',
    '#messages', {
      text: data.text,
      from: data.from,
      createdAt: moment(data.createdAt).format('h:mm a')
    });

    scrollToBottom();
});

socket.on('newLocationMessage', function (data) {
  renderTemplate('#location-message-template',
    '#messages', {
      url: data.url,
      from: data.from,
      createdAt: moment(data.createdAt).format('h:mm a')
    });
});

const messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

const buttonSendLocation = jQuery('#send-location');

buttonSendLocation.on('click', function () {
  if (!navigator.geolocation)
    return alert('Geolocation not supported by your browser');

  buttonSendLocation.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    buttonSendLocation.removeAttr('disabled').text('Send location');

  }, function (err) {
    alert('Unable to fetch location.')

    buttonSendLocation.removeAttr('disabled').text('Send location');;
  })
});