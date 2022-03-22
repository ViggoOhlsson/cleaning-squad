const { Schema, model } = require("mongoose");
const usersSchema = new Schema(
  { displayName: { type: String, required: true } },
  { strict: false }
);
const UsersModel = model("Users", usersSchema);
module.exports = { UsersModel };
