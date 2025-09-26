import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const navigateUp = useNavigate();

    const handleSignUp = () => {
        navigateUp("/SignUp");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'L\'email est requis';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
        if (!formData.password) newErrors.password = 'Le mot de passe est requis';
        else if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!validateForm()) return;
    //     setIsLoading(true);
    //     try {
    //         await axios.post("http://127.0.0.1:8000//users/login/", {
    //             email: formData.email,
    //             password: formData.password
    //         }, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }
    //         );
    //         await new Promise(resolve => setTimeout(resolve, 1000));
    //         toast.success('Connexion réussie !');
    //         navigate("/Booking");
    //     } catch {
    //         setErrors({ submit: 'Erreur de connexion. Veuillez réessayer.' });
    //         toast.error('Erreur de connexion. Veuillez réessayer.');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:8000/users/login/", {
                email: formData.email, // ou 'username' selon votre API
                password: formData.password
            });

            // Sauvegarder le token
            authService.setToken(response.data.access);

            // Optionnel: Sauvegarder le refresh token
            if (response.data.refresh) {
                localStorage.setItem('refreshToken', response.data.refresh);
            }

            toast.success("Connexion réussie !");

            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate("/Booking"); // Redirection vers le tableau de bord

        } catch (error) {
            const errorMessage = error.response?.data?.detail ||
                'Email ou mot de passe incorrect';

            setErrors({ submit: errorMessage });
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.logo}>
                        <svg style={styles.logoSvg} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 style={styles.title}>Connexion</h2>
                    <p style={styles.subtitle}>Accédez à votre espace client</p>
                </div>

                <form style={styles.form} onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={styles.errorAlert}>
                            {errors.submit}
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Adresse email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.email && styles.inputError)
                            }}
                            placeholder="user@example.com"
                        />
                        {errors.email && <p style={styles.errorText}>{errors.email}</p>}
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Mot de passe</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.password && styles.inputError)
                            }}
                            placeholder="••••••••"
                        />
                        {errors.password && <p style={styles.errorText}>{errors.password}</p>}
                    </div>

                    <div style={styles.options}>
                        <label style={styles.checkboxLabel}>
                            <input type="checkbox" style={styles.checkbox} />
                            Se souvenir de moi
                        </label>
                        <a href="#" style={styles.link}>Mot de passe oublié ?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            ...styles.submitButton,
                            ...(isLoading && styles.submitButtonDisabled)
                        }}
                    >
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </button>

                    <div style={styles.footer}>
                        <p style={styles.footerText}>
                            Pas encore de compte ?{' '}
                            <a onClick={handleSignUp} style={styles.footerLink}>
                                Créer un compte
                            </a>
                        </p>
                    </div>
                </form>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f9fafb;
                    margin: 0;
                    padding: 0;
                }
            `}</style>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        padding: '10px',
        fontFamily: "'Inter', sans-serif",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url("/portnight.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    card: {
        backgroundColor: '#f9fafbea',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '15px 30px 15px 30px',
        width: '100%',
        maxWidth: '400px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px'
    },
    logo: {
        width: '48px',
        height: '48px',
        backgroundColor: '#2563eb',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px'
    },
    logoSvg: {
        width: '24px',
        height: '24px',
        color: 'white'
    },
    title: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 8px'
    },
    subtitle: {
        fontSize: '14px',
        color: '#6b7280',
        margin: '0'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    errorAlert: {
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#dc2626',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151'
    },
    input: {
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s',
        ':focus': {
            borderColor: '#2563eb',
            boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
        }
    },
    inputError: {
        borderColor: '#dc2626',
        ':focus': {
            borderColor: '#dc2626',
            boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)'
        }
    },
    errorText: {
        fontSize: '12px',
        color: '#dc2626',
        margin: '4px 0 0'
    },
    options: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#374151'
    },
    checkbox: {
        width: '16px',
        height: '16px',
        accentColor: '#2563eb'
    },
    link: {
        color: '#2563eb',
        textDecoration: 'none',
        fontWeight: '500',
        ':hover': {
            textDecoration: 'underline'
        }
    },
    submitButton: {
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#1d4ed8'
        }
    },
    submitButtonDisabled: {
        opacity: '0.5',
        cursor: 'not-allowed',
        ':hover': {
            backgroundColor: '#2563eb'
        }
    },
    footer: {
        textAlign: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb',
        marginTop: '20px'
    },
    footerText: {
        fontSize: '14px',
        color: '#6b7280',
        margin: '0'
    },
    footerLink: {
        cursor: 'pointer',
        color: '#2563eb',
        fontWeight: '500',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline'
        }
    }
};

export default SignIn;