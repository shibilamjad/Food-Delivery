const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username field cannot be empty"],
    trim: true,
    index: true,
  },
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
