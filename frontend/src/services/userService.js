import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/users/';

const userService = {
    // Create a new user
    create: async (userData) => {
        const response = await axios.post(`${API_URL}/sign/`, userData);
        return response.data;
    },

    // Login user
    login: async (email, password) => {
        const response = await axios.post(`${API_URL}login/`, {email, password});
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        console.log("Login response:", response.data);
        return response.data;
    },

    // Get current user profile
    getUser: async (token) => {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Profile response:", response.data);
        return response.data;
    },

    // Update user profile
    updateProfile: async (token, profileData) => {
        const response = await axios.put(`${API_URL}`, profileData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export default userService;