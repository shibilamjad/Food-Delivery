import axios from "axios";
import { useNavigate } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3006/api/users",
});

// 401 UnAuthorised

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const navigate = useNavigate();
    if (error?.response?.status === 401) {
      const response = await axiosInstance("/refresh-Token");
      localStorage.setItem("token", response.data.refreshToken);
      // navigate("/sign-in");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Attach Cookie on every request

axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.withCredentials = true;
      request.headers.Authorization = token;
    }
    return request;
  },
  (error) => error
);
