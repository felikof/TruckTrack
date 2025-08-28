import React, { useState } from 'react';

const AdminRegister = ({ onRegister, showLoginLink = true }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminCode: ''
    });
    const [confirmationCode, setConfirmationCode] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

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

    const handleConfirmationCodeChange = (e) => {
        setConfirmationCode(e.target.value);
        if (errors.confirmationCode) {
            setErrors(prev => ({
                ...prev,
                confirmationCode: ''
            }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
        if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
        if (!formData.email) newErrors.email = 'L\'email est requis';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
        if (!formData.password) newErrors.password = 'Le mot de passe est requis';
        else if (formData.password.length < 8) newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!confirmationCode) newErrors.confirmationCode = 'Le code de confirmation est requis';
        else if (confirmationCode !== generatedCode) newErrors.confirmationCode = 'Code de confirmation incorrect';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const generateConfirmationCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        return code;
    };

    const handleStep1Submit = (e) => {
        e.preventDefault();
        if (!validateStep1()) return;

        // Générer et envoyer le code de confirmation (simulation)
        const code = generateConfirmationCode();
        alert(`Code de confirmation envoyé à ${formData.email} : ${code}`);

        setCurrentStep(2);
    };

    const handleStep2Submit = async (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Vérifier le code administrateur
            if (formData.adminCode !== 'ADMIN2024') {
                setErrors({ adminCode: 'Code administrateur incorrect' });
                return;
            }

            if (onRegister) {
                onRegister(formData);
            } else {
                console.log('Inscription réussie:', formData);
                alert('Compte créé avec succès !');
            }
        } catch {
            setErrors({ submit: 'Erreur lors de l\'inscription. Veuillez réessayer.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToStep1 = () => {
        setCurrentStep(1);
        setErrors({});
    };

    const handleResendCode = () => {
        const newCode = generateConfirmationCode();
        alert(`Nouveau code envoyé à ${formData.email} : ${newCode}`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Indicateur d'étapes */}
                <div style={styles.steps}>
                    <div style={{
                        ...styles.step,
                        ...(currentStep === 1 ? styles.stepActive : styles.stepCompleted)
                    }}>
                        <div style={styles.stepNumber}>1</div>
                        <span style={styles.stepLabel}>Informations</span>
                    </div>
                    <div style={styles.stepLine}></div>
                    <div style={{
                        ...styles.step,
                        ...(currentStep === 2 ? styles.stepActive : currentStep > 2 ? styles.stepCompleted : {})
                    }}>
                        <div style={styles.stepNumber}>2</div>
                        <span style={styles.stepLabel}>Confirmation</span>
                    </div>
                </div>

                <div style={styles.header}>
                    <div style={{ ...styles.logo, backgroundColor: currentStep === 1 ? '#059669' : '#2563eb' }}>
                        <svg style={styles.logoSvg} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 style={styles.title}>
                        {currentStep === 1 ? 'Inscription Administrateur' : 'Confirmation du compte'}
                    </h2>
                    <p style={styles.subtitle}>
                        {currentStep === 1 ? 'Créez votre compte administrateur' : 'Entrez le code de confirmation'}
                    </p>
                </div>

                {currentStep === 1 ? (
                    <form style={styles.form} onSubmit={handleStep1Submit}>
                        <div style={styles.grid}>
                            <div style={styles.inputGroup}>
                                <label htmlFor="firstName" style={styles.label}>Prénom</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    style={{
                                        ...styles.input,
                                        ...(errors.firstName && styles.inputError)
                                    }}
                                    placeholder="Jean"
                                />
                                {errors.firstName && <p style={styles.errorText}>{errors.firstName}</p>}
                            </div>

                            <div style={styles.inputGroup}>
                                <label htmlFor="lastName" style={styles.label}>Nom</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    style={{
                                        ...styles.input,
                                        ...(errors.lastName && styles.inputError)
                                    }}
                                    placeholder="Dupont"
                                />
                                {errors.lastName && <p style={styles.errorText}>{errors.lastName}</p>}
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
                                placeholder="admin@example.com"
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
                            style={styles.nextButton}
                        >
                            Continuer
                        </button>
                    </form>
                ) : (
                    <form style={styles.form} onSubmit={handleStep2Submit}>
                        {errors.submit && (
                            <div style={styles.errorAlert}>
                                {errors.submit}
                            </div>
                        )}

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Code de confirmation</label>
                            <p style={styles.helperText}>
                                Entrez le code à 6 chiffres envoyé à {formData.email}
                            </p>
                            <input
                                type="text"
                                value={confirmationCode}
                                onChange={handleConfirmationCodeChange}
                                style={{
                                    ...styles.input,
                                    ...styles.confirmationInput,
                                    ...(errors.confirmationCode && styles.inputError)
                                }}
                                placeholder="123456"
                                maxLength="6"
                            />
                            {errors.confirmationCode && <p style={styles.errorText}>{errors.confirmationCode}</p>}

                            <button
                                type="button"
                                onClick={handleResendCode}
                                style={styles.resendButton}
                            >
                                Renvoyer le code
                            </button>
                        </div>

                        <div style={styles.inputGroup}>
                            <label htmlFor="adminCode" style={styles.label}>Code administrateur</label>
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
                                placeholder="Code secret administrateur"
                            />
                            {errors.adminCode && <p style={styles.errorText}>{errors.adminCode}</p>}
                            <p style={styles.helperText}>Code requis pour créer un compte administrateur</p>
                        </div>

                        <div style={styles.buttonGroup}>
                            <button
                                type="button"
                                onClick={handleBackToStep1}
                                style={styles.backButton}
                            >
                                Retour
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    ...styles.submitButton,
                                    ...(isLoading && styles.submitButtonDisabled)
                                }}
                            >
                                {isLoading ? 'Création...' : 'Créer le compte'}
                            </button>
                        </div>
                    </form>
                )}

                {showLoginLink && (
                    <div style={styles.footer}>
                        <p style={styles.footerText}>
                            Déjà un compte ?{' '}
                            <a href="/AdminL" style={{ ...styles.footerLink, color: '#2563eb' }}>
                                Se connecter
                            </a>
                        </p>
                    </div>
                )}
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
        backgroundColor: '#f9fafb',
        padding: '20px',
        fontFamily: "'Inter', sans-serif"
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '480px'
    },
    steps: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '30px',
        gap: '8px'
    },
    step: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
    },
    stepActive: {
        color: '#2563eb'
    },
    stepCompleted: {
        color: '#059669'
    },
    stepNumber: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        fontSize: '14px',
        border: '2px solid #d1d5db'
    },
    stepLabel: {
        fontSize: '12px',
        fontWeight: '500'
    },
    stepLine: {
        width: '40px',
        height: '2px',
        backgroundColor: '#d1d5db',
        margin: '0 8px'
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
    confirmationInput: {
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: '600',
        letterSpacing: '2px'
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
    nextButton: {
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
    buttonGroup: {
        display: 'flex',
        gap: '12px'
    },
    backButton: {
        backgroundColor: '#6b7280',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        flex: 1,
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#4b5563'
        }
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
        flex: 2,
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
    resendButton: {
        backgroundColor: 'transparent',
        color: '#2563eb',
        border: 'none',
        fontSize: '12px',
        cursor: 'pointer',
        alignSelf: 'flex-start',
        padding: '4px 0',
        ':hover': {
            textDecoration: 'underline'
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
        fontWeight: '500',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline'
        }
    }
};

export default AdminRegister;