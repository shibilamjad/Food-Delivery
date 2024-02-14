const mongoose = require("mongoose");

const quantitySchema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 1,
  },
  totalPrice: {
    type: Number,
    trim: true,
  },
});
module.exports = mongoose.model("Quantity", quantitySchema);
