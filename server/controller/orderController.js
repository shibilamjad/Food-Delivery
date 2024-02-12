const Users = require("../models/userModel");
const Order = require("../models/orderModel");
const { use } = require("../routes/order");

const userOrderConfirm = async (req, res) => {
  const { orderId } = req.params;
  const { userId } = req.body;
  try {
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    const user = await Users.findById(userId).populate({
      path: "orderHistary",
      model: "Orders",
      select: "userName mobile address delivery",
      populate: {
        path: "cart",
        model: "Menu",
        select: "name unitPrice ingredients discount quantity imageUrl",
      },
    });

    res.status(200).json(user.orderHistary);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const userOrderList = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await Users.findById(userId).populate({
      path: "orderHistary",
      model: "Orders",
      select: "userName mobile address delivery",
      populate: {
        path: "cart",
        model: "Menu",
        select: "name unitPrice ingredients discount quantity imageUrl",
      },
    });

    res.status(200).json(user.orderHistary);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { userName, mobile, address } = req.body;
    if (!userName || !mobile || !address) {
      return res.status(400).json({
        success: false,
        message: "Please provide userName, mobile, and address.",
      });
    }

    const cartItems = user.cart;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Create the order
    const order = await Order.create({
      userName,
      mobile,
      address,
      cart: cartItems,
      orderItems: cartItems,
    });
    // Push the orderId into the orderHistory array
    user.orderHistary.push(order._id);
    // Clear the cart

    user.cart = [];
    await user.save();

    return res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { userOrderList, createOrder, userOrderConfirm };
