const express = require("express");
const router = express.Router();

const {
  getRestaurantList,
  addNewRestaurants,
  updateRestaurants,
  deleteRestaurants,
  getRestaurantMenus,
  getRestaurantId,
} = require("../controller/restaurantController");

router.get("/", getRestaurantList);
router.get("/edit/:restaurantId", getRestaurantId);
router.get("/:restaurantId", getRestaurantMenus);
router.post("/createRestaurant", addNewRestaurants);
router.put("/update/:restaurantId", updateRestaurants);
router.delete("/deleteRestaurant", deleteRestaurants);

module.exports = router;
