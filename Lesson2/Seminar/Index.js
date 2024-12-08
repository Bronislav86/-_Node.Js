const {calculateResultSum} = require('./calculateResultSum');

const colors = require('colors');

const total = calculateResultSum([2.1, 2.2, 43.1], 0.9);

console.log((total > 50) ? `${total}`.red : `${total}`.green);