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
  location: {
    type: String,
    trim: true,
    required: [true, "location field cannot be empty"],
  },
  image: {
    type: String,
    required: true,
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
  openTime: {
    type: Number,
    required: [true, "openTime field cannot be empty"],
  },
  closeTime: {
    type: Number,
    required: [true, "closeTime field cannot be empty"],
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  ],
});

restaurantSchema.index({ lat: "2dsphere", long: "2dsphere" });

module.exports = mongoose.model("Restaurant", restaurantSchema);
