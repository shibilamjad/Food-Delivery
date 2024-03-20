const express = require("express");
const router = express.Router();
const {
  userList,
  register,
  login,
  logout,
  refreshToken,
  adminRegister,
  adminLogin,
  userDetailsInOrder,
  forgetPassword,
} = require("../controller/userController");
const {
  clearCart,
  userCartList,
  addUserCart,
  cartQuantity,
  deleateCart,
} = require("../controller/cartController");
const { checkAuth } = require("../middleware/checkAuth ");

// users list
router.get("/", userList);

router.get("/orderUser", checkAuth, userDetailsInOrder);
// User create
router.post("/signup", register);

router.put("/forget", forgetPassword);

// user login
router.post("/login", login);

// user logout
router.post("/logout", logout);

// fetch user cart
router.get("/cart", checkAuth, userCartList);

// user add cart  (client)
router.put("/addCart", checkAuth, addUserCart);

// user addQuantity cart  (client)
router.put("/:menuItemId/quantity", checkAuth, cartQuantity);

// user delete cart  (client)
router.delete("/deleteCart", checkAuth, deleateCart);

// user clear  cart menu (client)
router.delete("/clearCart", checkAuth, clearCart);

// user refreshToken
router.get("/refreshToken", refreshToken);

// user admin login
router.post("/adminSignup", adminRegister);
router.post("/adminLogin", adminLogin);

module.exports = router;
