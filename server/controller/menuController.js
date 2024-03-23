const upload = require("../middleware/multer");
const cloudinaryImg = require("../config/cloudinery");
const Menu = require("../models/menuModel");
const Users = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const Admin = require("../models/adminModel");
const Orders = require("../models/orderModel");
const util = require("util");

const menu = async (req, res) => {
  try {
    const menuList = await Menu.find()
      .select("name unitPrice imageUrl ingredients isAvailable discount")
      .populate("restaurant", "restaurant address lat long ");
    res.status(200).json(menuList);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching Menu: ${error.message}`,
    });
  }
};
const menuEdit = async (req, res) => {
  const { menuId } = req.params;

  try {
    const menuList = await Menu.findById(menuId).select(
      "name unitPrice  ingredients isAvailable discount"
    );

    if (!menuList) {
      return res.status(404).json({
        message: "menuId not found",
      });
    }
    res.status(200).json(menuList);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching MenuId: ${error.message}`,
    });
  }
};
const addMenu = async (req, res) => {
  try {
    const uploadAsync = util.promisify(upload.single("imageUrl"));
    await uploadAsync(req, res);

    const cloudinaryResult = await cloudinaryImg.uploader.upload(req.file.path);
    const { secure_url: imageUrl } = cloudinaryResult;

    const { name, unitPrice, ingredients, isAvailable, discount, restaurant } =
      req.body;

    const foundRestaurant = await Restaurant.findOne({
      _id: restaurant,
    });

    if (!foundRestaurant) {
      return res.status(404).json({
        message: `Restaurant '${restaurant}' not found`,
      });
    }
    const newMenu = await Menu.create({
      name,
      unitPrice,
      discount,
      ingredients,
      isAvailable,
      imageUrl,
      restaurant: foundRestaurant._id,
    });

    const updateRestaurant = await Restaurant.findByIdAndUpdate(
      restaurant,
      {
        $push: { menu: newMenu._id },
      },
      {
        new: true,
      }
    );
    if (!updateRestaurant) {
      return res.status(404).json({
        message: `Restaurant '${restaurant}' not found or could not be updated`,
      });
    }
    return res.status(200).json(newMenu);
  } catch (error) {
    console.error("Error adding Menu:", error);
    res.status(500).json({
      message: `Error adding Menu: ${error.message || "Unknown error"}`,
    });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const uploadAsync = util.promisify(upload.single("imageUrl"));
    await uploadAsync(req, res);

    let imageUrl;

    if (req.file) {
      const cloudinaryResult = await cloudinaryImg.uploader.upload(
        req.file.path
      );
      imageUrl = cloudinaryResult.secure_url;
    }

    const { name, unitPrice, ingredients, isAvailable, discount } = req.body;

    let updateObject = {
      name,
      unitPrice,
      ingredients,
      isAvailable,
      discount,
    };

    if (imageUrl) {
      updateObject.imageUrl = imageUrl;
    }

    const updateMenu = await Menu.findByIdAndUpdate(menuId, updateObject, {
      new: true,
    });

    if (!updateMenu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    }

    return res.status(200).json(updateMenu);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({
      message: `Error updating movie: ${error.message || "Unknown error"}`,
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { _id, userId } = req.body;
    const isAdmin = await Admin.findById(userId);

    if (isAdmin && isAdmin.email === "test@gmail.com") {
      return res.status(404).json({
        message: "Test account can not deleted",
      });
    }
    if (!_id) {
      return res.status(400).json({
        message: "Missing menu ID",
      });
    }

    const deleteMenus = await Menu.findByIdAndDelete(_id);

    if (!deleteMenus) {
      return res.status(404).json({
        message: "menu not found",
      });
    }
    // Remove references
    await Users.updateMany(
      { $or: [{ "cart.menuItem": _id }, { orderHistory: _id }] },
      { $pull: { cart: { menuItem: _id }, orderHistory: _id } }
    ); // Also remove references from orderHistory array

    await Users.updateMany(
      { orderHistory: _id },
      { $pull: { orderHistory: _id } }
    ); // Remove references from orders
    await Orders.updateMany(
      { "cart.menuItem": _id },
      { $pull: { cart: { menuItem: _id } } }
    );

    res.status(200).json(deleteMenus);
  } catch (error) {
    res.status(500).json({
      message: `Error deleting movie: ${error.message}`,
    });
  }
};

module.exports = {
  menu,
  addMenu,
  updateMenu,
  deleteMenu,
  menuEdit,
};
