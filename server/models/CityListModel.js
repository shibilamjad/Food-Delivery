const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  cityName: {
    type: String,
    trim: true,
    required: [true, "restaurant field cannot be empty"],
  },
  latitude: {
    type: Number,
    trim: true,
    required: [true, "lat field cannot be empty"],
  },
  longitude: {
    type: Number,
    trim: true,
    required: [true, "long field cannot be empty"],
  },
});

module.exports = mongoose.model("City", CitySchema);
