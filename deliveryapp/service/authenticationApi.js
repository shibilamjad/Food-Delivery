import axios from "axios";
const API_URL = "http://localhost:3006/api/delivery";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function deliveryLoginApi({ name, mobile, password }) {
  try {
    const res = await axios(`${API_URL}/signUp`, {
      method: "POST",
      withCredentials: true,
      data: {
        name,
        mobile,
        password,
      },
    });

    // Store access token and reference token in AsyncStorage
    await AsyncStorage.setItem("accessToken", res.data.accessToken);
    await AsyncStorage.setItem("refreshToken", res.data.refreshToken);

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching register: ${error.message}`);
  }
}
