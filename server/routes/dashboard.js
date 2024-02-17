const router = require("express").Router();
const { totolOrders } = require("../controller/dashboardController");

// get all menu with genre *(all)
router.get("/", totolOrders);

module.exports = router;
