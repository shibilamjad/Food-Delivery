import axios from "axios";
import { axiosInstance } from "../utils/interceptors";
const API_URL = "http://localhost:3006/api/delivery";

export async function deliveryBoyLoginApi({ mobile, password }) {
  try {
    const res = await axios(`${API_URL}/signIn`, {
      method: "POST",
      withCredentials: true,
      data: {
        mobile,
        password,
      },
    });

    localStorage.setItem("token", res.data.accessToken);

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching login: ${error.message}`);
  }
}
export async function createDeliveryBoy({ mobile, password, name }) {
  try {
    const res = await axiosInstance("/signUp", {
      method: "POST",
      withCredentials: true,
      data: {
        mobile,
        password,
        name,
      },
    });
    localStorage.setItem("token", res.data.accessToken);
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching createUser: ${error.message}`);
  }
}

export async function deliveryBoyLogoutApi() {
  try {
    const res = await axios.post(`${API_URL}/logout`);

    localStorage.clear();

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching logout: ${error.message}`);
  }
}
