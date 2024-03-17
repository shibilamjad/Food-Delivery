const cloudinaryImg = require("../config/cloudinery");
const util = require("util");
const upload = require("../middleware/multer");
const Review = require("../models/reviewsModel");
const Restaurant = require("../models/restaurantModel");
const Order = require("../models/orderModel");

const reviewCreation = async (req, res) => {
  try {
    const uploadAsync = util.promisify(upload.single("imageUrl"));
    await uploadAsync(req, res);

    let imageUrl;
    if (req.file) {
      const cloudinaryResult = await cloudinaryImg.uploader.upload(
        req.file.path
      );
      imageUrl = cloudinaryResult.secure_url;
    } else {
      imageUrl = undefined;
    }

    const { restaurant, content, ratings, userId, order } = req.body;

    const foundRestaurant = await Restaurant.findOne({
      _id: restaurant,
    });

    const foundOrder = await Order.findOne({
      _id: order,
    });

    if (!foundRestaurant) {
      return res.status(404).json({
        message: `Restaurant '${restaurant}' not found`,
      });
    }

    if (!foundOrder) {
      return res.status(404).json({
        message: `Order '${order}' not found`,
      });
    }
    const create = await Review.create({
      restaurant: foundRestaurant._id,
      content,
      ratings,
      userId,
      imageUrl,
      order,
    });

    const updateRestaurant = await Restaurant.findByIdAndUpdate(
      restaurant,
      {
        $push: { reviews: create._id },
      },
      {
        new: true,
      }
    );
    const updateOrder = await Order.findByIdAndUpdate(
      order,
      {
        $push: { reviews: create._id },
      },
      {
        new: true,
      }
    );
    if (!updateRestaurant) {
      return res.status(404).json({
        message: `restaurant '${restaurant}' not found or could not be updated`,
      });
    }
    if (!updateOrder) {
      return res.status(404).json({
        message: `order '${order}' not found or could not be updated`,
      });
    }

    return res.status(200).json(create);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { reviewCreation };
