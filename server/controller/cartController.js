const Users = require("../models/userModel");

const userCartList = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await Users.findById(userId)
      .populate({
        path: "cart.menuItem",
        model: "Menu",
        select:
          "name unitPrice ingredients imageUrl discount quantity totalPrice",
      })
      .populate({
        path: "cart.restaurant",
        model: "Restaurant",
        select: "restaurant lat long",
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
    const { menuId, userId, restaurantId } = req.body;

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
      { $addToSet: { cart: { menuItem: menuId, restaurant: restaurantId } } }
    );

    res.status(200).json({
      success: true,
      message: `${menuId} and ${restaurantId}  successfully added`,
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

module.exports = {
  clearCart,
  userCartList,
  addUserCart,
  cartQuantity,
  deleateCart,
};
