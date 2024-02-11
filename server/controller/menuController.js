const upload = require("../middleware/multer");
const cloudinaryImg = require("../config/cloudinery");
const Menu = require("../models/menuModel");
const util = require("util");

const menu = async (req, res) => {
  try {
    const menuList = await Menu.find().select(
      "name unitPrice imageUrl ingredients isAvailable discount"
    );
    res.status(200).json(menuList);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching movies: ${error.message}`,
    });
  }
};

const addMenu = async (req, res) => {
  try {
    const uploadAsync = util.promisify(upload.single("imageUrl"));
    await uploadAsync(req, res);

    const cloudinaryResult = await cloudinaryImg.uploader.upload(req.file.path);
    const { secure_url: imageUrl } = cloudinaryResult;

    const { name, unitPrice, ingredients, isAvailable, discount } = req.body;

    const isExistMovie = await Menu.findOne({ name });

    if (isExistMovie) {
      return res.status(400).json({
        message: `${name} already created`,
      });
    }

    const newMenu = await Menu.create({
      name,
      unitPrice,
      discount,
      ingredients,
      isAvailable,
      imageUrl,
    });

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
      // const { secure_url: image } = cloudinaryResult;
      imageUrl = cloudinaryResult.secure_url;
    }

    const { name, unitPrice, ingredients, isAvailable, discount } = req.body;

    let updateObject = { name, unitPrice, ingredients, isAvailable, discount };

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
    // Log the error using a logging library in a production environment
    res.status(500).json({
      message: `Error updating movie: ${error.message || "Unknown error"}`,
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Missing menu ID",
      });
    }

    const deleteMenus = await Menu.findByIdAndDelete(_id);

    if (deleteMenus) {
      res.status(200).json(deleteMenus);
    } else {
      res.status(404).json({
        message: "Movie not found",
      });
    }
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
};
