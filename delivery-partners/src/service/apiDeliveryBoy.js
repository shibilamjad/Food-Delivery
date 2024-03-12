import axios from "axios";

const API_URL = "http://localhost:3006/api/delivery";

export async function getDeliveryBoyOrders() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(API_URL, {
      headers: {
        token: token,
      },
    });
    const { data } = res;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Order could not be retrieved");
  }
}
export async function takeDeliveryBoyOrdersApi(orderId) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${API_URL}/takeorder`, {
      orderId,
      token,
    });
    const { data } = res;

    return data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message ===
        "Delivery boy can handle only one order at a time"
    ) {
      throw new Error("Delivery boy can handle only one order at a time");
    } else {
      console.error(error.message);
      throw new Error(error.response);
    }
  }
}

export async function orderDetailsApi() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios(`${API_URL}/details/order`, {
      headers: {
        token: token,
      },
    });
    const { data } = res;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.response);
  }
}
export async function completedDetails() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios(`${API_URL}/complete`, {
      headers: {
        token: token,
      },
    });
    const { data } = res;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.response);
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
