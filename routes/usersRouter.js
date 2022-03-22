require("dotenv").config();
require("../mongoose.js");
const express = require("express");
const router = express.Router();
const UserModel = require("../models/UsersModel.js");

router.get("/registrera", (req, res) => {
  res.render("users/users-create");
});

router.post("/registrera", async (req, res) => {
  const { username, password, confirmPassword, email, address } = req.body;
  UserModel.findOne({ username }, async (err, user) => {
    if (user) {
      res.render("anvandare/users-create", {
        error: "Username already exists",
      });
    } else if (password.length <= 3) {
      res.render("users/users-create", {
        error: "Your password must contain at least 4 characters",
      });
    } else if (password !== confirmPassword) {
      res.render("users/users-create", { error: "Passwords don't match" });
    } else {
      const newUser = new UserModel({
        username,
        password,
        email,
        address,
      });
      await newUser.save();
      res.redirect("/");
    }
  });
});
module.exports = router;
