import axios from "axios";
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
