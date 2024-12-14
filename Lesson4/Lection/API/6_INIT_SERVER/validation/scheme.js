const joi = require("joi");

const articleScheme = joi.object({
	title: joi.string().min(5).required(),
	content: joi.string().min(10).required(),
});

const idScheme = joi.object({
	id: joi.number().required(),
});

module.exports = { articleScheme, idScheme };
