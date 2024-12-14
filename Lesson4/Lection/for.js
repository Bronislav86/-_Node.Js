const handlebars = require("handlebars");

const items = [
	{ name: "firs item", number: 3 },
	{ name: "second item", number: 5 },
	{ name: "third item", number: 7 },
];

const template = handlebars.compile("{{#each items}} <p>{{this.name}} {{this.number}}</p><br> {{/each}}");

console.log(template({ items }));
