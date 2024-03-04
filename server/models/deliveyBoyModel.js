const mongoose = require("mongoose");

const deliveryBoySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username field cannot be empty"],
    trim: true,
    index: true,
  },
  mobile: {
    type: String,
    trim: true,
    required: [true, "mobile field cannot be empty"],
    unique: [true, "mobile Already exists"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password field cannot be empty"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  online: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  inprogress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  ordersCompleated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
});

// Index the location field for efficient geospatial queries
deliveryBoySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("DeliveyBoy", deliveryBoySchema);
