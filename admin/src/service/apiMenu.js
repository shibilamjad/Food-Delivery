import axios from "axios";

const API_URL = "https://food-delivery-4.onrender.com/api/menu";

export async function getMenu() {
  try {
    const res = await axios(API_URL);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Menu could not be retrieved");
  }
}

export async function getMenuId(menuId) {
  try {
    const res = await axios(`${API_URL}/${menuId}`);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Menu could not be retrieved");
  }
}
export async function uploadMenuApi(data) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("imageUrl", data.imageUrl[0]);
    formData.append("unitPrice", data.unitPrice);
    formData.append("ingredients", data.ingredients);
    formData.append("discount", data.discount);
    formData.append("isAvailable", data.isAvailable);
    formData.append("restaurant", data.restaurant.value);
    const res = await axios.post(`${API_URL}/add-menu`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error uploading Menu:", error.message);
    throw new Error(`Menu could not be created: ${error.message}`);
  }
}
export async function updateMenuApi(menuId, data) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("imageUrl", data.imageUrl[0]);
    formData.append("unitPrice", data.unitPrice);
    formData.append("ingredients", data.ingredients);
    formData.append("discount", data.discount);
    formData.append("isAvailable", data.isAvailable);
    // formData.append("restaurant", data.restaurant.value);

    const res = await axios.put(`${API_URL}/updateMenu/${menuId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 409) {
      throw new Error("Menu title already exists");
    }

    throw new Error("Menu could not be updated");
  }
}

export async function deleteMenuApi(_id) {
  try {
    const userId = localStorage.getItem("token");

    const res = await axios(API_URL, {
      method: "DELETE",
      data: {
        _id,
      },
      headers: {
        accesstoken: userId,
      },
    });
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Menu cloud not be deleted");
  }
}
