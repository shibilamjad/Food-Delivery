const Users = require("../models/userModel");
const Order = require("../models/orderModel");

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
      populate: [
        {
          path: "cart",
          model: "Menu",
          select: "name unitPrice ingredients discount quantity imageUrl",
        },
        {
          path: "cart",
          model: "Restaurant",
          select: "restaurant image",
        },
      ],
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
      .select("userName  address mobile delivery createdAt deliveryCharge")
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select: "name unitPrice ingredients discount",
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

const userOrderDetailsReview = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId)
      .select("userId")
      .populate({
        path: "reviews",
        populate: {
          path: "userId",
          model: "Users",
          select: "_id userName",
        },
      })
      .populate({
        path: "cart.restaurant",
        model: "Restaurant",
        select: "_id",
      });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
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
    const { page, limit, delivery, sortBy } = req.query;
    let skip = 0;
    if (page > 1) {
      skip = +limit * (page - 1);
    }

    let filter = {};
    if (delivery && delivery !== "all") {
      filter.delivery = delivery;
    }

    let orderList = Order.find(filter)
      .select("userName delivery createdAt cart deliveryCharge")
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select: "name unitPrice discount ",
      })
      .populate({
        path: "cart.restaurant",
        model: "Restaurant",
        select: "restaurant image location",
      })
      .skip(skip)
      .limit(+limit);
    if (sortBy) {
      const [field, order] = sortBy.split("-");
      const sortOption = {};
      sortOption[field === "startDate" ? "createdAt" : field] =
        order === "desc" ? -1 : 1;
      orderList = orderList.sort(sortOption);
    }
    const orders = await orderList.exec();
    res.status(200).json(orders);
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
      .select(
        "userName mobile delivery createdAt address latitude longitude deliveryCharge cart"
      )
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select: "name unitPrice ingredients discount imageUrl totalPrice",
      })
      .populate({
        path: "cart.restaurant",
        model: "Restaurant",
        select: "restaurant address location",
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
const getRestaurantIdFromOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    const restaurantId = order.cart.map((item) => item.restaurant);
    return restaurantId;
  } catch (error) {
    console.error("Error getting restaurantId from order:", error);
    throw error;
  }
};

const ordersNotification = async (req, res) => {
  try {
    const orderList = await Order.find()
      .select("createdAt cart delivery")
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select: "name imageUrl",
      })
      .sort({ createdAt: -1 })
      .limit(10);
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

    const { userName, mobile, address, latitude, longitude, deliveryCharge } =
      req.body;
    if (
      !userName ||
      !mobile ||
      !address ||
      !latitude ||
      !longitude ||
      !deliveryCharge
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide userName, mobile, and address,latitude ,longitude ,deliveryCharge.",
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
      latitude,
      longitude,
      totalPrice,
      deliveryCharge,
      cart: cartItems,
      userId,
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
  ordersNotification,
  getRestaurantIdFromOrder,
  userOrderDetailsReview,
};
