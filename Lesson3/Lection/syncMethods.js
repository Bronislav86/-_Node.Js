const { error } = require("console");
const fs = require("fs");

try {
	const result = fs.readFileSync(__filename, "utf-8");
	console.log(result);
} catch (err) {
	console.log(err);
}

try {
	fs.appendFileSync(__filename, 'console.log("Hello");\n');
	console.log("Файл успешно записан");
} catch (err) {
	console.log(err);
}
