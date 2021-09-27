const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const CafeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  employees: {
    type: Array,
    default: [],
  },
  logo: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    default: uuidv4(),
  },
});

const CafeModel = mongoose.model("cafe", CafeSchema);

module.exports = CafeModel;
