const mongoose = require("mongoose");

const statusOptions = ["success", "pending", "ongoing"];

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
    minLength: 2,
  },
  mobile: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  // totalPrice: {
  //   type: Number,
  //   trim: true,
  //   required: true,
  // },
  delivery: {
    type: String,
    enum: statusOptions,
    default: "pending",
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
  ],
});

//Export the model
module.exports = mongoose.model("Orders", orderSchema);
