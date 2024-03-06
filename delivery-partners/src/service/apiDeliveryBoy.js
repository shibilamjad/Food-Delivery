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
    const deliveryBoyId = localStorage.getItem("token");

    const res = await axios.post(
      `${API_URL}/takeorder`,
      {
        orderId,
      },
      {
        headers: {
          Authorization: deliveryBoyId,
        },
      }
    );
    const { data } = res;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Order could not be retrieved");
  }
}
