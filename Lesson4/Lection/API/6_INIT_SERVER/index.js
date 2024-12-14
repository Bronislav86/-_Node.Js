const express = require("express");
const { checkBody, checkParams } = require("./validation/validator");
const { idScheme, articleScheme } = require("./validation/scheme");

const app = express();

let uniqueID = 0;
const articles = [];

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello world!");
});

/**
 * Получит всех статьи
 */
app.get("/articles", (req, res) => {
	res.send({ articles });
});

/**
 * Получить конкретную статью
 */
app.get("/articles/:id", checkParams(idScheme), (req, res) => {
	const article = articles.find((article) => article.id === Number(req.params.id));

	if (article) {
		res.send({ article });
	} else {
		res.status(404);
		res.send({ article: null });
	}
});

/**
 * Создание статьи
 */
app.post("/articles", checkBody(articleScheme), (req, res) => {
	// if (!req.body.title) {
	// 	return res.status(400).send({ error: "Invalid title" });
	// }

	// if (!req.body.content) {
	// 	return res.status(400).send({ error: "Invalid content" });
	// }

	// if (req.body.title.length <= 5) {
	// 	return res.status(400).send({ error: "The title must be more than 5 characters" });
	// }

	// if (req.body.content.length <= 10) {
	// 	return res.status(400).send({ error: "The content must be more than 10 characters" });
	// }

	uniqueID += 1;

	articles.push({
		id: uniqueID,
		...req.body,
	});

	res.send({
		id: uniqueID,
	});
});

/**
 * Обновление статьи
 */
app.put("/articles/:id", checkParams(idScheme), checkBody(articleScheme), (req, res) => {
	// const idValidationResult = idScheme.validate(req.params);
	// if (idValidationResult.error) {
	// 	return res.status(400).send(idValidationResult.error.details);
	// }

	// const articleValidationResult = articleScheme.validate(req.body);

	// if (articleValidationResult.error) {
	// 	return res.status(400).send(articleValidationResult.error.details);
	// }

	const article = articles.find((article) => article.id === Number(req.params.id));

	if (article) {
		article.title = req.body.title;
		article.content = req.body.content;

		res.send({ article });
	} else {
		res.status(404);
		res.send({ article: null });
	}
});

/**
 * Обновление статьи
 */
app.delete("/articles/:id", checkParams(idScheme), (req, res) => {
	const article = articles.find((article) => article.id === Number(req.params.id));

	if (article) {
		const articleIndex = articles.indexOf(article);
		articles.splice(articleIndex, 1);

		res.send({ article });
	} else {
		res.status(404);
		res.send({ article: null });
	}
});

/**
 * Обработка несуществующих роутов
 */
app.use((req, res) => {
	res.status(404).send({
		message: "URL not found!",
	});
});

app.listen(3000);
