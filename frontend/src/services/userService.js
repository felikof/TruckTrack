import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/users/';

const userService = {
    // Create a new user
    create: async (userData) => {
        const response = await axios.post(`${API_URL}sign/`, userData);
        return response.data;
    },

    // Login user
    login: async (email, password) => {
        const response = await axios.post(`${API_URL}login/`, { email, password });
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("email", email);
        console.log("Login response:", response.data);
        return response.data;
    },

    // Get current user profile
    getUser: async (token, email) => {
        try {
            const response = await axios.get(`${API_URL}?email=${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("User log mail:", email);
            console.log("Profile response:", response.data);

            // Si ton API renvoie une liste, on retourne le premier utilisateur trouvé
            return Array.isArray(response.data) ? response.data[0] : response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération du profil:", error);
            throw error;
        }
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