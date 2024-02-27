const Order = require("../models/orderModel");
const User = require("../models/userModel");

menuSchema.pre("remove", async function (next) {
  const menuItemId = this._id;
  await Order.updateMany(
    { "cart.menuItem": menuItemId },
    { $pull: { cart: { menuItem: menuItemId } } }
  );
  await User.updateMany(
    { "cart.menuItem": menuItemId },
    { $pull: { cart: { menuItem: menuItemId } } }
  );
  next();
});

module.exports = mongoose.model("Menu", menuSchema);
