const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
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
        restaurant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Restaurant",
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
