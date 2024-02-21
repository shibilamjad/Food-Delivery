const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    trim: true,
    required: [true, "restaurant field cannot be empty"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "restaurant field cannot be empty"],
  },
  lat: {
    type: Number,
    trim: true,
    required: [true, "lat field cannot be empty"],
  },
  long: {
    type: Number,
    trim: true,
    required: [true, "long field cannot be empty"],
  },
});
module.exports = mongoose.model("Restaurant", restaurantSchema);
