const Users = require("../models/userModel");
const Admin = require("../models/adminModel");
const Menus = require("../models/menuModel");
const {
  generatePasswordHash,
  checkePasswordHash,
} = require("../utils/bcrypt ");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const { use } = require("../routes/user");

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
    const { userName, password, email } = req.body;

    const isExistEmail = await Users.findOne({ email });
    const isExistUserName = await Users.findOne({ userName });

    // Check if email already exists
    if (isExistEmail) {
      return res.status(409).json({
        message: `${email} already created`,
      });
    }

    // Check if username already exists
    if (isExistUserName) {
      return res.status(400).json({
        message: `${userName} already created`,
      });
    }

    // create user
    const passwordHashed = await generatePasswordHash(password);
    const createUser = await Users.create({
      userName,
      email,
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
        email: createUser.email,
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

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
      email: user.email,
      userName: user.userName,
      accessToken,
    });
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

const userCartList = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await Users.findById(userId).populate({
      path: "cart.menuItem",
      model: "Menu",
      select: "name unitPrice ingredients discount quantity totalPrice",
    });
    // Calculate totalPrice for each cart item
    user.cart.forEach((cartItem) => {
      cartItem.totalPrice =
        (cartItem.menuItem.unitPrice - cartItem.menuItem.discount) *
        cartItem.quantity;
    });

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addUserCart = async (req, res) => {
  try {
    const { menuId, userId } = req.body;

    // Check if the user exists
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the menuId already exists in the user's cart
    const existingCartItem = user.cart.find(
      (item) => String(item.menuItem) === menuId
    );
    if (existingCartItem) {
      return res.status(400).json({
        success: false,
        message: "Menu already selected",
      });
    }

    // Add menuId to the user's cart if it doesn't already exist
    await Users.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { cart: { menuItem: menuId } } }
    );

    res.status(200).json({
      success: true,
      message: `${menuId} successfully added`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const cartQuantity = async (req, res) => {
  const { menuItemId } = req.params;
  const { action, userId } = req.body;

  try {
    // Find the user
    const user = await Users.findById(userId).populate({
      path: "cart",
      model: "Menu",
      select: "quantity totalPrice unitPrice discount",
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the cart item by its ID
    const cartItem = user.cart.find((item) => String(item._id) === menuItemId);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found in user's cart",
      });
    }

    // Increment or decrement quantity based on the action
    if (action === "increment") {
      cartItem.quantity += 1;
    } else if (action === "decrement") {
      if (cartItem.quantity > 0) {
        cartItem.quantity -= 1;
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Quantity cannot be less than 0" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    // Calculate and update total price
    // cartItem.totalPrice =
    //   cartItem.quantity * (cartItem.unitPrice - cartItem.discount);

    // Save the updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      cartItem,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleateCart = async (req, res) => {
  try {
    const { cartItemId, userId } = req.body;

    // Find the user and update the menu array using $pull
    const user = await Users.findByIdAndUpdate(
      userId,
      { $pull: { cart: { _id: cartItemId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: `${cartItemId} removed from cart`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// clear cart

const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await Users.findByIdAndUpdate(
      userId,
      { cart: [] }, // Set cart array to empty
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// admin login

const adminRegister = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    const isExistEmail = await Admin.findOne({ email });
    const isExistUserName = await Admin.findOne({ userName });

    // Check if email already exists
    if (isExistEmail) {
      return res.status(409).json({
        message: `${email} already created`,
      });
    }

    // Check if username already exists
    if (isExistUserName) {
      return res.status(400).json({
        message: `${userName} already created`,
      });
    }

    // create user
    const passwordHashed = await generatePasswordHash(password);
    const createUser = await Admin.create({
      userName,
      email,
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
        email: createUser.email,
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
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.json({
      _id: user._id,
      email: user.email,
      userName: user.userName,
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
  userCartList,
  register,
  addUserCart,
  login,
  deleateCart,
  logout,
  refreshToken,
  adminRegister,
  adminLogin,
  clearCart,
  cartQuantity,
};
