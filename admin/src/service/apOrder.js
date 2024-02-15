import axios from "axios";

const API_URL = "http://localhost:3006/api/order";

export async function getOrder(sortBy) {
  try {
    const res = await axios(`${API_URL}/lists`);
    let { data } = res;

    // Sort the data based
    if (sortBy) {
      data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("order could not be retrieved");
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
