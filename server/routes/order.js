const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middleware/checkAuth ");
const {
  userOrderList,
  createOrder,
  userOrderConfirm,
  userOrderDetails,
} = require("../controller/orderController");

router.get("/order-new:orderId", checkAuth, userOrderConfirm);
router.get("/orderdetails/:orderId", userOrderDetails);
router.get("/", checkAuth, userOrderList);
router.post("/create", checkAuth, createOrder);

module.exports = router;
