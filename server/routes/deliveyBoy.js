const router = require("express").Router();
const { deliveyBoyRegister } = require("../controller/deliveryBoysController");

router.post("/", deliveyBoyRegister);

module.exports = router;
