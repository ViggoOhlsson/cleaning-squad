require("dotenv").config();
require("../mongoose.js");
const express = require("express");
const BookingModel = require("../models/BookingModel.js");
const EmployeeModel = require("../models/EmployeeModel.js");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("bookings/bookings-create");
});

router.post("/", async (req, res) => {
	console.log(req.body);
	req.body.time = new Date(req.body.date + " " + req.body.time);
	console.log(req.body.time);

	req.body.status = "Inte Utförd";

	req.body.cleaner = await EmployeeModel.findOne({ type: "employee" }).lean();
	req.body.user = new mongoose.Types.ObjectId(res.locals.loginId);

	console.log("after processing", req.body);
	let booking = new BookingModel(req.body);
	console.log("BookingModel:", booking);
	await booking.save();
	res.redirect("/anvandare/" + res.locals.loginId);
});

module.exports = router;
