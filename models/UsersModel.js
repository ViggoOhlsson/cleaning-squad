const { Schema, model } = require("mongoose");
const usersSchema = new Schema({ 
    username: { type: String, required: true },
    password: {type:String, required:true },
    email: {type:String, required:true},
    address: {type:String, required:true }
});
const UsersModel = model("Users", usersSchema);
module.exports = { UsersModel };
