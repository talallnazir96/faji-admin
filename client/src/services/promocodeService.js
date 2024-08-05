import axios from 'axios';

const API_URL = 'http://localhost:5000/api/promo';

export const getAllPromocodes = async () => {
    try {
      const response = await axios.get(API_URL);
      
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  };