const { Schema, model } = require("mongoose");
const contactSchema = new Schema({
  namn: { type: String },
  email: { type: String },
  kontakt: { type: String },
});

const ContactModel = model("Messages", contactSchema);
module.exports = ContactModel;
