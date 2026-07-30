import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api/drivers/';

const driverService = {
  getAuthHeaders: () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }),

  getMyDrivers: async () => {
    const response = await axios.get(API_URL, driverService.getAuthHeaders());
    return response.data;
  },

  createDriver: async (data) => {
    const response = await axios.post(API_URL, data, driverService.getAuthHeaders());
    return response.data;
  },
};

export default driverService;