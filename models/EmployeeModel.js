const { Schema, model } = require("mongoose");
const employeeSchema = new Schema({ 
    username: { type: String, required: true },
    password: { type: String, required:true },
    type: {type:String, required:true, enum: ["cleaner", "admin"]}
});
const EmployeeModel = model("Employees", employeeSchema);
module.exports = EmployeeModel
