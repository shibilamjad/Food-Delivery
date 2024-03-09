import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3006/api/order';

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
      lattitude: data.lattitude,
      longitude: data.longitude,
      deliveryCharge: data.deliveryCharge,
    };

    const response = await axios.post(`${API_URL}/create`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        accesstoken: accessToken,
      },
    });

    if (!response.data || !response.data.orderId) {
      throw new Error('OrderId not found in response');
    }
    return response.data.orderId;
  } catch (error) {
    throw new Error(`Error fetching order: ${error.message}`);
  }
};

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

export async function orderDetailsApi(orderId) {
  try {
    const res = await axios.get(`${API_URL}/orderdetails/${orderId}`);

    const { data } = res;
    return data;
  } catch (error) {
    throw new Error(`Error fetching order details: ${error.message}`);
  }
}
