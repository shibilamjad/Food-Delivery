import axios from 'axios';

const API_URL = 'http://localhost:3006/api/order';

export async function orderListApi() {
  const userId = localStorage.getItem('token');
  try {
    const res = await axios(API_URL, {
      headers: {
        accesstoken: userId,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching createUser: ${error.message}`);
  }
}

export async function orderStatusApi(orderId) {
  const userId = localStorage.getItem('token');
  if (!orderId) {
    throw new Error('orderId is undefined');
  }
  try {
    console.log('orderId:', orderId); // Log the orderId for debugging
    const res = await axios.get(`${API_URL}/${orderId}`, {
      headers: {
        accesstoken: userId,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching order status: ${error.message}`);
  }
}

export const createOrderApi = async (data) => {
  try {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const requestData = {
      userName: data.userName,
      mobile: data.mobile,
      address: data.address,
    };

    const res = await axios.post(`${API_URL}/create`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        accesstoken: accessToken,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching order: ${error.message}`);
  }
};
