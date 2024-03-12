const Order = require("../models/orderModel");
const DeliveryBoy = require("../models/deliveyBoyModel");
const { extractDeliveryBoyId } = require("../utils/jwt");

const totolOrdersAdmin = async (req, res) => {
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

const completedOrdersDeliveryBoy = async (req, res) => {
  try {
    const token = req.headers.token;
    const deliveryBoyId = extractDeliveryBoyId(token);

    const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId)
      .select("ordersCompleted")
      .populate({
        path: "ordersCompleted",
        select: " delivery createdAt deliveryCharge ",
      });
    if (!deliveryBoy) {
      return res.status(400).json({
        message: `deliveryBoy not found`,
      });
    }

    res.status(200).json(deliveryBoy);
  } catch (error) {
    console.error("Error fetching available orders:", error);
    throw error;
  }
};

module.exports = { totolOrdersAdmin, completedOrdersDeliveryBoy };
