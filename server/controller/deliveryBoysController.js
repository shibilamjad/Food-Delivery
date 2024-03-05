const Order = require("../models/orderModel");
const DeliveryBoy = require("../models/deliveyBoyModel");
const Restaurant = require("../models/restaurantModel");
const { generatePasswordHash } = require("../utils/bcrypt ");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { calculateDistance } = require("../utils/calculateDistance");

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
      throw new Error("Delivery boy not found");
    }

    return updatedDeliveryBoy;
  } catch (error) {
    console.error("Error updating delivery boy location:", error);
  }
};
const getDistanceBetweenRestaurantAndDeliveryBoy = async (
  deliveryBoyId,
  latitude,
  longitude
) => {
  try {
    // Calculate distance between restaurant and delivery boy
    const order = await Order.findOne({
      "cart.deliveryBoy": deliveryBoyId,
    }).populate({
      path: "cart",
      populate: { path: "restaurant" },
    });

    if (!order) {
      console.log("No order found for the delivery boy.");
      return;
    }

    const restaurant = order.cart.restaurant;
    const restaurantCoords = [restaurant.long, restaurant.lat];
    const deliveryBoyCoords = [longitude, latitude];

    const distance = calculateDistance(restaurantCoords, deliveryBoyCoords);

    console.log(
      "Distance between restaurant and delivery boy:",
      distance,
      "km"
    );

    // Check if the delivery boy is within 1 km of the restaurant
    if (distance <= 1) {
      console.log("Delivery boy is within 1 km of the restaurant");
    } else {
      console.log("Delivery boy is not within 1 km of the restaurant");
    }

    // Fetch nearby restaurants within 1 km of the delivery boy
    const nearbyRestaurants = await Restaurant.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: deliveryBoyCoords },
          distanceField: "distance",
          maxDistance: 1000, // 1 km
          spherical: true,
        },
      },
    ]);

    // Emit nearby restaurants to the client
    io.emit("nearbyRestaurants", nearbyRestaurants);
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
  getDistanceBetweenRestaurantAndDeliveryBoy,
  deliveyBoyRegister,
  updateDeliveryBoyLocation,
};
