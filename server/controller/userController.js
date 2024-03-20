const Users = require("../models/userModel");
const Admin = require("../models/adminModel");

const {
  generatePasswordHash,
  checkePasswordHash,
} = require("../utils/bcrypt ");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateResetToken,
} = require("../utils/jwt");

const updateUserLocation = async (userId, latitude, longitude) => {
  try {
    // Update User location in the database
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        $set: {
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return console.log("user  not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user location:", error);
  }
};

const userList = async (req, res) => {
  try {
    const usersList = await Users.find().select("createdAt ");

    res.status(200).json(usersList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
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
    const passwordHashed = await generatePasswordHash(password);
    const createUser = await Users.create({
      userName,
      mobile,
      password: passwordHashed,
    });

    // Generate tokens for the newly registered user
    const accessToken = generateAccessToken(createUser._id);
    const refreshToken = generateRefreshToken(createUser._id);

    // Set refreshToken as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    if (createUser) {
      return res.json({
        _id: createUser._id,
        mobile: createUser.mobile,
        userName: createUser.userName,
        accessToken,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const forgetPassword = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await Users.findOne({ mobile });
    if (!user) {
      return res.status(400).json({
        message: "Mobile not registed",
      });
    }
    const passwordHashed = await generatePasswordHash(password);
    user.password = passwordHashed;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await Users.findOne({ mobile });

    if (!user) {
      return res.status(401).json({
        message: "User is not valid",
      });
    }
    const validPassword = await checkePasswordHash(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Username/Password is not valid",
      });
    }
    // generates access token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.json({
      _id: user._id,
      mobile: user.mobile,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const userDetailsInOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await Users.findById(userId).select("userName mobile");

    if (!user) {
      return res.status(401).json({
        message: "User is not valid",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const refreshToken = async (req, res) => {
  const userId = verifyRefreshToken(req.cookies.refreshToken);

  if (!userId) {
    return res.status(401).json({
      message: "Refresh token is expired",
    });
  }
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });
  res.json({ accessToken });
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.json({
      message: "Logged out  ",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// admin login

const adminRegister = async (req, res) => {
  try {
    const { password, email } = req.body;

    const isExistEmail = await Admin.findOne({ email });

    // Check if email already exists
    if (isExistEmail) {
      return res.status(409).json({
        message: `${email} already created`,
      });
    }

    // create user
    const passwordHashed = await generatePasswordHash(password);
    const createUser = await Admin.create({
      email,
      password: passwordHashed,
    });

    // Generate tokens for the newly registered user
    const accessToken = generateAccessToken(createUser._id);

    if (createUser) {
      return res.json({
        _id: createUser._id,
        email: createUser.email,
        accessToken,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User is not valid",
      });
    }
    const validPassword = await checkePasswordHash(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Username/Password is not valid",
      });
    }
    // generates access token
    const accessToken = generateAccessToken(user._id);

    res.json({
      _id: user._id,
      email: user.email,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  userList,
  register,
  userDetailsInOrder,
  login,
  logout,
  refreshToken,
  adminRegister,
  adminLogin,
  updateUserLocation,
  forgetPassword,
};
