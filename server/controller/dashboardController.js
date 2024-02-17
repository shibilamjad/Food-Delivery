const Order = require("../models/orderModel");

const totolOrders = async (req, res) => {
  try {
    const totalOrder = await Order.find()
      .select("delivery createdAt cart")
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select: "unitPrice discount name",
      });

    // Calculate totalPrice for each cart item
    totalOrder.forEach((order) => {
      order.cart.forEach((cartItem) => {
        cartItem.totalPrice =
          (cartItem.menuItem.unitPrice - cartItem.menuItem.discount) *
          cartItem.quantity;
      });
    });

    res.status(200).json(totalOrder);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { totolOrders };
