const City = require("../models/CityListModel");

const createCity = async (req, res) => {
  try {
    const { cityName, latitude, longitude } = req.body;
    const cityExist = await City.findOne({ cityName });
    if (cityExist) {
      return res.status(400).json({
        message: `${cityName} already exist`,
      });
    }
    const newCity = await City.create({
      cityName,
      latitude,
      longitude,
    });
    return res.status(200).json(newCity);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getCity = async (req, res) => {
  try {
    const cityList = await City.find().select("cityName latitude longitude");
    return res.status(200).json(cityList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = { createCity, getCity };
