import axios from 'axios';
const API_URL = 'http://localhost:3006/api';

export const apiCity = async () => {
  try {
    const res = await axios(`${API_URL}/city`);

    return res.data;
  } catch (error) {
    throw new Error(`City creation failed`);
  }
};
