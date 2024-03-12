const router = require("express").Router();
const {
  deliveyBoyRegister,
  getDeliveryBoyOrder,
  takeOrderDeliveryBoy,
  orderdetailsDeliveryBoy,
  completedOrdersDetails,
} = require("../controller/deliveryBoysController");

router.post("/signUp", deliveyBoyRegister);
router.get("/", getDeliveryBoyOrder);
router.post("/takeorder", takeOrderDeliveryBoy);
router.get("/details/order", orderdetailsDeliveryBoy);
router.get("/complete", completedOrdersDetails);

module.exports = router;
