import axios from "axios";
const API_URL = "https://food-delivery-4.onrender.com/api/dashboard";

export async function getTotalSats() {
  try {
    const res = await axios(API_URL);
    const { data } = res;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("order could not be retrieved");
  }
}
