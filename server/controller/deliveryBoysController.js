const Order = require("../models/orderModel");
const DeliveryBoy = require("../models/deliveyBoyModel");
const {
  generatePasswordHash,
  checkePasswordHash,
} = require("../utils/bcrypt ");

const {
  generateAccessToken,
  generateRefreshToken,
  extractDeliveryBoyId,
} = require("../utils/jwt");
const { compareDistance } = require("../utils/compareDistance");

const updateDeliveryBoyLocation = async (
  deliveryBoyId,
  latitude,
  longitude
) => {
  try {
    // Update delivery boy's location in the database
    const updatedDeliveryBoy = await DeliveryBoy.findByIdAndUpdate(
      deliveryBoyId,
      {
        $set: {
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
      },
      { new: true }
    );

    if (!updatedDeliveryBoy) {
      return console.log("delivery boy not found");
    }

    return updatedDeliveryBoy;
  } catch (error) {
    console.error("Error updating delivery boy location:", error);
  }
};

const getDeliveryBoyOrder = async (req, res) => {
  try {
    const token = req.headers.token;
    const deliveryBoyId = extractDeliveryBoyId(token);

    // delivery boy coordinates
    const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);
    if (!deliveryBoy) {
      return res.status(400).json({
        message: `deliveryBoy not found`,
      });
    }
    const deliveryBoyCoordinates = deliveryBoy.location.coordinates;
    const deliveryBoyLatitude = deliveryBoyCoordinates[1];
    const deliveryBoyLongitude = deliveryBoyCoordinates[0];

    const order = await Order.find({ delivery: "pending" })
      .select("cart delivery createdAt ")
      .populate({
        path: "cart",
        populate: [
          { path: "menuItem", model: "Menu" },
          { path: "restaurant", model: "Restaurant" },
        ],
      });

    // Filter orders that are within 10km(for test) from the delivery boy
    const nearbyOrders = order.filter((order) => {
      return order.cart.some((cartItem) => {
        const restaurant = cartItem.restaurant;
        const restaurantLatitude = restaurant.lat;
        const restaurantLongitude = restaurant.long;

        // Calculate the distance between delivery boy and restaurant
        const distance = compareDistance(
          deliveryBoyLatitude,
          deliveryBoyLongitude,
          restaurantLatitude,
          restaurantLongitude
        );

        // Return true if the distance is less than or equal to 10km
        return distance <= 10; // 10km
      });
    });
    res.json(nearbyOrders);
  } catch (error) {
    console.error("Error fetching available orders:", error);
    throw error;
  }
};

const takeOrderDeliveryBoy = async (req, res) => {
  try {
    const { token, orderId } = req.body;
    const deliveryBoyId = extractDeliveryBoyId(token);

    const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);
    if (!deliveryBoy) {
      return res.status(400).json({
        message: "delivery boy not found",
      });
    }

    // Check if the order is already in progress
    const isInProgress = deliveryBoy.inprogress.some((id) =>
      id.equals(orderId)
    );
    if (isInProgress) {
      return res.status(400).json({
        message: `${orderId} is already selected`,
      });
    }

    // Check if delivery boy already has an order in progress
    if (deliveryBoy.inprogress.length > 0) {
      return res.status(400).json({
        message: "Delivery boy can handle only one order at a time",
      });
    }
    // Add the order to inprogress array
    deliveryBoy.inprogress.push(orderId);
    await deliveryBoy.save();

    // Update the order status to "inprogress"
    await Order.findByIdAndUpdate(orderId, { delivery: "inprogress" });

    res.status(200).json(deliveryBoy);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const orderdetailsDeliveryBoy = async (req, res) => {
  const token = req.headers.token;
  try {
    const deliveryBoyId = extractDeliveryBoyId(token);

    const details = await DeliveryBoy.findById(deliveryBoyId)
      .select("inprogress")
      .populate({
        path: "inprogress",
        populate: {
          path: "cart",
          populate: [
            { path: "menuItem", model: "Menu" },
            { path: "restaurant", model: "Restaurant" },
          ],
        },
      });

    if (!details) {
      return res.status(400).json({
        message: "Delivery boy not found",
      });
    }
    res.status(200).json(details);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const completedOrdersDetails = async (req, res) => {
  try {
    const token = req.headers.token;
    const deliveryBoyId = extractDeliveryBoyId(token);

    const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId)
      .select("ordersCompleted")
      .populate({
        path: "ordersCompleted",
        select: "cart delivery createdAt deliveryCharge ",
        populate: [
          { path: "cart", populate: { path: "menuItem", model: "Menu" } },
          {
            path: "cart",
            populate: { path: "restaurant", model: "Restaurant" },
          },
        ],
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
const deliveyBoyDetailsAdmin = async (req, res) => {
  try {
    const delivery = await DeliveryBoy.find().select("name mobile").populate({
      path: "ordersCompleted",
      select: "cart delivery createdAt deliveryCharge",
    });
    if (!delivery) {
      return res.status(400).json({ message: "Delivery boy not found" });
    }
    res.status(200).json(delivery);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// authentication delivery boy
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

const loginDeliveryboy = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await DeliveryBoy.findOne({ mobile });

    if (!user) {
      return res.status(401).json({
        message: "User is not valid",
      });
    }
    const validPassword = await checkePasswordHash(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Mobile/Password is not valid",
      });
    }
    // generates access token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.json({
      _id: user._id,
      userName: user.userName,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.json({
      message: "Logged out  ",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDeliveryBoyOrder,
  deliveyBoyRegister,
  updateDeliveryBoyLocation,
  takeOrderDeliveryBoy,
  deliveyBoyDetailsAdmin,
  orderdetailsDeliveryBoy,
  completedOrdersDetails,
  loginDeliveryboy,
  logout,
};
