const router = require("express").Router();
const {
  sendOtpConfirmation,
  verifyOtp,
} = require("../controller/otpController");
const { checkAuth } = require("../middleware/checkAuth ");
router.post("/orderConfirmation", sendOtpConfirmation);
router.post("/verify", verifyOtp);

module.exports = router;
