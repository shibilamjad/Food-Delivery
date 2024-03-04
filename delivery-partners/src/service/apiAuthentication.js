import axios from "axios";
import { axiosInstance } from "../utils/interceptors";
const API_URL = "http://localhost:3006/api/users";

export async function adminLoginApi({ email, password }) {
  try {
    const res = await axios(`${API_URL}/adminLogin`, {
      method: "POST",
      withCredentials: true,
      data: {
        email,
        password,
      },
    });

    localStorage.setItem("token", res.data.accessToken);

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching login: ${error.message}`);
  }
}
export async function adminLogoutApi() {
  try {
    const res = await axios.post(`${API_URL}/logout`);

    localStorage.clear();

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching logout: ${error.message}`);
  }
}
export async function getUsers() {
  try {
    const res = await axios(API_URL);

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}
export async function createDeliveryBoy({
  mobile,
  password,
  name,
  latitude,
  longitude,
}) {
  try {
    const res = await axiosInstance("/signup", {
      method: "POST",
      withCredentials: true,
      data: {
        mobile,
        password,
        name,
        location: { coordinates: [latitude, longitude] },
      },
    });
    localStorage.setItem("token", res.data.accessToken);
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching createUser: ${error.message}`);
  }
}
