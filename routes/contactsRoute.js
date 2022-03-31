require("dotenv").config();
require("../mongoose.js");
const express = require("express");
const router = express.Router();
const ContactModel = require("../models/ContactModel.js");

router.get("/", (req, res) => {
	res.render("contact/contact");
});

router.post("/", async (req, res) => {
	const { namn, email, kontakt } = req.body;
	const newMessage = new ContactModel({
		namn,
		email,
		kontakt,
	});

	await newMessage.save();
	res.redirect("/");
});

module.exports = router;
