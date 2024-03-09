const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const statusOptions = ["success", "pending", "inprogress"];

const orderSchema = new mongoose.Schema(
  {
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
      type: Object,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      enum: statusOptions,
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    cart: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
        restaurant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Restaurant",
        },

        quantity: {
          type: Number,
        },
        totalPrice: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
