const os = require("os");

console.log(os.cpus());
console.log(os.arch());
console.log(os.freemem());
console.log(os.totalmem() / 1024 / 1024 / 1024);
