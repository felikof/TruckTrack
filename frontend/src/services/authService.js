// services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Votre URL Django

// Stockage du token
export const authService = {
    // Sauvegarder le token
    setToken: (token) => {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    // Récupérer le token
    getToken: () => {
        return localStorage.getItem('authToken');
    },

    // Supprimer le token (déconnexion)
    removeToken: () => {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
    },

    // Vérifier si l'utilisateur est connecté
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    // Configurer axios pour inclure le token automatiquement
    setupInterceptors: () => {
        const token = authService.getToken();
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // Intercepteur pour gérer les tokens expirés
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    authService.removeToken();
                    window.location.href = '/signin';
                }
                return Promise.reject(error);
            }
        );
    }
};