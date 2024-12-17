const fs = require("fs");
const path = require("path");

const readFromFile = (filePath) => {
	try {
		const usersDataFromStorage = JSON.parse(fs.readFileSync(filePath, "utf-8"));
		// resultOfRead.push({
		// 	usersDataFromStorage,
		// });
		return usersDataFromStorage;
	} catch (err) {
		err = `Ошибка чтения!\nФайл ${path.basename(filePath)} не найден или не существует.`;
		console.log(err);
	}
};

const writeToFile = (filePath, userData) => {
	try {
		fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
	} catch (error) {
		err = `Ошибка записи!\nФайл ${path.basename(filePath)} не найден или не существует.`;
		console.log(err);
	}
};

module.exports = { readFromFile, writeToFile };
