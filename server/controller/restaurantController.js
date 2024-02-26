const Restaurant = require("../models/restaurantModel");
const cloudinaryImg = require("../config/cloudinery");
const util = require("util");
const upload = require("../middleware/multer");

const getRestaurantList = async (req, res) => {
  try {
    const restaurant = await Restaurant.find();
    res.status(200).json(restaurant);
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
  const { restaurantId } = req.params;
  try {
    const restaurant = await Restaurant.findById(restaurantId)
      .select(" restaurant address lat long location  openTime  closeTime")
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
  const { _id } = req.body;
  try {
    const isExist = await Restaurant.findById(_id);
    if (!isExist) {
      return res.status(404).json({
        message: "Restaurants not found",
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
  getRestaurantList,
  addNewRestaurants,
  updateRestaurants,
  deleteRestaurants,
  getRestaurantMenus,
  getRestaurantId,
};
