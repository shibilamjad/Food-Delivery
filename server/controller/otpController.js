const twilio = require("twilio");
const OTP = require("../models/otpModel");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { generatePasswordHash } = require("../utils/bcrypt ");
const Users = require("../models/userModel");

const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;
const verifySid = "VAae751628b10d7dd051a6b791d27346e2";
const twilioClient = twilio(accountSid, authToken);

const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "da6e98ee",
  apiSecret: "3rVvfvZtqJbPSb97",
});

const saveOTPToDatabase = async (mobile, otp, expiresInMinutes) => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

  const newOTP = new OTP({
    mobile,
    otp,
    expiresAt,
  });

  await newOTP.save();
};

const registerUser = async (req, res) => {
  try {
    const { userName, mobile, password } = req.body;

    const isExistMobile = await Users.findOne({ mobile });
    const isExistUserName = await Users.findOne({ userName });

    // Check if email already exists
    if (isExistMobile) {
      return res.status(409).json({
        message: `${mobile} already registered`,
      });
    }

    // Check if username already exists
    if (isExistUserName) {
      return res.status(400).json({
        message: `${userName} already registered`,
      });
    }

    // create user
    // const passwordHashed = await generatePasswordHash(password);
    // const createUser = await Users.create({
    //   userName,
    //   mobile,
    //   password: passwordHashed,
    // });

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    await saveOTPToDatabase(mobile, otp, 5);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    // Find OTP record by mobile number
    const otpRecord = await OTP.findOne({ mobile }).sort({ createdAt: -1 });

    // Check if OTP record exists and matches
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }
    await otpRecord.remove();
    const accessToken = generateAccessToken();
    // Return user data and access token
    res.json({
      success: true,
      message: "OTP verified successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

module.exports = { registerUser, verifyOtp };
// const from = "Vonage APIs";
// const to = "919947024292";
// const text = `Calicut cafeteria wait for you ,${otp} dont share otp you can get free shawaya`;
// // Send OTP via SMS
// await vonage.sms
//   .send({ to, from, text })
//   .then((resp) => {
//     console.log("Message sent successfully");
//     console.log(resp);
//   })
//   .catch((err) => {
//     console.log("There was an error sending the messages.");
//     console.error(err);
//   });
