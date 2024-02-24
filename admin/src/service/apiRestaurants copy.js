import axios from "axios";

const API_URL = "http://localhost:3006/api/restaurants";

export async function getRestaurants() {
  try {
    const res = await axios(API_URL);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("restaurants could not be retrieved");
  }
}

export async function getRestaurantsMenu(restaurantId) {
  try {
    const res = await axios(`${API_URL}/${restaurantId}`);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("restaurants could not be retrieved");
  }
}

export async function createRestaurants(newData) {
  try {
    const requestData = {
      restaurant: newData.restaurant,
      lat: newData.lat,
      long: newData.long,
      address: newData.address,
    };
    const res = await axios.post(`${API_URL}/createRestaurant`, requestData);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create restaurant");
  }
}
