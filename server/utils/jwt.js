const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1y",
  });
};
const generateRefreshToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });
};

const verifyRefreshToken = (refreshToken) => {
  if (!refreshToken) return false;

  const tokenValid = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!tokenValid) return false;
  return tokenValid._id;
};
const generateTokensAndSetCookies = (res, userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    // sameSite: "strict",
  });

  return accessToken;
};
const extractDeliveryBoyId = (token) => {
  try {
    // Decode the token
    const decodedToken = jwt.decode(token);

    // Extract the deliveryBoyId
    const deliveryBoyId = decodedToken._id;

    return deliveryBoyId;
  } catch (error) {
    console.error("Error extracting deliveryBoyId:", error);
    return null;
  }
};
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateTokensAndSetCookies,
  extractDeliveryBoyId,
};
