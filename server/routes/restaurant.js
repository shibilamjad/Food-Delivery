const express = require("express");
const router = express.Router();

const {
  getRestaurantList,
  addNewRestaurants,
  updateRestaurants,
  deleteRestaurants,
  getRestaurantMenus,
  getRestaurantId,
  getRestaurantAvailable,
  getRestaurantMenusAdmin,
  getRestaurantMenucreation,
} = require("../controller/restaurantController");
const { checkAuth } = require("../middleware/checkAuth ");

router.get("/", getRestaurantList);
router.get("/menu", getRestaurantMenucreation);
router.get("/available", getRestaurantAvailable);
router.get("/edit/:restaurantId", getRestaurantId);
router.get("/:restaurantId", getRestaurantMenus);
router.get("/admin/:restaurantId", getRestaurantMenusAdmin);
router.post("/createRestaurant", addNewRestaurants);
router.put("/update/:restaurantId", updateRestaurants);
router.delete("/deleteRestaurant", checkAuth, deleteRestaurants);

module.exports = router;
