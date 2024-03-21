import axios from 'axios';

const API_URL = 'https://food-delivery-4.onrender.com/api/users';

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
export async function addCartApi({ menuId, restaurantId }) {
  const userId = localStorage.getItem('token');
  try {
    const res = await axios.put(
      `${API_URL}/addCart`,
      { menuId, restaurantId },
      {
        headers: {
          accesstoken: userId,
        },
      },
    );

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching addMenuList: ${error.message}`);
  }
}

export async function updateQuantity(menuItemId, action) {
  const userId = localStorage.getItem('token');

  try {
    const response = await axios.put(
      `${API_URL}/${menuItemId}/quantity`,
      {
        action: action,
      },
      {
        headers: {
          accesstoken: userId,
        },
      },
    );
    return response.data.menuItem;
  } catch (error) {
    console.error('Error updating quantity:', error);
    throw new Error('Error updating quantity');
  }
}

export async function deleateCartApi(cartItemId) {
  const userId = localStorage.getItem('token');
  try {
    const res = await axios.delete(
      `${API_URL}/deleteCart`,

      {
        data: { cartItemId },
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
export async function clearCartApi() {
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
