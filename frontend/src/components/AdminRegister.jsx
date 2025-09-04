import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        badgeNumber: '',
        nom: '',
        prenom: '',
        email: '',
        mot_de_passe: '',
        confirmPassword: '',
        adminCode: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
        if (!formData.badgeNumber) newErrors.badgeNumber = 'Le numéro de badge est requis';
        else if (!/^[A-Z]{3}\d{4}$/.test(formData.badgeNumber)) newErrors.badgeNumber = 'Format invalide (ex: ADM1234)';
        if (!formData.prenom) newErrors.prenom = 'Le prénom est requis';
        if (!formData.nom) newErrors.nom = 'Le nom est requis';
        if (!formData.email) newErrors.email = 'L\'email est requis';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
        if (!formData.mot_de_passe) newErrors.mot_de_passe = 'Le mot de passe est requis';
        else if (formData.mot_de_passe.length < 8) newErrors.mot_de_passe = 'Le mot de passe doit contenir au moins 8 caractères';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
        else if (formData.mot_de_passe !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        if (!formData.adminCode) newErrors.adminCode = 'Le code administrateur est requis';
        else if (formData.adminCode !== 'ADMIN2024') newErrors.adminCode = 'Code administrateur incorrect';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/admins/inscription", {
                badge_number: formData.badgeNumber, // Ajout du badgeNumber
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                mot_de_passe: formData.mot_de_passe
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Inscription réussie :", response.data);
            navigate("/AdminL");
        } catch (error) {
            if (error.response?.status === 422) {
                // Gestion des erreurs de validation du serveur
                handleServerErrors(error.response.data);
            } else {
                console.error("Erreur d'inscription :", error);
                setErrors({ general: "Erreur lors de l'inscription. Veuillez réessayer." });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleServerErrors = (errorData) => {
        const newErrors = {};

        // Format standard FastAPI pour les erreurs de validation
        if (errorData.detail && Array.isArray(errorData.detail)) {
            errorData.detail.forEach(error => {
                const fieldName = error.loc[error.loc.length - 1];
                // Mapping des noms de champs entre le frontend et le backend
                const fieldMap = {
                    'badge_number': 'badgeNumber',
                    'mot_de_passe': 'mot_de_passe'
                };
                const clientFieldName = fieldMap[fieldName] || fieldName;
                newErrors[clientFieldName] = error.msg;
            });
        }
        // Autre format possible
        else if (typeof errorData.detail === 'string') {
            newErrors.general = errorData.detail;
        }
        // Format de secours
        else {
            newErrors.general = 'Erreur de validation des données';
        }

        setErrors(newErrors);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.logo}>
                        <svg style={styles.logoSvg} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 style={styles.title}>Inscription Administrateur</h2>
                    <p style={styles.subtitle}>Créez votre compte administrateur</p>
                </div>

                {errors.general && (
                    <div style={styles.errorAlert}>
                        {errors.general}
                    </div>
                )}

                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="badgeNumber" style={styles.label}>Numéro de Badge *</label>
                        <input
                            id="badgeNumber"
                            name="badgeNumber"
                            type="text"
                            value={formData.badgeNumber}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.badgeNumber && styles.inputError)
                            }}
                            placeholder="ADM1234"
                            maxLength={7}
                        />
                        {errors.badgeNumber && <p style={styles.errorText}>{errors.badgeNumber}</p>}
                    </div>

                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="nom" style={styles.label}>Nom *</label>
                            <input
                                id="nom"
                                name="nom"
                                type="text"
                                value={formData.nom}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(errors.nom && styles.inputError)
                                }}
                                placeholder="Dupont"
                            />
                            {errors.nom && <p style={styles.errorText}>{errors.nom}</p>}
                        </div>

                        <div style={styles.inputGroup}>
                            <label htmlFor="prenom" style={styles.label}>Prénom *</label>
                            <input
                                id="prenom"
                                name="prenom"
                                type="text"
                                value={formData.prenom}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(errors.prenom && styles.inputError)
                                }}
                                placeholder="Jean"
                            />
                            {errors.prenom && <p style={styles.errorText}>{errors.prenom}</p>}
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Adresse email *</label>
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
                            placeholder="admin@example.com"
                        />
                        {errors.email && <p style={styles.errorText}>{errors.email}</p>}
                    </div>
                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="mot_de_passe" style={styles.label}>Mot de passe *</label>
                            <input
                                id="mot_de_passe"
                                name="mot_de_passe"
                                type="password"
                                value={formData.mot_de_passe}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(errors.mot_de_passe && styles.inputError)
                                }}
                                placeholder="••••••••"
                            />
                            {errors.mot_de_passe && <p style={styles.errorText}>{errors.mot_de_passe}</p>}
                        </div>

                        <div style={styles.inputGroup}>
                            <label htmlFor="confirmPassword" style={styles.label}>Confirmer le mot de passe *</label>
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
                    </div>


                    <div style={styles.inputGroup}>
                        <label htmlFor="adminCode" style={styles.label}>Code administrateur *</label>
                        <input
                            id="adminCode"
                            name="adminCode"
                            type="password"
                            value={formData.adminCode}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.adminCode && styles.inputError)
                            }}
                            placeholder="Entrez le code secret"
                        />
                        {errors.adminCode && <p style={styles.errorText}>{errors.adminCode}</p>}
                        <p style={styles.helperText}>Code requis pour créer un compte administrateur</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            ...styles.submitButton,
                            ...(isLoading && styles.submitButtonDisabled)
                        }}
                    >
                        {isLoading ? 'Création en cours...' : 'Créer le compte'}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Déjà un compte ?{' '}
                        <a href="/AdminL" style={styles.footerLink}>
                            Se connecter
                        </a>
                    </p>
                </div>
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
                    border-color: #2563eb !important;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
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
        backgroundImage: `url("/portnight.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '20px',
        fontFamily: "'Inter', sans-serif"
    },
    card: {
        backgroundColor: '#f9fafbea',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '40px',
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
        backgroundColor: '#059669',
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
        fontSize: '14px',
        marginBottom: '20px'
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
        backgroundColor: '#059669',
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
        marginTop: '20px'
    },
    footerText: {
        fontSize: '14px',
        color: '#6b7280',
        margin: '0'
    },
    footerLink: {
        color: '#2563eb',
        fontWeight: '500',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline'
        }
    }
};

export default AdminRegister;