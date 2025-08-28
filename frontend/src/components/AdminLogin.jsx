// import React, { useState } from 'react';

// const AdminLogin = ({ onLogin, showRegisterLink = true }) => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//         if (errors[name]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: ''
//             }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.email) newErrors.email = 'L\'email est requis';
//         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
//         if (!formData.password) newErrors.password = 'Le mot de passe est requis';
//         else if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
//         setIsLoading(true);
//         try {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             if (onLogin) onLogin(formData);
//         } catch {
//             setErrors({ submit: 'Erreur de connexion. Veuillez réessayer.' });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.card}>
//                 <div style={styles.header}>
//                     <div style={styles.logo}>
//                         <svg style={styles.logoSvg} viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                         </svg>
//                     </div>
//                     <h2 style={styles.title}>Connexion Administrateur</h2>
//                     <p style={styles.subtitle}>Accédez à votre espace d'administration</p>
//                 </div>

//                 <form style={styles.form} onSubmit={handleSubmit}>
//                     {errors.submit && (
//                         <div style={styles.errorAlert}>
//                             {errors.submit}
//                         </div>
//                     )}

//                     <div style={styles.inputGroup}>
//                         <label htmlFor="email" style={styles.label}>Adresse email</label>
//                         <input
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             style={{
//                                 ...styles.input,
//                                 ...(errors.email && styles.inputError)
//                             }}
//                             placeholder="admin@example.com"
//                         />
//                         {errors.email && <p style={styles.errorText}>{errors.email}</p>}
//                     </div>

//                     <div style={styles.inputGroup}>
//                         <label htmlFor="password" style={styles.label}>Mot de passe</label>
//                         <input
//                             id="password"
//                             name="password"
//                             type="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             style={{
//                                 ...styles.input,
//                                 ...(errors.password && styles.inputError)
//                             }}
//                             placeholder="••••••••"
//                         />
//                         {errors.password && <p style={styles.errorText}>{errors.password}</p>}
//                     </div>

//                     <div style={styles.options}>
//                         <label style={styles.checkboxLabel}>
//                             <input type="checkbox" style={styles.checkbox} />
//                             Se souvenir de moi
//                         </label>
//                         <a href="#" style={styles.link}>Mot de passe oublié ?</a>
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         style={{
//                             ...styles.submitButton,
//                             ...(isLoading && styles.submitButtonDisabled)
//                         }}
//                     >
//                         {isLoading ? 'Connexion...' : 'Se connecter'}
//                     </button>

//                     {showRegisterLink && (
//                         <div style={styles.footer}>
//                             <p style={styles.footerText}>
//                                 Pas encore de compte ?{' '}
//                                 <a href="/AdminR" style={styles.footerLink}>
//                                     Créer un compte administrateur
//                                 </a>
//                             </p>
//                         </div>
//                     )}
//                 </form>
//             </div>

//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

//                 body {
//                     font-family: 'Inter', sans-serif;
//                     background-color: #f9fafb;
//                     margin: 0;
//                     padding: 0;
//                 }
//             `}</style>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#f9fafb',
//         padding: '20px',
//         paddingTop: '8px',
//         paddingBottom: '8px',
//         fontFamily: "'Inter', sans-serif"
//     },
//     card: {
//         backgroundColor: 'white',
//         borderRadius: '12px',
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//         padding: '40px',
//         width: '100%',
//         maxWidth: '400px'
//     },
//     header: {
//         textAlign: 'center',
//         marginBottom: '30px'
//     },
//     logo: {
//         width: '48px',
//         height: '48px',
//         backgroundColor: '#2563eb',
//         borderRadius: '50%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: '0 auto 16px'
//     },
//     logoSvg: {
//         width: '24px',
//         height: '24px',
//         color: 'white'
//     },
//     title: {
//         fontSize: '24px',
//         fontWeight: '700',
//         color: '#1f2937',
//         margin: '0 0 8px'
//     },
//     subtitle: {
//         fontSize: '14px',
//         color: '#6b7280',
//         margin: '0'
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '20px'
//     },
//     errorAlert: {
//         backgroundColor: '#fef2f2',
//         border: '1px solid #fecaca',
//         color: '#dc2626',
//         padding: '12px 16px',
//         borderRadius: '8px',
//         fontSize: '14px'
//     },
//     inputGroup: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '8px'
//     },
//     label: {
//         fontSize: '14px',
//         fontWeight: '500',
//         color: '#374151'
//     },
//     input: {
//         padding: '12px 16px',
//         border: '1px solid #d1d5db',
//         borderRadius: '8px',
//         fontSize: '14px',
//         outline: 'none',
//         transition: 'border-color 0.2s',
//         ':focus': {
//             borderColor: '#2563eb',
//             boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
//         }
//     },
//     inputError: {
//         borderColor: '#dc2626',
//         ':focus': {
//             borderColor: '#dc2626',
//             boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)'
//         }
//     },
//     errorText: {
//         fontSize: '12px',
//         color: '#dc2626',
//         margin: '4px 0 0'
//     },
//     options: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         fontSize: '14px'
//     },
//     checkboxLabel: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px',
//         color: '#374151'
//     },
//     checkbox: {
//         width: '16px',
//         height: '16px',
//         accentColor: '#2563eb'
//     },
//     link: {
//         color: '#2563eb',
//         textDecoration: 'none',
//         fontWeight: '500',
//         ':hover': {
//             textDecoration: 'underline'
//         }
//     },
//     submitButton: {
//         backgroundColor: '#2563eb',
//         color: 'white',
//         padding: '12px 20px',
//         border: 'none',
//         borderRadius: '8px',
//         fontSize: '14px',
//         fontWeight: '600',
//         cursor: 'pointer',
//         transition: 'background-color 0.2s',
//         ':hover': {
//             backgroundColor: '#1d4ed8'
//         }
//     },
//     submitButtonDisabled: {
//         opacity: '0.5',
//         cursor: 'not-allowed',
//         ':hover': {
//             backgroundColor: '#2563eb'
//         }
//     },
//     footer: {
//         textAlign: 'center',
//         paddingTop: '20px',
//         borderTop: '1px solid #e5e7eb',
//         marginTop: '20px'
//     },
//     footerText: {
//         fontSize: '14px',
//         color: '#6b7280',
//         margin: '0'
//     },
//     footerLink: {
//         color: '#2563eb',
//         fontWeight: '500',
//         textDecoration: 'none',
//         ':hover': {
//             textDecoration: 'underline'
//         }
//     }
// };

// export default AdminLogin;

import React, { useState } from 'react';

const AdminLogin = ({ onLogin, showRegisterLink = true }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8000';

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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
                credentials: 'include' // Pour les cookies HTTP-only
            });

            const data = await response.json();

            if (response.ok) {
                // Stocker le token dans le localStorage
                localStorage.setItem('admin_token', data.access_token);
                localStorage.setItem('admin_user', JSON.stringify(data.user));

                if (onLogin) {
                    onLogin(data.user);
                } else {
                    window.location.href = '/admin/dashboard';
                }
            } else {
                setErrors({ submit: data.detail || 'Erreur de connexion' });
            }
        } catch {
            setErrors({ submit: 'Erreur de connexion. Veuillez réessayer.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            setErrors({ reset: 'Veuillez entrer votre email' });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: resetEmail })
            });

            if (response.ok) {
                alert('Un email de réinitialisation a été envoyé !');
                setShowForgotPassword(false);
                setResetEmail('');
            } else {
                const data = await response.json();
                setErrors({ reset: data.detail || 'Erreur lors de l\'envoi de l\'email' });
            }
        } catch {
            setErrors({ reset: 'Erreur lors de l\'envoi de l\'email' });
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
                    <h2 style={styles.title}>Connexion Administrateur</h2>
                    <p style={styles.subtitle}>Accédez à votre espace d'administration</p>
                </div>

                {!showForgotPassword ? (
                    <form style={styles.form} onSubmit={handleLogin}>
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

                        <div style={styles.options}>
                            <label style={styles.checkboxLabel}>
                                <input type="checkbox" style={styles.checkbox} />
                                Se souvenir de moi
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                style={styles.linkButton}
                            >
                                Mot de passe oublié ?
                            </button>
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

                        {showRegisterLink && (
                            <div style={styles.footer}>
                                <p style={styles.footerText}>
                                    Pas encore de compte ?{' '}
                                    <a href="/AdminR" style={styles.footerLink}>
                                        Créer un compte administrateur
                                    </a>
                                </p>
                            </div>
                        )}
                    </form>
                ) : (
                    <form style={styles.form} onSubmit={handlePasswordReset}>
                        <div style={styles.inputGroup}>
                            <h3 style={styles.resetTitle}>Réinitialisation du mot de passe</h3>
                            <p style={styles.resetText}>
                                Entrez votre adresse email pour recevoir un lien de réinitialisation
                            </p>

                            <label htmlFor="reset-email" style={styles.label}>Email</label>
                            <input
                                id="reset-email"
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                style={styles.input}
                                placeholder="votre@email.com"
                            />

                            {errors.reset && <p style={styles.errorText}>{errors.reset}</p>}
                        </div>

                        <div style={styles.buttonGroup}>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(false)}
                                style={styles.secondaryButton}
                            >
                                Retour
                            </button>
                            <button
                                type="submit"
                                style={styles.submitButton}
                            >
                                Envoyer le lien de réinitialisation
                            </button>
                        </div>
                    </form>
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
        paddingTop: '8px',
        paddingBottom: '8px',
        fontFamily: "'Inter', sans-serif"
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px'
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
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#2563eb',
        textDecoration: 'none',
        fontWeight: '500',
        cursor: 'pointer',
        fontSize: '14px',
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
    buttonGroup: {
        display: 'flex',
        gap: '12px'
    },
    secondaryButton: {
        backgroundColor: '#6b7280',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        flex: 1,
        ':hover': {
            backgroundColor: '#4b5563'
        }
    },
    resetTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1f2937',
        margin: '0 0 8px'
    },
    resetText: {
        fontSize: '14px',
        color: '#6b7280',
        margin: '0 0 16px'
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

export default AdminLogin;