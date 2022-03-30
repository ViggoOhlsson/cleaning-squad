require("dotenv").config();
require("../mongoose.js");
const express = require("express");
const router = express.Router();
const utils = require("../utils.js");
const EmployeeModel = require("../models/EmployeeModel.js");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
	res.render("admin/admin-login");
});

router.get("/skapa", (req, res) => {
	res.render("admin/admin-create");
});

router.post("/skapa", async (req, res) => {
	const { username, password, confirmPassword, type } = req.body;
	EmployeeModel.findOne({ username }, async (err, employee) => {
		if (employee) {
			res.render("admin/admin-create", {
				error: "Användarnamnet är upptaget.",
			});
		} else if (password.length <= 3) {
			res.render("admin/admin-create", {
				error: "Ditt lösenord måste vara minst 4 tecken långt!",
			});
		} else if (password !== confirmPassword) {
			res.render("admin/admin-create", { error: "Lösenord matchar inte!" });
		} else {
			const newEmployee = new EmployeeModel({
				username,
				password: utils.hashPassword(password),
				type,
			});
			await newEmployee.save();
			res.redirect("/");
		}
	});
});

router.post("/", async (req, res) => {
	const { username, password } = req.body;

	EmployeeModel.findOne({ username }, (err, employee) => {
		if (employee && utils.comparePassword(password, employee.password)) {
			const userData = { userId: employee._id, username };
			const accessToken = jwt.sign(userData, process.env.JWT_SECRET);
			res.cookie("token", accessToken);
			console.log("Logga in lyckades");
			res.redirect("/");
		} else {
			res.render("admin/admin-login", { error: "Login misslyckades" });
		}
	});
});

router.get("/:id", async (req, res) => {
	const employee = await EmployeeModel.findById(req.params.id);

	res.render("admin/admin-profile", { employee });
});

module.exports = router;
