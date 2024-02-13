import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

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

  try {
    const res = await axios.get(`${API_URL}/order-new/${orderId}`, {
      headers: {
        accesstoken: userId,
      },
    });
    console.log(res);
    const { data } = res;
    return data;
  } catch (error) {
    throw new Error(`Error fetching order status: ${error.message}`);
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

    if (!res.data || !res.data.orderId) {
      throw new Error('OrderId not found in response');
    }
    return res.data.orderId;
  } catch (error) {
    throw new Error(`Error fetching order: ${error.message}`);
  }
};

export function useCreateOrderApi() {
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation(
    async (data) => {
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

        if (!res.data || !res.data.orderId) {
          throw new Error('OrderId not found in response');
        }

        return res.data.orderId;
      } catch (error) {
        throw new Error(`Error fetching order: ${error.message}`);
      }
    },
    {
      onSuccess: () => {
        // Refetch the order list after successfully creating a new order
        queryClient.invalidateQueries('order');
      },
    },
  );

  return createOrderMutation;
}
