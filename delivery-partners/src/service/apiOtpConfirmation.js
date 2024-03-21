import axios from "axios";

const API_URL = "https://food-delivery-4.onrender.com/api/otp";

export async function otpApi(mobile) {
  try {
    const res = await axios.post(`${API_URL}/orderConfirmation`, {
      mobile,
    });
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("something went wrong");
  }
}

export async function verifyOtpApi(newData) {
  const token = localStorage.getItem("token");
  try {
    const requestData = {
      mobile: newData.mobile,
      otp: newData.otp,
      orderId: newData.orderId,
      token,
    };
    const res = await axios.post(`${API_URL}/verify`, requestData);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("something went wrong");
  }
}
