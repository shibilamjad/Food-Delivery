const router = require("express").Router();
const { createCity, getCity } = require("../controller/CityController");

router.get("/", getCity);
router.post("/create", createCity);

module.exports = router;
