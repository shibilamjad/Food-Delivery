const express = require("express");
const router = express.Router();
const {
  userList,
  userCartList,
  register,
  addUserCart,
  deleateCart,
  login,
  clearCart,
  logout,
  refreshToken,
  adminRegister,
  adminLogin,
  cartQuantity,
} = require("../controller/userController");

const { checkAuth } = require("../middleware/checkAuth ");

// users list
router.get("/", userList);

// User create
router.post("/signup", register);

// user login
router.post("/login", login);

// User create
router.post("/adminSignup", adminRegister);

// user admin login
router.post("/adminLogin", adminLogin);

// user logout
router.post("/logout", logout);

// fetch user cart
router.get("/cart", checkAuth, userCartList);

// user add cart  (client)
router.put("/addCart", checkAuth, addUserCart);

// user addQuantity cart  (client)
router.put("/:menuItemId/quantity", cartQuantity);

// user delete cart  (client)
router.delete("/deleteCart", checkAuth, deleateCart);

// user clear  cart menu (client)
router.delete("/clearCart", checkAuth, clearCart);

// user refreshToken
router.get("/refreshToken", refreshToken);

module.exports = router;
