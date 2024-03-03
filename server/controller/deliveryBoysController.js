const Order = require("../models/orderModel");
const DeliveryBoy = require("../models/deliveyBoyModel");
const { generatePasswordHash } = require("../utils/bcrypt ");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { calculateBoundingBox } = require("../utils/calculateBoundingBox");

const fetchAndEmitAvailableOrders = async (socket) => {
  try {
    console.log("A user connected");
    // Call the deliveryBoyLocation function to get the delivery boy's location
    const deliveryBoyCoordinates = await deliveryBoyLocation();

    // Check if delivery boy's coordinates are valid
    if (
      !deliveryBoyCoordinates ||
      !deliveryBoyCoordinates.latitude ||
      !deliveryBoyCoordinates.longitude
    ) {
      throw new Error("Failed to fetch delivery boy's location");
    }

    //  bounding box for the 3 km radius around the delivery boy's location
    const boundingBox = calculateBoundingBox(deliveryBoyLocation, 3);

    // Fetch available orders directly within the Socket.IO connection
    const orderList = await Order.find({
      delivery: "pending",
      deliveryLocation: {
        $geoWithib: {
          $geometry: {
            type: "Polygon",
            coordinates: [boundingBox],
          },
        },
      },
    })
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
    if (socket) {
      socket.emit("availableOrders", orderList);
    } else {
      throw new Error("Socket is undefined");
    }

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  } catch (error) {
    console.error("Error fetching available orders:", error);
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
      // location: {
      //   type: "Point",
      //   coordinates: location.coordinates,
      // },
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
        name: createUser.name,
        accessToken,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  fetchAndEmitAvailableOrders,
  deliveyBoyRegister,
};
