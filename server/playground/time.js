const moment = require('moment');

var date = moment();
date.add(2, 'years').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

const newDate = moment();
console.log(newDate.format('h:mm a'))

const someTimestamp = moment().valueOf();
console.log(someTimestamp);

