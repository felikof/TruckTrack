import { useState } from 'react'

const DriverRegistration = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationalId: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        licenseNumber: '',
        licenseType: 'Class C',
        licenseExpiry: '',
        emergencyContact: '',
        emergencyPhone: '',
        experience: '',
        languages: []
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            if (name === 'languages') {
                setFormData(prev => ({
                    ...prev,
                    languages: checked
                        ? [...prev.languages, value]
                        : prev.languages.filter(lang => lang !== value)
                }))
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.nationalId.trim()) newErrors.nationalId = 'National ID is required'
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required'
        if (!formData.licenseExpiry) newErrors.licenseExpiry = 'License expiry date is required'

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Phone validation (basic)
        const phoneRegex = /^[+]?[0-9\s\-\d()]{8,20}$/
        if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            if (onSubmit) {
                onSubmit(formData)
            } else {
                console.log('Driver registration data:', formData)
                alert('Driver registered successfully!')
            }
        }
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        } else {
            if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
                setFormData({
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    nationalId: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    city: '',
                    licenseNumber: '',
                    licenseType: 'Class C',
                    licenseExpiry: '',
                    emergencyContact: '',
                    emergencyPhone: '',
                    experience: '',
                    languages: []
                })
                setErrors({})
            }
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Enregistrement du Chauffeur</h2>
                <p style={styles.subtitle}>Enregistrez un nouveau chauffeur pour les opérations portuaires</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations Personnelles</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="firstName" style={styles.label}>Prénom *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.firstName ? styles.inputError : {}) }}
                                placeholder="Entrez le prénom"
                            />
                            {errors.firstName && <span style={styles.errorMessage}>{errors.firstName}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="lastName" style={styles.label}>Nom *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.lastName ? styles.inputError : {}) }}
                                placeholder="Entrez le nom"
                            />
                            {errors.lastName && <span style={styles.errorMessage}>{errors.lastName}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="dateOfBirth" style={styles.label}>Date de naissance</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="nationalId" style={styles.label}>Numéro d'identité nationale *</label>
                            <input
                                type="text"
                                id="nationalId"
                                name="nationalId"
                                value={formData.nationalId}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.nationalId ? styles.inputError : {}) }}
                                placeholder="Entrez le numéro d'identité"
                            />
                            {errors.nationalId && <span style={styles.errorMessage}>{errors.nationalId}</span>}
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations de Contact</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="phoneNumber" style={styles.label}>Numéro de téléphone *</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.phoneNumber ? styles.inputError : {}) }}
                                placeholder="+228 XX XX XX XX"
                            />
                            {errors.phoneNumber && <span style={styles.errorMessage}>{errors.phoneNumber}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="email" style={styles.label}>Adresse Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                                placeholder="chauffeur@exemple.com"
                            />
                            {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
                        </div>

                        <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                            <label htmlFor="address" style={styles.label}>Adresse</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Adresse complète"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="city" style={styles.label}>Ville</label>
                            <select
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="">Sélectionnez la ville</option>
                                <option value="Lomé">Lomé</option>
                                <option value="Kara">Kara</option>
                                <option value="Sokodé">Sokodé</option>
                                <option value="Kpalimé">Kpalimé</option>
                                <option value="Atakpamé">Atakpamé</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations sur le Permis</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="licenseNumber" style={styles.label}>Numéro du permis *</label>
                            <input
                                type="text"
                                id="licenseNumber"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.licenseNumber ? styles.inputError : {}) }}
                                placeholder="Entrez le numéro du permis"
                            />
                            {errors.licenseNumber && <span style={styles.errorMessage}>{errors.licenseNumber}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="licenseType" style={styles.label}>Type de permis</label>
                            <select
                                id="licenseType"
                                name="licenseType"
                                value={formData.licenseType}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="Class C">Classe C - Véhicule standard</option>
                                <option value="Class B">Classe B - Véhicule lourd</option>
                                <option value="Class A">Classe A - Véhicule commercial</option>
                                <option value="CDL">CDL - Permis de conduire commercial</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="licenseExpiry" style={styles.label}>Date d'expiration du permis *</label>
                            <input
                                type="date"
                                id="licenseExpiry"
                                name="licenseExpiry"
                                value={formData.licenseExpiry}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.licenseExpiry ? styles.inputError : {}) }}
                            />
                            {errors.licenseExpiry && <span style={styles.errorMessage}>{errors.licenseExpiry}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="experience" style={styles.label}>Années d'expérience</label>
                            <select
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="">Sélectionnez l'expérience</option>
                                <option value="0-1">0-1 an</option>
                                <option value="2-5">2-5 ans</option>
                                <option value="6-10">6-10 ans</option>
                                <option value="11-15">11-15 ans</option>
                                <option value="15+">15+ ans</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Contact d'Urgence</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="emergencyContact" style={styles.label}>Nom du contact d'urgence</label>
                            <input
                                type="text"
                                id="emergencyContact"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Nom complet"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="emergencyPhone" style={styles.label}>Téléphone du contact d'urgence</label>
                            <input
                                type="tel"
                                id="emergencyPhone"
                                name="emergencyPhone"
                                value={formData.emergencyPhone}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Langues</h3>
                    <div style={styles.checkboxGrid}>
                        {['Français', 'Anglais', 'Ewé', 'Kabyè', 'Tem'].map(language => (
                            <label key={language} style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="languages"
                                    value={language}
                                    checked={formData.languages.includes(language)}
                                    onChange={handleChange}
                                    style={styles.checkbox}
                                />
                                <span style={styles.checkboxText}>{language}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={styles.actions}>
                    <button type="button" onClick={handleCancel} style={styles.cancelButton}>
                        Annuler
                    </button>
                    <button type="submit" style={styles.submitButton}>
                        Enregistrer le Chauffeur
                    </button>
                </div>
            </form>
        </div>
    )
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '2px solid #f1f5f9'
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '8px'
    },
    subtitle: {
        fontSize: '16px',
        color: '#6b7280'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '4px',
        paddingBottom: '8px',
        borderBottom: '1px solid #e5e7eb'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151'
    },
    input: {
        padding: '12px 16px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: '#ffffff'
    },
    select: {
        padding: '12px 16px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: '#ffffff'
    },
    inputError: {
        borderColor: '#ef4444'
    },
    errorMessage: {
        fontSize: '12px',
        color: '#ef4444',
        marginTop: '4px'
    },
    checkboxGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginTop: '8px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '8px',
        transition: 'background 0.2s ease'
    },
    checkbox: {
        width: '16px',
        height: '16px',
        margin: '0'
    },
    checkboxText: {
        fontSize: '14px',
        color: '#374151'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '16px',
        paddingTop: '24px',
        borderTop: '2px solid #f1f5f9'
    },
    cancelButton: {
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '2px solid #d1d5db',
        backgroundColor: '#ffffff',
        color: '#6b7280'
    },
    submitButton: {
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '2px solid #3b82f6',
        backgroundColor: '#3b82f6',
        color: '#ffffff'
    }
}

export default DriverRegistration