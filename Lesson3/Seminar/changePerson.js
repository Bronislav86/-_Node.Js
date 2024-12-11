const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "person.json");

const personData = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

personData.age = personData.age - 10;
personData.city = "Ekaterinburg";

fs.writeFileSync(pathToFile, JSON.stringify(personData, null, 2));
