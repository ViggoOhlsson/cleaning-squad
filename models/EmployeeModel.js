const { Schema, model } = require("mongoose");
const usersSchema = new Schema({ 
    username: { type: String, required: true },
    password: { type: String, required:true },
    type: {type:String, required:true, enum: ["cleaner", "admin"]}
});
const UsersModel = model("Users", usersSchema);
module.exports = { UsersModel };
