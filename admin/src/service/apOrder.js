import axios from "axios";
import { useSearchParams } from "react-router-dom";

const API_URL = "http://localhost:3006/api/order";
export async function getOrder({ filter, sortBy }) {
  try {
    let res = await axios(`${API_URL}/lists`);
    let { data } = res;

    // Apply sorting if sortBy is provided
    if (sortBy) {
      data.sort((a, b) => {
        // Assuming sortBy.field is the field by which you want to sort
        // You might need to adjust this depending on your data structure
        const fieldA = a[sortBy.field];
        const fieldB = b[sortBy.field];

        if (fieldA < fieldB) {
          return sortBy.direction === "asc" ? -1 : 1;
        }
        if (fieldA > fieldB) {
          return sortBy.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    // Apply filtering if needed

    if (filter) {
      data = data.filter((order) => order[filter.field] === filter.value);
    }

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
