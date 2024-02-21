const Restaurant = require("../models/restaurantModel");

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

const addNewRestaurants = async (req, res) => {
  const { restaurant, lat, long, address } = req.body;
  try {
    // const isExist = await Restaurant.findOne(restaurant);
    // if (isExist) {
    //   return res.status(409).json({
    //     message: `${restaurant} already created`,
    //   });
    // }
    const create = await Restaurant.create({ restaurant, address, lat, long });
    return res.status(200).json(create);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateRestaurants = async (req, res) => {
  const { reastaurantId } = req.params;
  const { name, lat, long, address } = req.body;
  try {
    const isExits = await Restaurant.findById(reastaurantId);
    if (!isExits) {
      return res.status(404).json({
        message: "Restaurants not found",
      });
    }
    const update = await Restaurant.findByIdAndUpdate(
      reastaurantId,
      {
        name,
        address,
        lat,
        long,
      },
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
};
