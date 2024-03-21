import axios from "axios";

const API_URL = "https://food-delivery-4.onrender.com/api/delivery";

export async function getDeliveryBoysApi() {
  try {
    const res = await axios(`${API_URL}/details/admin`);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
