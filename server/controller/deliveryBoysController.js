const Order = require("../models/orderModel");
const DeliveryBoy = require("../models/deliveyBoyModel");
const { generatePasswordHash } = require("../utils/bcrypt ");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const fetchAndEmitAvailableOrders = async (socket) => {
  try {
    console.log("A user connected");

    // Fetch available orders directly within the Socket.IO connection
    const orderList = await Order.find({ delivery: "pending" })
      .select("userName delivery createdAt cart")
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select: "name unitPrice",
      })
      .populate({
        path: "cart.restaurant",
        model: "Restaurant",
        select: "restaurant image lat long",
      });

    // Emit available orders when a new client connects
    socket.emit("availableOrders", orderList);

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  } catch (error) {
    console.error("Error handling connection:", error);
    socket.emit("error", "An error occurred while handling the connection");
  }
};

const assignOrderToNearestDeliveryBoy = async (order) => {
  try {
    // Find the nearest online delivery boy
    const nearestDeliveryBoy = await DeliveryBoy.findOne({
      online: true,
    }).sort({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: order.deliveryLocation.coordinates,
          },
        },
      },
    });

    if (!nearestDeliveryBoy) {
      throw new Error("No online delivery boy available");
    }

    // Assign the order to the nearest delivery boy
    order.deliveryBoy = nearestDeliveryBoy._id;
    await order.save();

    // Emit real-time update about the order assignment
    io.emit("orderAssigned", {
      orderId: order._id,
      deliveryBoyId: nearestDeliveryBoy._id,
    });
  } catch (error) {
    console.error("Error assigning order:", error);
    throw error;
  }
};

const deliveyBoyRegister = async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    const isExistMobile = await DeliveryBoy.findOne({ mobile });
    const isExistUserName = await DeliveryBoy.findOne({ name });

    // Check if email already exists
    if (isExistMobile) {
      return res.status(409).json({
        message: `${mobile} already exist`,
      });
    }

    // Check if username already exists
    if (isExistUserName) {
      return res.status(400).json({
        message: `${name} already created`,
      });
    }

    // create user
    const passwordHashed = await generatePasswordHash(password);
    const createUser = await DeliveryBoy.create({
      name,
      mobile,
      password: passwordHashed,
    });

    // Generate tokens for the newly registered user
    const accessToken = generateAccessToken(createUser._id);
    const refreshToken = generateRefreshToken(createUser._id);

    // Set refreshToken as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    if (createUser) {
      return res.json({
        _id: createUser._id,
        mobile: createUser.email,
        name: createUser.userName,
        accessToken,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { fetchAndEmitAvailableOrders, deliveyBoyRegister };
