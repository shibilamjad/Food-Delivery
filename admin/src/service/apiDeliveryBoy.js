import axios from "axios";

const API_URL = "http://localhost:3006/api/delivery";

export async function getDeliveryBoysApi() {
  try {
    const res = await axios(`${API_URL}/details/admin`);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
