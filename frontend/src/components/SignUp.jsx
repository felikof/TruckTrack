import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        first_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const navigateIn = useNavigate();

    const handleSignIn = () => {
        navigateIn("/SignIn");
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'Le prénom est requis';
        if (!formData.name) newErrors.name = 'Le nom est requis';
        if (!formData.email) newErrors.email = 'L\'email est requis';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
        if (!formData.password) newErrors.password = 'Le mot de passe est requis';
        else if (formData.password.length < 8) newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        if (!validateForm()) return;
        setIsLoading(true);
        navigate("/SignIn");
        try {
            await axios.post("http://127.0.0.1:8000/users/sign/", {
                name: formData.name,
                first_name: formData.first_name,
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            );
            toast.success("Inscription réussie !");
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate("/SignIn");
        } catch {
            setErrors({ submit: 'Erreur lors de l\'inscription. Veuillez réessayer.' });
            toast.error("Erreur lors de l'inscription. Veuillez réessayer.")
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={{ ...styles.logo, backgroundColor: '#059669' }}>
                        <svg style={styles.logoSvg} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    {/* <h2 style={styles.title}>Inscription</h2> */}
                    <p style={styles.subtitle}>Créez votre compte utilisateur</p>
                </div>

                <form style={styles.form} onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={styles.errorAlert}>
                            {errors.submit}
                        </div>
                    )}

                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="name" style={styles.label}>Nom</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(errors.name && styles.inputError)
                                }}
                                placeholder="Dupont"
                            />
                            {errors.name && <p style={styles.errorText}>{errors.name}</p>}
                        </div>

                        <div style={styles.inputGroup}>
                            <label htmlFor="first_name" style={styles.label}>Prénom</label>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                value={formData.first_name}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(errors.first_name && styles.inputError)
                                }}
                                placeholder="Jean"
                            />
                            {errors.first_name && <p style={styles.errorText}>{errors.first_name}</p>}
                        </div>

                    </div>

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

                    <div style={styles.inputGroup}>
                        <label htmlFor="confirmPassword" style={styles.label}>Confirmer le mot de passe</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.confirmPassword && styles.inputError)
                            }}
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            ...styles.submitButton,
                            backgroundColor: '#059669',
                            ...(isLoading && styles.submitButtonDisabled)
                        }}
                    >
                        {isLoading ? 'Créeation du compte...' : 'Créer le compte'}
                    </button>

                    <div style={styles.footer}>
                        <p style={styles.footerText}>
                            Déjà un compte ?{' '}
                            <a onClick={handleSignIn} style={{ ...styles.footerLink, color: '#059669' }}>
                                Se connecter
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

                input:focus {
                border-color: #059669 !important;
                box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
                }
            `}</style>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url("/cargo-au-port-de-miami.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '10px',
        fontFamily: "'Inter', sans-serif"
    },
    card: {
        backgroundColor: '#ffffffdc',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '15px 30px 15px 30px',
        width: '100%',
        maxWidth: '480px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px'
    },
    logo: {
        width: '48px',
        height: '48px',
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
        margin: '0',
        marginBottom: '5px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
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
        transition: 'border-color 0.2s'
    },
    inputError: {
        borderColor: '#dc2626'
    },
    errorText: {
        fontSize: '12px',
        color: '#dc2626',
        margin: '4px 0 0'
    },
    helperText: {
        fontSize: '12px',
        color: '#6b7280',
        margin: '4px 0 0'
    },
    submitButton: {
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#047857'
        }
    },
    submitButtonDisabled: {
        opacity: '0.5',
        cursor: 'not-allowed',
        ':hover': {
            backgroundColor: '#059669'
        }
    },
    footer: {
        textAlign: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb',
        marginTop: '0px'
    },
    footerText: {
        fontSize: '14px',
        color: '#6b7280',
        margin: '0'
    },
    footerLink: {
        cursor: 'pointer',
        fontWeight: '500',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline'
        }
    }
};
export default SignUp;