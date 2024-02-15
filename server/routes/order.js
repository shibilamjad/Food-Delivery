const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middleware/checkAuth ");
const {
  userOrderList,
  createOrder,
  userOrderConfirm,
  userOrderDetails,
  ordersAdmin,
  ordersDetailsAdmin,
} = require("../controller/orderController");

router.get("/lists", ordersAdmin);
router.get("/details/:orderId", ordersDetailsAdmin);
router.get("/order-new:orderId", checkAuth, userOrderConfirm); // not
router.get("/orderdetails/:orderId", userOrderDetails);
router.get("/", checkAuth, userOrderList);
router.post("/create", checkAuth, createOrder);

module.exports = router;
