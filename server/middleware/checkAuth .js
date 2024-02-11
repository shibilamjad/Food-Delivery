const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.accesstoken;
    if (!token) {
      res.status(401).json({
        message: "Access Denied!",
      });
    }
    const validToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.body.userId = validToken._id;
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = { checkAuth };
