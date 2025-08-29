import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        mot_de_passe: ''
    });
    const navigate = useNavigate();
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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'L\'email est requis';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
        if (!formData.mot_de_passe) newErrors.mot_de_passe = 'Le mot de passe est requis';
        else if (formData.mot_de_passe.length < 6) newErrors.mot_de_passe = 'Le mot de passe doit contenir au moins 6 caractères';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/admins/connexion", {
                email: formData.email,
                mot_de_passe: formData.mot_de_passe
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Connexion réussie :", response.data);
            
            // Stocker le token si présent dans la réponse
            if (response.data.access_token) {
                localStorage.setItem('admin_token', response.data.access_token);
                localStorage.setItem('admin_user', JSON.stringify(response.data.user));
            }
            
            alert("Connexion réussie !");
            navigate("/Dashboard");
        } catch (error) {
            console.error("Erreur de connexion :", error);
            
            // Gestion des erreurs spécifiques
            if (error.response?.status === 422) {
                // Erreurs de validation du serveur
                handleServerErrors(error.response.data);
            } else if (error.response?.status === 401) {
                setErrors({ submit: 'Email ou mot de passe incorrect' });
            } else if (error.response?.status === 404) {
                setErrors({ submit: 'Utilisateur non trouvé' });
            } else {
                setErrors({ submit: 'Erreur lors de la connexion. Veuillez réessayer.' });
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
                newErrors[fieldName] = error.msg;
            });
        }
        // Autre format possible
        else if (typeof errorData.detail === 'string') {
            newErrors.submit = errorData.detail;
        }
        // Format de secours
        else {
            newErrors.submit = 'Erreur de validation des données';
        }

        setErrors(newErrors);
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

                {errors.submit && (
                    <div style={styles.errorAlert}>
                        {errors.submit}
                    </div>
                )}

                <form style={styles.form} onSubmit={handleSubmit}>
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
                        <label htmlFor="mot_de_passe" style={styles.label}>Mot de passe</label>
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
                            <a href="/AdminR" style={styles.footerLink}>
                                Créer un compte administrateur
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
        color: '#2563eb',
        fontWeight: '500',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline'
        }
    }
};

export default AdminLogin;

// import React, { useState } from 'react';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState({
//         email: '',
//         mot_de_passe: '',
//         verificationCode: ''
//     });
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSendingCode, setIsSendingCode] = useState(false);

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

//     const validateStep1 = () => {
//         const newErrors = {};
//         if (!formData.email) newErrors.email = 'L\'email est requis';
//         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
//         if (!formData.mot_de_passe) newErrors.mot_de_passe = 'Le mot de passe est requis';
//         else if (formData.mot_de_passe.length < 6) newErrors.mot_de_passe = 'Le mot de passe doit contenir au moins 6 caractères';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const validateStep2 = () => {
//         const newErrors = {};
//         if (!formData.verificationCode) newErrors.verificationCode = 'Le code de vérification est requis';
//         else if (!/^\d{6}$/.test(formData.verificationCode)) newErrors.verificationCode = 'Le code doit contenir 6 chiffres';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleStep1Submit = async (e) => {
//         e.preventDefault();
//         if (!validateStep1()) return;
//         setIsLoading(true);

//         try {
//             // Première étape : Vérifier les credentials et demander l'envoi du code
//             const response = await axios.post("http://localhost:8000/admins/connexion/init", {
//                 email: formData.email,
//                 mot_de_passe: formData.mot_de_passe
//             }, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });

//             console.log("Code envoyé :", response.data);
//             setCurrentStep(2);
            
//         } catch (error) {
//             console.error("Erreur de connexion :", error);
            
