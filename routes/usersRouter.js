require("dotenv").config();
const express = require("express");
const router = express.Router();
const { UserModel } = require("../models/UsersModel.js");

router.get("/registrera", (req, res) => {
  res.render("/");
});

module.exports = router;
