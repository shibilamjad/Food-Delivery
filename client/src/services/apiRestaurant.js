import axios from 'axios';
import { PAGE_SIZE } from '../utils/PAGE_SIZE';

const API_URL = 'http://localhost:3006/api';

export async function getRestaurants({ limit = PAGE_SIZE, page = 1 }) {
  try {
    const res = await axios(`${API_URL}/restaurants`, {
      params: {
        page,
        limit,
      },
    });
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error('restaurants could not be retrieved');
  }
}

export async function getSearchRestaurants({ search }) {
  try {
    const res = await axios(`${API_URL}/restaurants`, {
      params: {
        search,
      },
    });
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error('restaurants could not be retrieved');
  }
}

export async function getAvailableRestaurnat({ limit = PAGE_SIZE, page = 1 }) {
  try {
    const token = localStorage.getItem('token');

    const res = await axios.get(`${API_URL}/restaurants/available`, {
      params: {
        page,
        limit,
      },
      headers: {
        token: token,
      },
    });
    const { data } = res;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error('Restaurants could not be retrieved');
  }
}

export async function getRestaurantsMenu(restaurantId) {
  try {
    const token = localStorage.getItem('token');
    const res = await axios(`${API_URL}/restaurants/${restaurantId}`, {
      headers: {
        token: token,
      },
    });
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);

    throw new Error('order could not be retrieved');
  }
}
export async function getMenu() {
  try {
    const res = await axios(`${API_URL}/menu`);
    if (!res.statusText) throw Error();

    const { data } = res;

    return data;
  } catch (error) {
    throw new Error('menu could not be retrieved');
  }
}

export async function getOrder(id) {
  const res = await axios(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}
export async function createOrder(newOrder) {
  try {
    const res = await axios(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await axios(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
