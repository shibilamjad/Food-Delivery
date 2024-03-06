const router = require("express").Router();
const {
  deliveyBoyRegister,
  getDeliveryBoyOrder,
  takeOrderDeliveryBoy,
} = require("../controller/deliveryBoysController");

router.post("/signUp", deliveyBoyRegister);
router.get("/", getDeliveryBoyOrder);
router.post("/takeorder", takeOrderDeliveryBoy);

module.exports = router;
