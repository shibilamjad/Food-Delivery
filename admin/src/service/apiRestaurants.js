import axios from "axios";
import { PAGE_SIZE } from "../utils/PAGE_SIZE";

const API_URL = "http://localhost:3006/api/restaurants";

export async function getRestaurants({ search, limit = PAGE_SIZE, page = 1 }) {
  try {
    const res = await axios(API_URL, {
      params: { search, page, limit },
    });
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("restaurants could not be retrieved");
  }
}

export async function getRestaurantsMenuCreation() {
  try {
    const res = await axios(`${API_URL}/menu`);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("restaurants could not be retrieved");
  }
}

export async function getRestaurantId(restaurantId) {
  try {
    const res = await axios(`${API_URL}/edit/${restaurantId}`);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);

    throw new Error("restaurants could not be retrieved");
  }
}

export async function getRestaurantsMenu(restaurantId) {
  try {
    const res = await axios(`${API_URL}/admin/${restaurantId}`);
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

export async function createRestaurantsApi(data) {
  try {
    const formData = new FormData();
    formData.append("restaurant", data.restaurant);
    formData.append("image", data.image[0]);
    formData.append("address", data.address);
    formData.append("location", data.location);
    formData.append("openTime", data.openTime);
    formData.append("closeTime", data.closeTime);
    formData.append("lat", data.lat);
    formData.append("long", data.long);
    const res = await axios.post(`${API_URL}/createRestaurant`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error uploading Menu:", error.message);
    throw new Error(`restaurants could not be created: ${error.message}`);
  }
}
export async function updateRestaurantsApi(data, restaurantId) {
  try {
    const formData = new FormData();
    formData.append("restaurant", data.restaurant);
    formData.append("image", data.image[0]);
    formData.append("address", data.address);
    formData.append("location", data.location);
    formData.append("openTime", data.openTime);
    formData.append("closeTime", data.closeTime);
    formData.append("lat", data.lat);
    formData.append("long", data.long);
    const res = await axios.put(`${API_URL}/update/${restaurantId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading Restaurant:", error.message);
    throw new Error(`Restaurant could not be created: ${error.message}`);
  }
}

export async function deleteRestaurantApi(_id) {
  try {
    const res = await axios(`${API_URL}/deleteRestaurant`, {
      method: "DELETE",
      data: {
        _id,
      },
    });
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("restaurants cloud not be deleted");
  }
}
