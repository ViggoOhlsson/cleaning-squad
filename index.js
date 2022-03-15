require("dotenv").config();
require("./mongoose");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const helpers = require("./helpers");
const port = 80;

const app = express();

app.engine(
	"hbs",
	exphbs.engine({
		defaultLayout: "main",
		extname: ".hbs",
		helpers: require("./helpers"),
	})
);
app.set("view engine", "hbs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Listening to http://localhost:${port}`);
});
