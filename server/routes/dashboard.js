const router = require("express").Router();
const {
  totolOrdersAdmin,
  completedOrdersDeliveryBoy,
} = require("../controller/dashboardController");

router.get("/", totolOrdersAdmin);
router.get("/totalorders", completedOrdersDeliveryBoy);

module.exports = router;
