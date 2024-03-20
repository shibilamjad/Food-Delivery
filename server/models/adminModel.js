const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Email field cannot be empty"],
    unique: [true, "Email Already exists"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password field cannot be empty"],
  },
});

module.exports = mongoose.model("Admin", adminSchema);
