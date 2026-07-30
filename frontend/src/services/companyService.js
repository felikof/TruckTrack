import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api/companies/';

const companyService = {
  getAuthHeaders: () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }),

  getMyCompany: async () => {
    const res = await axios.get(`${API_URL}?mine=true`, companyService.getAuthHeaders());
    return res.data[0] || null;
  },

  createCompany: async (data) => {
    const response = await axios.post(API_URL, data, companyService.getAuthHeaders());
    return response.data;
  },

  updateCompany: async (id, data) => {
    const response = await axios.put(`${API_URL}${id}/`, data, companyService.getAuthHeaders());
    return response.data;
  },
};

export default companyService;