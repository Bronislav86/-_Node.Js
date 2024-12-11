const { error } = require("console");
const fs = require("fs");
fs.readFile(__filename, "utf-8", (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});

// fs.writeFile(__filename, 'console.log("Hello")', (err) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Файл успешно записан");
// 	}
// });

fs.appendFile(__filename, 'console.log("Hello");', (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Файл успешно записан");
	}
});
console.log("Hello");
