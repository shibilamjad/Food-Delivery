const OTP = require("../models/otpModel");
const DeliveryBoy = require("../models/deliveyBoyModel");
const Users = require("../models/userModel");
const { Vonage } = require("@vonage/server-sdk");
const Order = require("../models/orderModel");
const { extractDeliveryBoyId } = require("../utils/jwt");

const vonage = new Vonage({
  apiKey: process.env.API_KEY_VONTAGE,
  apiSecret: process.env.API_SECRUTKEY_VONTAGE,
});

const saveOTPToDatabase = async (mobile, otp) => {
  const newOTP = new OTP({
    mobile,
    otp,
  });

  await newOTP.save();
};

const sendOtpConfirmation = async (req, res) => {
  try {
    const { mobile } = req.body;

    const isExistMobile = await Users.findOne({ mobile });

    if (!isExistMobile) {
      return res.status(400).json({
        message: "Mobile number not found",
      });
    }
    // Check if email already exists

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    await saveOTPToDatabase(mobile, otp);

    const from = "Vonage APIs";
    const text = `Order confirmation otp is,${otp}.Thanks for order restaurant name,enjoy your order`;

    // Send OTP confirmation SMS to the provided mobile number
    await vonage.sms.send({ to: mobile, from, text });

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp, token, orderId } = req.body;
    const deliveryBoyId = extractDeliveryBoyId(token);

    const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);

    if (!deliveryBoy) {
      return res.status(404).json({
        message: "Delivery boy not found",
      });
    }

    const index = deliveryBoy.inprogress.indexOf(orderId);
    if (index === -1) {
      return res.status(404).json({
        message: "Order not found in the delivery boy's inprogress list",
      });
    }

    // Find OTP record by mobile number
    const otpRecord = await OTP.findOne({ mobile, otp });

    // Check if OTP record exists
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (otpRecord.otp.trim() !== otp.trim()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP verification successful, update order status and delivery boy's records
    deliveryBoy.ordersCompleted.push(orderId);
    deliveryBoy.inprogress.splice(index, 1);
    await Promise.all([
      deliveryBoy.save(),
      Order.findByIdAndUpdate(orderId, { delivery: "success" }),
      OTP.deleteOne({ _id: otpRecord._id }),
    ]);

    // Return success response
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

module.exports = { sendOtpConfirmation, verifyOtp };
