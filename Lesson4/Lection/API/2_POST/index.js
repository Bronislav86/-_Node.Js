const express = require("express");

const app = express();

app.post("/", (req, res) => {
	res.send("<h1>This is a post request!</h1>");
});

app.listen(3000);
