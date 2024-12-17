const joi = require("joi");

const userSchema = joi.object({
	name: joi.string().min(5).required(),
	lastname: joi.string().min(7).required(),
	age: joi.number().min(6).max(150).required(),
	city: joi.string().min(3).required(),
});

const idScheme = joi.object({
	id: joi.number().required(),
});

module.exports = { userSchema, idScheme };
