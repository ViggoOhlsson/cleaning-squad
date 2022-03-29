require("dotenv").config();
require("../mongoose.js");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("contact/contact");
});

module.exports = router;
