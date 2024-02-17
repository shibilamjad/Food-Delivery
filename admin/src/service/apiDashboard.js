import axios from "axios";
const API_URL = "http://localhost:3006/api/dashboard";

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