//             if (error.response?.status === 422) {
//                 handleServerErrors(error.response.data);
//             } else if (error.response?.status === 401) {
//                 setErrors({ submit: 'Email ou mot de passe incorrect' });
//             } else if (error.response?.status === 404) {
//                 setErrors({ submit: 'Utilisateur non trouvé' });
//             } else {
//                 setErrors({ submit: 'Erreur lors de la connexion. Veuillez réessayer.' });
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleStep2Submit = async (e) => {
//         e.preventDefault();
//         if (!validateStep2()) return;
//         setIsLoading(true);

//         try {
//             // Deuxième étape : Vérifier le code de validation
//             const response = await axios.post("http://localhost:8000/admins/connexion/verify", {
//                 email: formData.email,
//                 code: formData.verificationCode
//             }, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });

//             console.log("Connexion réussie :", response.data);
            
//             // Stocker le token si présent dans la réponse
//             if (response.data.access_token) {
//                 localStorage.setItem('admin_token', response.data.access_token);
//                 localStorage.setItem('admin_user', JSON.stringify(response.data.user));
//             }
            
//             alert("Connexion réussie !");
//             navigate("/Landing");
            
//         } catch (error) {
//             console.error("Erreur de vérification :", error);
            
//             if (error.response?.status === 422) {
//                 handleServerErrors(error.response.data);
//             } else if (error.response?.status === 401) {
//                 setErrors({ verificationCode: 'Code de vérification incorrect' });
//             } else if (error.response?.status === 410) {
//                 setErrors({ verificationCode: 'Code expiré. Veuillez en demander un nouveau.' });
//             } else {
//                 setErrors({ submit: 'Erreur lors de la vérification. Veuillez réessayer.' });
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleResendCode = async () => {
//         setIsSendingCode(true);
//         try {
//             await axios.post("http://localhost:8000/admins/connexion/resend-code", {
//                 email: formData.email
//             });
//             alert("Nouveau code envoyé à votre email !");
//         } catch (error) {
//             console.error("Erreur lors de l'envoi du code :", error);
//             setErrors({ submit: 'Erreur lors de l\'envoi du code. Veuillez réessayer.' });
//         } finally {
//             setIsSendingCode(false);
//         }
//     };

//     const handleBackToStep1 = () => {
//         setCurrentStep(1);
//         setErrors({});
//         setFormData(prev => ({ ...prev, verificationCode: '' }));
//     };

//     const handleServerErrors = (errorData) => {
//         const newErrors = {};
        
//         if (errorData.detail && Array.isArray(errorData.detail)) {
//             errorData.detail.forEach(error => {
//                 const fieldName = error.loc[error.loc.length - 1];
//                 newErrors[fieldName] = error.msg;
//             });
//         } else if (typeof errorData.detail === 'string') {
//             newErrors.submit = errorData.detail;
//         } else {
//             newErrors.submit = 'Erreur de validation des données';
//         }

//         setErrors(newErrors);
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.card}>
//                 {/* Indicateur d'étapes */}
//                 <div style={styles.steps}>
//                     <div style={{
//                         ...styles.step,
//                         ...(currentStep === 1 ? styles.stepActive : styles.stepCompleted)
//                     }}>
//                         <div style={styles.stepNumber}>1</div>
//                         <span style={styles.stepLabel}>Connexion</span>
//                     </div>
//                     <div style={styles.stepLine}></div>
//                     <div style={{
//                         ...styles.step,
//                         ...(currentStep === 2 ? styles.stepActive : {})
//                     }}>
//                         <div style={styles.stepNumber}>2</div>
//                         <span style={styles.stepLabel}>Vérification</span>
//                     </div>
//                 </div>

//                 <div style={styles.header}>
//                     <div style={styles.logo}>
//                         <svg style={styles.logoSvg} viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                         </svg>
//                     </div>
//                     <h2 style={styles.title}>
//                         {currentStep === 1 ? 'Connexion Administrateur' : 'Vérification en 2 étapes'}
//                     </h2>
//                     <p style={styles.subtitle}>
//                         {currentStep === 1 
//                             ? 'Accédez à votre espace d\'administration' 
//                             : 'Entrez le code envoyé à votre email'
//                         }
//                     </p>
//                 </div>

//                 {errors.submit && (
//                     <div style={styles.errorAlert}>
//                         {errors.submit}
//                     </div>
//                 )}

//                 {currentStep === 1 ? (
//                     <form style={styles.form} onSubmit={handleStep1Submit}>
//                         <div style={styles.inputGroup}>
//                             <label htmlFor="email" style={styles.label}>Adresse email</label>
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 style={{
//                                     ...styles.input,
//                                     ...(errors.email && styles.inputError)
//                                 }}
//                                 placeholder="admin@example.com"
//                             />
//                             {errors.email && <p style={styles.errorText}>{errors.email}</p>}
//                         </div>

//                         <div style={styles.inputGroup}>
//                             <label htmlFor="mot_de_passe" style={styles.label}>Mot de passe</label>
//                             <input
//                                 id="mot_de_passe"
//                                 name="mot_de_passe"
//                                 type="password"
//                                 value={formData.mot_de_passe}
//                                 onChange={handleChange}
//                                 style={{
//                                     ...styles.input,
//                                     ...(errors.mot_de_passe && styles.inputError)
//                                 }}
//                                 placeholder="••••••••"
//                             />
//                             {errors.mot_de_passe && <p style={styles.errorText}>{errors.mot_de_passe}</p>}
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             style={{
//                                 ...styles.submitButton,
//                                 ...(isLoading && styles.submitButtonDisabled)
//                             }}
//                         >
//                             {isLoading ? 'Vérification...' : 'Se connecter'}
//                         </button>

//                         <div style={styles.footer}>
//                             <p style={styles.footerText}>
//                                 Pas encore de compte ?{' '}
//                                 <a href="/AdminR" style={styles.footerLink}>
//                                     Créer un compte administrateur
//                                 </a>
//                             </p>
//                         </div>
//                     </form>
//                 ) : (
//                     <form style={styles.form} onSubmit={handleStep2Submit}>
//                         <div style={styles.inputGroup}>
//                             <label style={styles.label}>Code de vérification</label>
//                             <p style={styles.helperText}>
//                                 Entrez le code à 6 chiffres envoyé à {formData.email}
//                             </p>
//                             <input
//                                 id="verificationCode"
//                                 name="verificationCode"
//                                 type="text"
//                                 value={formData.verificationCode}
//                                 onChange={handleChange}
//                                 style={{
//                                     ...styles.input,
//                                     ...styles.confirmationInput,
//                                     ...(errors.verificationCode && styles.inputError)
//                                 }}
//                                 placeholder="123456"
//                                 maxLength="6"
//                             />
//                             {errors.verificationCode && (
//                                 <p style={styles.errorText}>{errors.verificationCode}</p>
//                             )}
                            
//                             <button
//                                 type="button"
//                                 onClick={handleResendCode}
//                                 disabled={isSendingCode}
//                                 style={styles.resendButton}
//                             >
//                                 {isSendingCode ? 'Envoi...' : 'Renvoyer le code'}
//                             </button>
//                         </div>

//                         <div style={styles.buttonGroup}>
//                             <button
//                                 type="button"
//                                 onClick={handleBackToStep1}
//                                 style={styles.backButton}
//                             >
//                                 Retour
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={isLoading}
//                                 style={{
//                                     ...styles.submitButton,
//                                     ...(isLoading && styles.submitButtonDisabled)
//                                 }}
//                             >
//                                 {isLoading ? 'Vérification...' : 'Vérifier le code'}
//                             </button>
//                         </div>
//                     </form>
//                 )}
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
//     steps: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: '30px',
//         gap: '8px'
//     },
//     step: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '8px'
//     },
//     stepActive: {
//         color: '#2563eb'
//     },
//     stepCompleted: {
//         color: '#059669'
//     },
//     stepNumber: {
//         width: '32px',
//         height: '32px',
//         borderRadius: '50%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontWeight: '600',
//         fontSize: '14px',
//         border: '2px solid #d1d5db'
//     },
//     stepLabel: {
//         fontSize: '12px',
//         fontWeight: '500'
//     },
//     stepLine: {
//         width: '40px',
//         height: '2px',
//         backgroundColor: '#d1d5db',
//         margin: '0 8px'
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
//     confirmationInput: {
//         textAlign: 'center',
//         fontSize: '18px',
//         fontWeight: '600',
//         letterSpacing: '2px'
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
//     helperText: {
//         fontSize: '12px',
//         color: '#6b7280',
//         margin: '4px 0 0'
//     },
//     buttonGroup: {
//         display: 'flex',
//         gap: '12px'
//     },
//     backButton: {
//         backgroundColor: '#6b7280',
//         color: 'white',
//         padding: '12px 20px',
//         border: 'none',
//         borderRadius: '8px',
//         fontSize: '14px',
//         fontWeight: '600',
//         cursor: 'pointer',
//         flex: 1,
//         ':hover': {
//             backgroundColor: '#4b5563'
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
//         flex: 2,
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
//     resendButton: {
//         backgroundColor: 'transparent',
//         color: '#2563eb',
//         border: 'none',
//         fontSize: '12px',
//         cursor: 'pointer',
//         alignSelf: 'flex-start',
//         padding: '4px 0',
//         ':hover': {
//             textDecoration: 'underline'
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

{/* <form style={styles.form}>
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
</form> */}