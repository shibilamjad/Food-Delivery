const router = require("express").Router();
const { reviewCreation } = require("../controller/reviewController");
const { checkAuth } = require("../middleware/checkAuth ");

router.post("/create", reviewCreation);

module.exports = router;
