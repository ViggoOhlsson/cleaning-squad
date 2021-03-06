require("dotenv").config();
require("./mongoose");

const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port = 80;

const helpers = require("./helpers.js");
const UserModel = require("./models/UsersModel.js");
const EmployeeModel = require("./models/EmployeeModel.js");

const app = express();

const usersRouter = require("./routes/usersRouter.js");
const contactsRouter = require("./routes/contactsRoute.js");
const adminsRouter = require("./routes/adminsRoute.js");
const bookingsRouter = require("./routes/bookingsRouter.js");

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
			tokenData.username + " " + tokenData.userId + " " + tokenData.type;
		res.locals.loginUser = tokenData.username;
		res.locals.loginId = tokenData.userId;
		res.locals.isLoggedIn = true;
		res.locals.loginType = tokenData.type;
	} else {
		res.locals.loginInfo = "Not logged in";
		res.locals.isLoggedIn = false;
	}
	next();
});

app.use("/anvandare", usersRouter);
app.use("/kontakt", contactsRouter);
app.use("/admin", adminsRouter);
app.use("/bokning", bookingsRouter);

app.get("/", async (req, res) => {
	const user = await UserModel.findById(req.params.id);
	const employee = await EmployeeModel.findById(req.params.id);

	console.log(res.locals.loginType);
	res.render("home", { user, employee });
});

app.listen(port, () => {
	console.log(`Listening to http://localhost:${port}`);
});
