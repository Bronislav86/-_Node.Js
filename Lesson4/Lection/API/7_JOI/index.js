const joi = require("joi");

const schema = joi.string();

const result = schema.validate([]);

const schema2 = joi.object({
	id: joi.number().required(),
	title: joi.string().min(5).required(),
	content: joi.string().min(10).required(),
});

console.log(result.error.details);

const result2 = schema2.validate({
	id: 1,
	title: "1132132",
	content: "1321321313",
});

console.log(result2.error?.details);
