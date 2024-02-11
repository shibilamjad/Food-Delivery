const router = require("express").Router();
const multer = require("multer");
const {
  menu,
  addMenu,
  updateMenu,
  deleteMenu,
} = require("../controller/menuController");

const upload = multer({ dest: "uploads/" });

// get all menu with genre *(all)
router.get("/", menu);

// menu create (dashboard)
router.post("/add-menu", addMenu);

// movie create (dashboard)
router.put("/updateMenu/:menuId", updateMenu);

router.delete("/", deleteMenu);

module.exports = router;
