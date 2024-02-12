const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middleware/checkAuth ");
const {
  userOrderList,
  createOrder,
  userOrderConfirm,
} = require("../controller/orderController");

router.get("/:orderId", checkAuth, userOrderConfirm);
router.get("/", checkAuth, userOrderList);
router.post("/create", checkAuth, createOrder);

module.exports = router;
