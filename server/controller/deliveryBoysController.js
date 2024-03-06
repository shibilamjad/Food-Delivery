const Order = require("../models/orderModel");
const DeliveryBoy = require("../models/deliveyBoyModel");
const Restaurant = require("../models/restaurantModel");
const Users = require("../models/userModel");
const { generatePasswordHash } = require("../utils/bcrypt ");
const jwt = require("jsonwebtoken");

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

    // find order only pending and populate the cart with restaurant details
    const order = await Order.find({ delivery: "pending" }).populate({
      path: "cart",
      populate: [
        {
          path: "restaurant",
        },
        {
          path: "menuItem",
        },
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
    const { deliveryBoyId, orderId } = req.body;
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
      return console.log(`${orderId} already selected`);
    }

    // Add the order to inprogress array
    deliveryBoy.inprogress.push(orderId);
    await deliveryBoy.save();

    return deliveryBoy;
  } catch (error) {
    return res.status(400).json({
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
      location: {
        type: "Point",
        coordinates: location.coordinates,
      },
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
  getDeliveryBoyOrder,
  deliveyBoyRegister,
  updateDeliveryBoyLocation,
  takeOrderDeliveryBoy,
};
