const Restaurant = require("../models/restaurantModel");
const Admin = require("../models/adminModel");
const cloudinaryImg = require("../config/cloudinery");
const util = require("util");
const upload = require("../middleware/multer");
const User = require("../models/userModel");
const { extractUserId } = require("../utils/jwt");
const { compareDistance } = require("../utils/compareDistance");

const getRestaurantList = async (req, res) => {
  try {
    const { search, page, limit } = req.query;
    const regexPattern = new RegExp(search, "i");
    let skip = 0;
    if (page > 1) {
      skip = +limit * (page - 1);
    }

    const restaurant = await Restaurant.find({ restaurant: regexPattern })
      .skip(skip)
      .limit(+limit);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getRestaurantMenucreation = async (req, res) => {
  try {
    const restaurant = await Restaurant.find();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getRestaurantAvailable = async (req, res) => {
  try {
    const { token } = req.headers;
    const { page, limit } = req.query;
    const userId = extractUserId(token);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    let skip = 0;
    if (page > 1) {
      skip = +limit * (page - 1);
    }
    const userCoordinates = user.location.coordinates;
    const userLatitude = userCoordinates[1];
    const userLongitude = userCoordinates[0];

    const restaurants = await Restaurant.find().skip(skip).limit(+limit);
    // Map each restaurant to include distance and estimated time
    const restaurantsWithDistanceAndTime = restaurants.map((restaurant) => {
      const restaurantLatitude = restaurant.lat;
      const restaurantLongitude = restaurant.long;
      // calculate the distance between user and restaurants
      const distance = compareDistance(
        userLatitude,
        userLongitude,
        restaurantLatitude,
        restaurantLongitude
      );
      // Assuming an average speed of 40 km/h
      const estimatedTimeInHours = distance / 40; // in hours
      const estimatedTimeInMinutes = estimatedTimeInHours * 60; // convert hours to minutes
      return {
        ...restaurant.toObject(),
        distance,
        estimatedTime: estimatedTimeInMinutes,
      };
    });

    // filter near by restaurants in user 30km inside
    const nearByRestaurants = restaurantsWithDistanceAndTime.filter(
      (restaurant) => {
        return restaurant.distance <= 30; // 30km inside restaurants only fetch
      }
    );

    res.status(200).json(nearByRestaurants);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getRestaurantId = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const restaurant = await Restaurant.findById(restaurantId).select(
      "  restaurant address lat long location  openTime  closeTime  "
    );
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getRestaurantMenus = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { token } = req.headers;
    const userId = extractUserId(token);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const restaurant = await Restaurant.findById(restaurantId)
      .select(
        "restaurant address lat long reviews location openTime closeTime menu"
      )
      .populate({
        path: "menu",
        select: "name unitPrice ingredients isAvailable discount imageUrl",
      })
      .populate({
        path: "reviews",
        select: "content ratings userId imageUrl createdAt",
        populate: {
          path: "userId",
          select: "userName",
        },
      });

    // Calculate distance and estimated time between user and restaurant
    const userCoordinates = user.location.coordinates;
    const userLatitude = userCoordinates[1];
    const userLongitude = userCoordinates[0];

    const restaurantCoordinates = [restaurant.long, restaurant.lat];
    const restaurantLatitude = restaurantCoordinates[1];
    const restaurantLongitude = restaurantCoordinates[0];

    const distance = compareDistance(
      userLatitude,
      userLongitude,
      restaurantLatitude,
      restaurantLongitude
    );

    // Assuming an average speed of 40 km/h
    const estimatedTimeInHours = distance / 40; // in hours
    const estimatedTimeInMinutes = estimatedTimeInHours * 60; // convert hours to minutes

    const restaurantWithDistanceAndTime = {
      ...restaurant.toObject(),
      distance,
      estimatedTime: estimatedTimeInMinutes,
    };

    res.status(200).json(restaurantWithDistanceAndTime);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getRestaurantMenusAdmin = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      return res.status(400).json({
        message: "restaurant id not found",
      });
    }
    const restaurant = await Restaurant.findById(restaurantId)
      .select("restaurant address lat long location openTime closeTime")
      .populate({
        path: "menu",
        select: "name unitPrice ingredients isAvailable discount imageUrl",
      })
      .select("restaurant");

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const addNewRestaurants = async (req, res) => {
  try {
    const uploadAsync = util.promisify(upload.single("image"));
    await uploadAsync(req, res);

    const cloudinaryResult = await cloudinaryImg.uploader.upload(req.file.path);
    const { secure_url: image } = cloudinaryResult;

    const { restaurant, lat, long, address, location, openTime, closeTime } =
      req.body;

    // Parse opening and closing times into numbers
    const parseTime = (timeStr) => {
      const [hourMinute, period] = timeStr.split(" ");
      const [hour, minute] = hourMinute.split(":").map(Number);
      let hours = hour;
      if (period.toLowerCase() === "pm" && hour !== 12) {
        hours += 12;
      } else if (period.toLowerCase() === "am" && hour === 12) {
        hours = 0;
      }
      return hours * 60 + minute;
    };

    const parsedOpenTime = parseTime(openTime);
    const parsedCloseTime = parseTime(closeTime);

    const isExistingRestaurant = await Restaurant.findOne({ restaurant });
    if (isExistingRestaurant) {
      return res.status(400).json({
        message: `${restaurant} already created`,
      });
    }
    const create = await Restaurant.create({
      restaurant,
      address,
      lat,
      long,
      location,
      image,
      openTime: parsedOpenTime,
      closeTime: parsedCloseTime,
    });
    return res.status(200).json(create);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateRestaurants = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const uploadAsync = util.promisify(upload.single("image"));
    await uploadAsync(req, res);
    let image;

    if (req.file) {
      const cloudinaryResult = await cloudinaryImg.uploader.upload(
        req.file.path
      );
      // const { secure_url: image } = cloudinaryResult;
      image = cloudinaryResult.secure_url;
    }
    const { restaurant, lat, long, address, location, openTime, closeTime } =
      req.body;
    const parseTime = (timeStr) => {
      const [hourMinute, period] = timeStr.split(" ");
      const [hour, minute] = hourMinute.split(":").map(Number);
      let hours = hour;
      if (period && period.toLowerCase() === "pm" && hour !== 12) {
        hours += 12;
      } else if (period && period.toLowerCase() === "am" && hour === 12) {
        hours = 0;
      }
      return hours * 60 + minute;
    };

    const parsedOpenTime = parseTime(openTime);
    const parsedCloseTime = parseTime(closeTime);

    let updateObject = {
      restaurant,
      lat,
      long,
      address,
      location,
      openTime: parsedOpenTime,
      closeTime: parsedCloseTime,
    };

    if (image) {
      updateObject.image = image;
    }

    const update = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updateObject,
      {
        new: true,
      }
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteRestaurants = async (req, res) => {
  const { _id, userId } = req.body;
  try {
    const isExist = await Restaurant.findById(_id);
    const isAdmin = await Admin.findById(userId);

    if (!isExist) {
      return res.status(404).json({
        message: "Restaurants not found",
      });
    }
    if (isAdmin && isAdmin.email === "test@gmail.com") {
      return res.status(404).json({
        message: "Test account can not deleted",
      });
    }
    const deleteRestaurant = await Restaurant.findByIdAndDelete(_id);
    res.status(200).json(deleteRestaurant);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRestaurantAvailable,
  getRestaurantList,
  addNewRestaurants,
  getRestaurantMenucreation,
  updateRestaurants,
  deleteRestaurants,
  getRestaurantMenus,
  getRestaurantId,
  getRestaurantMenusAdmin,
};
