const { count } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "./static/counter.json");

const counter = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

if (counter === null && typeof counter === "undefined") {
	counter = {
		"/": 0,
		"/about": 0,
	};
}

const app = express();

app.get("/", (req, res) => {
	counter["/"] += 1;

	fs.writeFileSync(pathToFile, JSON.stringify(counter, null, 2));

	const counterData = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

	counter["/"] = counterData["/"];

	res.send(
		`<h1>Добро подаловать на наш сайт</h1><br><a href="/about">О нас</a><br><b>Счетчик посещения страниц:<br>${counter["/"]} страниц посещено</b>`
	);
});

app.get("/about", (req, res) => {
	counter["/about"] += 1;

	fs.writeFileSync(pathToFile, JSON.stringify(counter, null, 2));

	const counterData = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));
	counter["/about"] = counterData["/about"];

	res.send(
		`<h1>Информация о нас</h1><br><a href="/">На главную</a><br><b>Счетчик посещения страниц:<br>${counter["/about"]} страниц посещено</b>`
	);
});

const port = 3000;

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
