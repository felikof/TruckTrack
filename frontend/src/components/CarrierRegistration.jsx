import { useState } from 'react'

const CarrierRegistration = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        registrationNumber: '',
        taxId: '',
        companyType: 'Private',
        establishedYear: '',
        phoneNumber: '',
        email: '',
        website: '',
        address: '',
        city: '',
        postalCode: '',
        contactPersonName: '',
        contactPersonTitle: '',
        contactPersonPhone: '',
        contactPersonEmail: '',
        fleetSize: '',
        operatingLicense: '',
        licenseExpiry: '',
        insuranceProvider: '',
        insurancePolicyNumber: '',
        insuranceExpiry: '',
        servicesOffered: [],
        operatingRoutes: [],
        certifications: []
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            if (['servicesOffered', 'operatingRoutes', 'certifications'].includes(name)) {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                        ? [...prev[name], value]
                        : prev[name].filter(item => item !== value)
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

        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required'
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!formData.contactPersonName.trim()) newErrors.contactPersonName = 'Contact person name is required'
        if (!formData.operatingLicense.trim()) newErrors.operatingLicense = 'Operating license is required'

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (formData.contactPersonEmail && !emailRegex.test(formData.contactPersonEmail)) {
            newErrors.contactPersonEmail = 'Please enter a valid email address'
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
                console.log('Carrier registration data:', formData)
                alert('Carrier registered successfully!')
            }
        }
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        } else {
            if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
                setFormData({
                    companyName: '',
                    registrationNumber: '',
                    taxId: '',
                    companyType: 'Private',
                    establishedYear: '',
                    phoneNumber: '',
                    email: '',
                    website: '',
                    address: '',
                    city: '',
                    postalCode: '',
                    contactPersonName: '',
                    contactPersonTitle: '',
                    contactPersonPhone: '',
                    contactPersonEmail: '',
                    fleetSize: '',
                    operatingLicense: '',
                    licenseExpiry: '',
                    insuranceProvider: '',
                    insurancePolicyNumber: '',
                    insuranceExpiry: '',
                    servicesOffered: [],
                    operatingRoutes: [],
                    certifications: []
                })
                setErrors({})
            }
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Enregistrement du Transporteur</h2>
                <p style={styles.subtitle}>Enregistrez une nouvelle société de transport pour les opérations portuaires</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations sur la société</h3>
                    <div style={styles.grid}>
                        <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                            <label htmlFor="companyName" style={styles.label}>Nom de la société *</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.companyName ? styles.inputError : {}) }}
                                placeholder="Entrez le nom de la société"
                            />
                            {errors.companyName && <span style={styles.errorMessage}>{errors.companyName}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="registrationNumber" style={styles.label}>Numéro d'enregistrement *</label>
                            <input
                                type="text"
                                id="registrationNumber"
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.registrationNumber ? styles.inputError : {}) }}
                                placeholder="Numéro d'enregistrement de la société"
                            />
                            {errors.registrationNumber && <span style={styles.errorMessage}>{errors.registrationNumber}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="taxId" style={styles.label}>Identifiant fiscal</label>
                            <input
                                type="text"
                                id="taxId"
                                name="taxId"
                                value={formData.taxId}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Numéro d'identification fiscale"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="companyType" style={styles.label}>Type de société</label>
                            <select
                                id="companyType"
                                name="companyType"
                                value={formData.companyType}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="Private">Société privée</option>
                                <option value="Public">Société publique</option>
                                <option value="Partnership">Partenariat</option>
                                <option value="Sole Proprietorship">Entreprise individuelle</option>
                                <option value="Cooperative">Coopérative</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="establishedYear" style={styles.label}>Année de création</label>
                            <input
                                type="number"
                                id="establishedYear"
                                name="establishedYear"
                                value={formData.establishedYear}
                                onChange={handleChange}
                                style={styles.input}
                                min="1900"
                                max={new Date().getFullYear()}
                                placeholder="AAAA"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations de contact</h3>
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
                            <label htmlFor="email" style={styles.label}>Adresse e-mail *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                                placeholder="societe@exemple.com"
                            />
                            {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
                        </div>

                        <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                            <label htmlFor="website" style={styles.label}>Site web</label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="https://www.societe.com"
                            />
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
                                placeholder="Adresse postale"
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
                                <option value="">Sélectionnez une ville</option>
                                <option value="Lomé">Lomé</option>
                                <option value="Kara">Kara</option>
                                <option value="Sokodé">Sokodé</option>
                                <option value="Kpalimé">Kpalimé</option>
                                <option value="Atakpamé">Atakpamé</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="postalCode" style={styles.label}>Code postal</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Code postal"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Personne de contact principale</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="contactPersonName" style={styles.label}>Nom de la personne de contact *</label>
                            <input
                                type="text"
                                id="contactPersonName"
                                name="contactPersonName"
                                value={formData.contactPersonName}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.contactPersonName ? styles.inputError : {}) }}
                                placeholder="Nom complet"
                            />
                            {errors.contactPersonName && <span style={styles.errorMessage}>{errors.contactPersonName}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="contactPersonTitle" style={styles.label}>Titre/Poste</label>
                            <input
                                type="text"
                                id="contactPersonTitle"
                                name="contactPersonTitle"
                                value={formData.contactPersonTitle}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="ex : Directeur général"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="contactPersonPhone" style={styles.label}>Téléphone du contact</label>
                            <input
                                type="tel"
                                id="contactPersonPhone"
                                name="contactPersonPhone"
                                value={formData.contactPersonPhone}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="contactPersonEmail" style={styles.label}>E-mail du contact</label>
                            <input
                                type="email"
                                id="contactPersonEmail"
                                name="contactPersonEmail"
                                value={formData.contactPersonEmail}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.contactPersonEmail ? styles.inputError : {}) }}
                                placeholder="contact@societe.com"
                            />
                            {errors.contactPersonEmail && <span style={styles.errorMessage}>{errors.contactPersonEmail}</span>}
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations sur les opérations</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="fleetSize" style={styles.label}>Taille de la flotte</label>
                            <select
                                id="fleetSize"
                                name="fleetSize"
                                value={formData.fleetSize}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="">Sélectionnez la taille de la flotte</option>
                                <option value="1-5">1-5 véhicules</option>
                                <option value="6-10">6-10 véhicules</option>
                                <option value="11-25">11-25 véhicules</option>
                                <option value="26-50">26-50 véhicules</option>
                                <option value="51-100">51-100 véhicules</option>
                                <option value="100+">100+ véhicules</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="operatingLicense" style={styles.label}>Numéro de licence d'exploitation *</label>
                            <input
                                type="text"
                                id="operatingLicense"
                                name="operatingLicense"
                                value={formData.operatingLicense}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.operatingLicense ? styles.inputError : {}) }}
                                placeholder="Numéro de licence"
                            />
                            {errors.operatingLicense && <span style={styles.errorMessage}>{errors.operatingLicense}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="licenseExpiry" style={styles.label}>Date d'expiration de la licence</label>
                            <input
                                type="date"
                                id="licenseExpiry"
                                name="licenseExpiry"
                                value={formData.licenseExpiry}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations sur l'assurance</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="insuranceProvider" style={styles.label}>Compagnie d'assurance</label>
                            <input
                                type="text"
                                id="insuranceProvider"
                                name="insuranceProvider"
                                value={formData.insuranceProvider}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Nom de la compagnie d'assurance"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="insurancePolicyNumber" style={styles.label}>Numéro de police</label>
                            <input
                                type="text"
                                id="insurancePolicyNumber"
                                name="insurancePolicyNumber"
                                value={formData.insurancePolicyNumber}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Numéro de police"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="insuranceExpiry" style={styles.label}>Date d'expiration de l'assurance</label>
                            <input
                                type="date"
                                id="insuranceExpiry"
                                name="insuranceExpiry"
                                value={formData.insuranceExpiry}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Services proposés</h3>
                    <div style={styles.checkboxGrid}>
                        {[
                            'Transport de conteneurs',
                            'Marchandises en vrac',
                            'Marchandises générales',
                            'Matériaux dangereux',
                            'Transport réfrigéré',
                            'Machines lourdes',
                            'Transport de liquides',
                            'Transport de bétail'
                        ].map(service => (
                            <label key={service} style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="servicesOffered"
                                    value={service}
                                    checked={formData.servicesOffered.includes(service)}
                                    onChange={handleChange}
                                    style={styles.checkbox}
                                />
                                <span style={styles.checkboxText}>{service}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Itinéraires d'exploitation</h3>
                    <div style={styles.checkboxGrid}>
                        {[
                            'Port de Lomé - Burkina Faso',
                            'Port de Lomé - Mali',
                            'Port de Lomé - Niger',
                            'Port de Lomé - Ghana',
                            'Itinéraires nationaux',
                            'Région Afrique de l’Ouest',
                            'Itinéraires internationaux'
                        ].map(route => (
                            <label key={route} style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="operatingRoutes"
                                    value={route}
                                    checked={formData.operatingRoutes.includes(route)}
                                    onChange={handleChange}
                                    style={styles.checkbox}
                                />
                                <span style={styles.checkboxText}>{route}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={styles.actions}>
                    <button type="button" onClick={handleCancel} style={styles.cancelButton}>
                        Annuler
                    </button>
                    <button type="submit" style={styles.submitButton}>
                        Enregistrer le transporteur
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

export default CarrierRegistration