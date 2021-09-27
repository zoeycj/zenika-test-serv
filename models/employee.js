const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cafe: {
    type: String,
    require: true,
  },
  days_worked: {
    type: Number,
    require: true,
  },
  id: {
    type: String,
    default: uuidv4(),
  },
});

const EmployeeModel = mongoose.model("employee", EmployeeSchema);

module.exports = EmployeeModel;
