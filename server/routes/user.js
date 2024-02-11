const express = require("express");
const router = express.Router();
const {
  userList,
  userCartList,
  register,
  addUserCart,
  deleateCart,
  login,

  logout,
  refreshToken,
  adminRegister,
  adminLogin,
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

// fetch user watchList movies
router.get("/cart", checkAuth, userCartList);

// user add watchleater movies (client)
router.put("/addCart", checkAuth, addUserCart);

// user delete watchleater movies (client)
router.delete("/deleteCart", checkAuth, deleateCart);

// user refreshToken
router.get("/refreshToken", refreshToken);

module.exports = router;
