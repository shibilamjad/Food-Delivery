import axios from 'axios';

const API_URL = 'https://food-delivery-4.onrender.com/api';

export async function createReviewApi(data) {
  try {
    const formData = new FormData();
    formData.append('restaurant', data.restaurant);
    formData.append('imageUrl', data.imageUrl[0]);
    formData.append('content', data.content);
    formData.append('ratings', data.ratings);
    formData.append('userId', data.userId);
    formData.append('order', data.order);

    const res = await axios.post(`${API_URL}/review/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 409) {
      throw new Error('Menu title already exists');
    }

    throw new Error('Menu could not be created');
  }
}
export async function getRestaurants() {
  try {
    const res = await axios(`${API_URL}/review`);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error('restaurants could not be retrieved');
  }
}
