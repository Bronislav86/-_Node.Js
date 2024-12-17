const express = require("express");
const path = require("path");
const { readFromFile, writeToFile } = require("./handlers/fileHandler");
const joi = require("joi");
const { checkBody, checkParams } = require("./handlers/validator");
const { userSchema, idScheme } = require("./handlers/scheme");

let userId = 0;
const pathToFile = path.join(__dirname, "./storage/usersBD.json");

const app = express();

app.use(express.json());

/**
 * Роут обработки корневой страницы
 */
app.get("/", (req, res) => {
	res.send("<h1>Добро пожаловать</h1>");
});

/**
 * Получение всех пользователей из БД
 */
app.get("/users", (req, res) => {
	const usersFromStorage = readFromFile(pathToFile);
	res.send({ usersFromStorage });
});

/**
 * Запись нового пользователя в БД
 */
app.post("/users", checkBody(userSchema), (req, res) => {
	const usersFromStorage = readFromFile(pathToFile);

	if (usersFromStorage !== undefined) {
		usersFromStorage.forEach((user) => {
			const currentId = user.id;
			if (currentId > userId) {
				userId = currentId;
			}
		});
		userId += 1;
		usersFromStorage.push({
			id: userId,
			...req.body,
		});

		writeToFile(pathToFile, usersFromStorage);

		res.send({
			id: userId,
		});
	} else {
		userId = 1;

		const newUsers = [];

		newUsers.push({
			id: userId,
			...req.body,
		});

		writeToFile(pathToFile, newUsers);

		res.send({
			id: userId,
		});
	}
});

/**
 * Получить пользователя по id
 */
app.get("/users/:id", checkParams(idScheme), (req, res) => {
	const usersFromStorage = readFromFile(pathToFile);

	const idUserFromReq = +req.params.id;

	const user = usersFromStorage.find((user) => user.id === idUserFromReq);

	if (user) {
		res.send({ user });
	} else {
		res.status(404).send({ user: null });
	}
});

/**
 * Изменить пользователя по id
 */
app.put("/users/:id", checkParams(idScheme), checkBody(userSchema), (req, res) => {
	const usersFromStorage = readFromFile(pathToFile);

	const idUserFromReq = +req.params.id;

	usersFromStorage.forEach((user) => {
		if (user.id === idUserFromReq) {
			const { name, lastname, age, city } = req.body;
			user.name = name;
			user.lastname = lastname;
			user.age = age;
			user.city = city;
		}
	});

	const user = usersFromStorage.find((user) => user.id === idUserFromReq);

	if (user) {
		writeToFile(pathToFile, usersFromStorage);

		res.send({ user });
	} else {
		res.status(404).send({ user: null });
	}
});

/**
 * Удалить пользователя по id
 */
app.delete("/users/:id", checkParams(idScheme), (req, res) => {
	const usersFromStorage = readFromFile(pathToFile);

	const idUserFromReq = +req.params.id;

	const user = usersFromStorage.find((user) => user.id === idUserFromReq);

	if (user) {
		const userIndex = usersFromStorage.indexOf(user);

		usersFromStorage.splice(userIndex, 1);

		writeToFile(pathToFile, usersFromStorage);

		res.send({ user });
	} else {
		res.status(404).send({ user: null });
	}
});

app.use((req, res) => {
	res.status(404).send({
		message: "Page NOT found!",
	});
});

app.listen(3000);
