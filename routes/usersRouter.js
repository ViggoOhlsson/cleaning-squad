require("dotenv").config();
require("../mongoose.js");
const express = require("express");
const router = express.Router();
const utils = require("../utils.js");
const UserModel = require("../models/UsersModel.js");
const EmployeeModel = require("../models/EmployeeModel.js");
const BookingModel = require("../models/BookingModel.js");
const jwt = require("jsonwebtoken");

router.get("/registrera", (req, res) => {
	res.render("users/users-create");
});

router.post("/registrera", async (req, res) => {
	const { username, password, confirmPassword, email, address } = req.body;
	UserModel.findOne({ username }, async (err, user) => {
		if (user) {
			res.render("anvandare/users-create", {
				error: "Användarnamnet är upptaget!",
			});
		} else if (password.length <= 3) {
			res.render("users/users-create", {
				error: "Ditt lösenord måste vara minst 4 tecken långt!",
			});
		} else if (password !== confirmPassword) {
			res.render("users/users-create", { error: "Lösenord matchar inte!" });
		} else {
			const newUser = new UserModel({
				username,
				password: utils.hashPassword(password),
				email,
				address,
			});
			await newUser.save();
			res.redirect("/anvandare/logga-in");
		}
	});
});

router.get("/anvandarvillkor", (req, res) => {
	res.render("users/users-gdpr");
});

router.get("/logga-in", (req, res) => {
	res.render("users/users-login");
});

router.post("/logga-in", async (req, res) => {
	const { username, password } = req.body;

	UserModel.findOne({ username }, (err, user) => {
		if (user && utils.comparePassword(password, user.password)) {
			const userData = { userId: user._id, username };
			const accessToken = jwt.sign(userData, process.env.JWT_SECRET);
			res.cookie("token", accessToken);

			res.redirect("/");
		} else {
			res.render("users/users-login", { error: "Inloggning misslyckades" });
		}
	});
});

router.get("/logga-ut", (req, res) => {
	res.cookie("token", "", { maxAge: 0 });
	res.redirect("/");
});

router.get("/:id", async (req, res) => {
	const user = await UserModel.findById(req.params.id).lean();
	const booking = await BookingModel.find({ user: res.locals.loginId }).populate("cleaner").lean();
	console.log(booking);
	res.render("users/users-account", { user, booking });
});

module.exports = router;
