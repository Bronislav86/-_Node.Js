// 1. GET .../users/ - получить всех пользователей
// 2. POST .../users/ - создать пользователя
// 3. GET .../users/:id - получить пользователя по id
// 4. PUT .../users/:id - редактирование(обновление) пользователя по id
// 5. DELETE .../users/:id - удалить пользователя по id
const { error } = require("console");
const express = require("express");
const joi = require("joi");

const users = [];
let uniqueID = 0;

const userSchema = joi.object({
	name: joi.string().min(5).required(),
	lastname: joi.string().min(7).required(),
});

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("<h1>Добро пожаловать</h1>");
});

app.get("/users", (req, res) => {
	res.send({ users });
});

app.get("/users/:id", (req, res) => {
	const user = users.find((user) => user.id === Number(req.params.id));

	if (user) {
		res.send({ user });
	} else {
		res.status(400);
		res.send({ user: null });
	}
});

app.post("/users", (req, res) => {
	const resultValidation = userSchema.validate(req.body);

	if (resultValidation.error) {
		return res.status(404).send({
			error: resultValidation.error.details,
		});
	}

	uniqueID += 1;

	users.push({
		id: uniqueID,
		...req.body,
	});

	res.send({
		id: uniqueID,
	});
});

app.put("/users/:id", (req, res) => {
	const resultValidation = userSchema.validate(req.body);

	if (resultValidation.error) {
		return res.status(404).send({
			error: resultValidation.error.details,
		});
	}

	const user = users.find((user) => user.id === Number(req.params.id));

	if (user) {
		const { name, lastname } = req.body;

		user.name = name;
		user.lastname = lastname;

		res.send({ user });
	} else {
		res.status(400).send({ user: null });
	}
});

app.delete("/users/:id", (req, res) => {
	const reqUserId = +req.params.id;
	const user = users.find((user) => user.id === reqUserId);

	if (user) {
		const userIndex = users.indexOf(user);
		users.splice(userIndex, 1);

		res.send({ user });
	} else {
		res.status(400).send({ user: null });
	}
});

app.listen(3000);
