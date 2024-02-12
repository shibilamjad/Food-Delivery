import axios from 'axios';

const API_URL = 'http://localhost:3006/api/users';

export async function cartListApi() {
  const userId = localStorage.getItem('token');
  try {
    const res = await axios(`${API_URL}/cart`, {
      headers: {
        accesstoken: userId,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching createUser: ${error.message}`);
  }
}

export async function addCartApi(menuId) {
  const userId = localStorage.getItem('token');
  try {
    const res = await axios.put(
      `${API_URL}/addCart`,
      { menuId },
      {
        headers: {
          accesstoken: userId,
        },
      },
    );

    return res.data; // or any data you want to return on success
  } catch (error) {
    throw new Error(`Error fetching addMenuList: ${error.message}`);
  }
}
export async function deleateCartApi(menuId) {
  const userId = localStorage.getItem('token');
  try {
    const res = await axios.delete(
      `${API_URL}/deleteCart`,

      {
        data: { menuId },
        headers: {
          accesstoken: userId,
        },
      },
    );

    return res.data;
  } catch (error) {
    throw new Error(`Error deleting menu: ${error.message}`);
  }
}
export async function clearCartApi(menuId) {
  const userId = localStorage.getItem('token');
  try {
    const res = await axios.delete(
      `${API_URL}/clearCart`,

      {
        headers: {
          accesstoken: userId,
        },
      },
    );

    return res.data;
  } catch (error) {
    throw new Error(`Error deleting menu: ${error.message}`);
  }
}
