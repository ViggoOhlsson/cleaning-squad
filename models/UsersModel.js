const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});
const UserModel = model("Users", userSchema);
module.exports = UserModel;
