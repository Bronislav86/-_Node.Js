const uuid = require('uuid');
const hello = require('./hello');

const id = uuid.v4();

console.log(id);

hello.sayHello();
