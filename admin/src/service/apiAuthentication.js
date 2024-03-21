import axios from "axios";
const API_URL = "https://food-delivery-4.onrender.com/api/users";
// https://food-delivery-4.onrender.com/
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
