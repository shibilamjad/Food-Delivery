const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
      },
    ],
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
        quantity: {
          type: Number,
          default: 1,
        },
        totalPrice: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

// Define a virtual property for totalPrice
userSchema.virtual("totalPrice").get(async function () {
  let totalPrice = 0;
  await Promise.all(
    this.cart.map(async (item) => {
      const menuItem = await mongoose.model("Menu").findById(item.menuItem);
      totalPrice += (menuItem.unitPrice - menuItem.discount) * item.quantity;
    })
  );
  return totalPrice;
});

module.exports = mongoose.model("Users", userSchema);
