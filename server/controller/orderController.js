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
      path: "orderHistory",
      model: "Orders",
      select: "userName mobile address delivery totalPrice",
      populate: {
        path: "cart",
        model: "Menu",
        select: "name unitPrice ingredients discount quantity imageUrl",
      },
      options: { sort: { createdAt: -1 } },
      limit: 1,
    });

    if (!user || !user.orderHistory || user.orderHistory.length === 0) {
      return res.status(404).json({
        message: "orders not found",
      });
    }

    return user.orderHistory[0];
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const userOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId)
      .select("userName address mobile delivery createdAt")
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select: "name unitPrice ingredients discount ",
      })
      .populate({
        path: "cart.quantity",
      });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Calculate totalPrice for each cart item
    order.cart.forEach((cartItem) => {
      cartItem.totalPrice =
        (cartItem.menuItem.unitPrice - cartItem.menuItem.discount) *
        cartItem.quantity;
    });

    res.status(200).json([order]);
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
      path: "orderHistory",
      model: "Orders",
      select: "delivery createdAt ",
      populate: {
        path: "cart.menuItem",
        model: "Menu",
        select: "name unitPrice ingredients discount imageUrl",
      },
    });

    // Sort orderHistory array by createdAt field in descending order
    user.orderHistory.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(200).json(user.orderHistory);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const ordersAdmin = async (req, res) => {
  try {
    const orderList = await Order.find()
      .select("userName delivery createdAt cart")
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select: "name unitPrice",
      });
    res.status(200).json(orderList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const ordersDetailsAdmin = async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderList = await Order.findById(orderId)
      .select("userName mobile delivery createdAt address cart")
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select: "name unitPrice ingredients discount imageUrl totalPrice",
      });
    // Calculate totalPrice for each cart item
    orderList.cart.forEach((cartItem) => {
      cartItem.totalPrice =
        (cartItem.menuItem.unitPrice - cartItem.menuItem.discount) *
        cartItem.quantity;
    });

    res.status(200).json(orderList);
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
    const totalPrice = user.totalPrice;

    // Create the order
    const order = await Order.create({
      userName,
      mobile,
      address,
      totalPrice,
      cart: cartItems,
      // orderItems: cartItems,
    });

    // Push the orderId into the orderHistory array
    user.orderHistory.push(order._id);
    // Clear the cart
    user.cart = [];
    await user.save();

    // Return the orderId in the response
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: order._id,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  userOrderList,
  createOrder,
  userOrderConfirm,
  userOrderDetails,
  ordersAdmin,
  ordersDetailsAdmin,
};
