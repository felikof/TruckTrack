import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api/notifications/';

const nootificationService = {
    getAuthHeaders: () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }),
    
    getMyNotifications: async () => {
        const response = await axios.get(`${API_URL}?mine=true`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        return response.data;
    },
    markAsRead: async (id) => {
        const response = await axios.patch(`${API_URL}${id}/`, { read: true }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        return response.data;
    }
};

export default nootificationService;



export const getMyNotifications = async () => (await axios.get(`${API_URL}?mine=true`, getAuthHeaders())).data;
export const markAsRead = async (id) => (await axios.patch(`${API_URL}${id}/`, { read: true }, getAuthHeaders())).data;