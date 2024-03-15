import axios from "axios";
import { PAGE_SIZE } from "../utils/PAGE_SIZE";

const API_URL = "http://localhost:3006/api/order";

export async function getOrder(
  deliveryStatus,
  sortBy,
  page = 1,
  limit = PAGE_SIZE
) {
  try {
    let res = await axios.get(`${API_URL}/lists`, {
      params: { delivery: deliveryStatus, sortBy, page, limit },
    });
    let { data } = res;
    // console.log(res);
    // let count = res.data.pageCount;
    return data.orders;
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
