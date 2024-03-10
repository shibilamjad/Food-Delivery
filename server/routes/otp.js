const router = require("express").Router();
const { registerUser, verifyOtp } = require("../controller/otpController");

// get all menu with genre *(all)
router.post("/userCreate", registerUser);
router.post("/verify", verifyOtp);

module.exports = router;
