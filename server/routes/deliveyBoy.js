const router = require("express").Router();
const {
  deliveyBoyRegister,
  getDeliveryBoyOrder,
  takeOrderDeliveryBoy,
  orderdetailsDeliveryBoy,
  completedOrdersDetails,
  loginDeliveryboy,
  logout,
} = require("../controller/deliveryBoysController");

router.post("/signUp", deliveyBoyRegister);
router.post("/signIn", loginDeliveryboy);
router.post("/logout", logout);
router.get("/", getDeliveryBoyOrder);
router.post("/takeorder", takeOrderDeliveryBoy);
router.get("/details/order", orderdetailsDeliveryBoy);
router.get("/complete", completedOrdersDetails);

module.exports = router;
