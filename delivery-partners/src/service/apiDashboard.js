import axios from "axios";
const API_URL = "http://localhost:3006/api/dashboard";

export async function getTotalOrderDeliveryBoy() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios(`${API_URL}/totalorders`, {
      headers: {
        token: token,
      },
    });
    const { data } = res;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("order could not be retrieved");
  }
}
