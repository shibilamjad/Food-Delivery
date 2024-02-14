const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 50,
      minLength: 2,
      lowercase: true,
      required: true,
    },
    ingredients: {
      type: String,
      trim: true,
      maxLength: 100,
      minLength: 2,
      lowercase: true,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },
    totalPrice: {
      type: Number,
      trim: true,
    },
    discount: {
      type: Number,
    },

    isAvailable: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
