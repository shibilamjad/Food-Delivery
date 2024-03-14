import axios from "axios";

const API_URL = "http://localhost:3006/api/order";

export async function getOrder(deliveryStatus, sortBy) {
  try {
    let res = await axios.get(`${API_URL}/lists`, {
      params: { delivery: deliveryStatus, sortBy },
    });
    let { data } = res;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Order could not be retrieved");
  }
}

export async function getOrderDetailsApi(orderId) {
  try {
    const res = await axios(`${API_URL}/details/${orderId}`);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("order could not be retrieved");
  }
}
export async function getOrderNofitysApi() {
  try {
    const res = await axios(`${API_URL}/notify`);
    const { data } = res;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("order could not be retrieved");
  }
}

// // Sort the data based
// if (sortBy) {
//   data.sort((a, b) => {
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   });
// }
