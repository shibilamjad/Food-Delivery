import axios from "axios";
const API_URL = "https://food-delivery-4.onrender.com/api";

export const apiCityCreate = async (data) => {
  try {
    const requestData = {
      cityName: data.cityName,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    const res = await axios.post(`${API_URL}/city/create`, requestData);

    return res.data;
  } catch (error) {
    throw new Error(`City creation failed`);
  }
};

export const apiCity = async () => {
  try {
    const res = await axios(`${API_URL}/city`);

    return res.data;
  } catch (error) {
    throw new Error(`City creation failed`);
  }
};
