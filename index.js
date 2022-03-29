require("dotenv").config();
require("./mongoose");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const helpers = require("./helpers");
const port = 80;

const app = express();

const usersRouter = require("./routes/usersRouter.js");
const contactsRouter = require("./routes/contactsRoute.js");

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

app.use((req, res, next) => {
	const { token } = req.cookies;

	if (token && jwt.verify(token, process.env.JWT_SECRET)) {
		const tokenData = jwt.decode(token, process.env.JWT_SECRET);
		res.locals.loginInfo =
			tokenData.username + " " + tokenData.userId + " " + tokenData.role;
		res.locals.loginUser = tokenData.username;
		res.locals.loginId = tokenData.userId;
		res.locals.isLoggedIn = true;
	} else {
		res.locals.loginInfo = "not logged in";
		res.locals.isLoggedIn = false;
	}
	next();
});

app.use("/anvandare", usersRouter);
app.use("/kontakt", contactsRouter);

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(port, () => {
	console.log(`Listening to http://localhost:${port}`);
});
