// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifier l'authentification au chargement
        const token = authService.getToken();
        setIsAuthenticated(!!token);

        if (token) {
            // Récupérer les infos utilisateur
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/');
            setUser(response.data);
        } catch (error) {
            // Token invalide ou expiré
            authService.removeToken();
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                email,
                password
            });

            authService.setToken(response.data.access);
            setIsAuthenticated(true);
            await fetchUserData();

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || 'Erreur de connexion'
            };
        }
    };

    const logout = () => {
        authService.removeToken();
        setIsAuthenticated(false);
        setUser(null);
    };

    return {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        fetchUserData
    };
};