const router = require("express").Router();
const { deliveyBoyRegister } = require("../controller/deliveryBoysController");

router.post("/signUp", deliveyBoyRegister);

module.exports = router;
