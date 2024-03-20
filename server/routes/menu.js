const router = require("express").Router();
const multer = require("multer");
const {
  menu,
  menuEdit,
  addMenu,
  updateMenu,
  deleteMenu,
} = require("../controller/menuController");
const { checkAuth } = require("../middleware/checkAuth ");

const upload = multer({ dest: "uploads/" });

// get all menu with genre *(all)
router.get("/", menu);
router.get("/:menuId", menuEdit);

// menu create (dashboard)
router.post("/add-menu", addMenu);

// movie create (dashboard)
router.put("/updateMenu/:menuId", updateMenu);

router.delete("/", checkAuth, deleteMenu);

module.exports = router;
