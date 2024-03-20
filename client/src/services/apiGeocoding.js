import axios from 'axios';

export async function getAddress({ latitude, longitude }) {
  try {
    const res = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
    );

    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error(
        `Failed getting address - ${res.status} ${res.statusText}`,
      );
    }
  } catch (error) {
    console.error('Error getting address:', error);
    throw new Error('Failed getting address - Network error');
  }
}
