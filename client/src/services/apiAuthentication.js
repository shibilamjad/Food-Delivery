import { axiosInstance } from '../utils/interceptors';
import axios from 'axios';

export async function login({ mobile, password }) {
  try {
    const res = await axiosInstance('/login', {
      method: 'POST',
      withCredentials: true,
      data: {
        mobile,
        password,
      },
    });

    localStorage.setItem('token', res.data.accessToken);

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching login: ${error.message}`);
  }
}
export async function logout() {
  try {
    const res = await axiosInstance.post('/logout');

    localStorage.clear();

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching logout: ${error.message}`);
  }
}

export async function createUserApi({ mobile, password, userName }) {
  try {
    const res = await axiosInstance('/signup', {
      method: 'POST',
      withCredentials: true,
      data: {
        mobile,
        password,
        userName,
      },
    });
    localStorage.setItem('token', res.data.accessToken);
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching createUser: ${error.message}`);
  }
}

export async function logoutApi() {
  try {
    const res = await axios.post(
      `https://food-delivery-4.onrender.com/api/users/logout`,
    );

    localStorage.clear();

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching logout: ${error.message}`);
  }
}

export async function forgetPasswordApi({ mobile, password }) {
  try {
    const data = {
      mobile,
      password,
    };
    const res = await axios.put(
      `https://food-delivery-4.onrender.com/api/users/forget`,
      data,
    );
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching logout: ${error.message}`);
  }
}
