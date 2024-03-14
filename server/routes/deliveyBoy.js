const router = require("express").Router();
const {
  deliveyBoyRegister,
  getDeliveryBoyOrder,
  takeOrderDeliveryBoy,
  orderdetailsDeliveryBoy,
  completedOrdersDetails,
  loginDeliveryboy,
  logout,
  deliveyBoyDetailsAdmin,
} = require("../controller/deliveryBoysController");

router.get("/", getDeliveryBoyOrder);
router.get("/complete", completedOrdersDetails);
router.get("/details/admin", deliveyBoyDetailsAdmin);
router.get("/details/order", orderdetailsDeliveryBoy);

router.post("/signUp", deliveyBoyRegister);
router.post("/signIn", loginDeliveryboy);
router.post("/logout", logout);
router.post("/takeorder", takeOrderDeliveryBoy);

module.exports = router;
