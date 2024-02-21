const express = require("express");
const router = express.Router();

const {
  getRestaurantList,
  addNewRestaurants,
  updateRestaurants,
  deleteRestaurants,
} = require("../controller/restaurantController");

router.get("/", getRestaurantList);
router.post("/createRestaurant", addNewRestaurants);
router.put("/updateRestaurant", updateRestaurants);
router.delete("/deleteRestaurant", deleteRestaurants);

module.exports = router;
