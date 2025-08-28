// import { useState } from 'react'

// const CarrierRegistration = ({ onSubmit, onCancel }) => {
//     const [formData, setFormData] = useState({
//         companyName: '',
//         registrationNumber: '',
//         taxId: '',
//         companyType: 'Private',
//         establishedYear: '',
//         phoneNumber: '',
//         email: '',
//         website: '',
//         address: '',
//         city: '',
//         postalCode: '',
//         contactPersonName: '',
//         contactPersonTitle: '',
//         contactPersonPhone: '',
//         contactPersonEmail: '',
//         fleetSize: '',
//         operatingLicense: '',
//         licenseExpiry: '',
//         insuranceProvider: '',
//         insurancePolicyNumber: '',
//         insuranceExpiry: '',
//         servicesOffered: [],
//         operatingRoutes: [],
//         certifications: []
//     })

//     const [errors, setErrors] = useState({})

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target

//         if (type === 'checkbox') {
//             if (['servicesOffered', 'operatingRoutes', 'certifications'].includes(name)) {
//                 setFormData(prev => ({
//                     ...prev,
//                     [name]: checked
//                         ? [...prev[name], value]
//                         : prev[name].filter(item => item !== value)
//                 }))
//             }
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }))
//         }
//     }

//     const validateForm = () => {
//         const newErrors = {}

//         if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
//         if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required'
//         if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
//         if (!formData.email.trim()) newErrors.email = 'Email is required'
//         if (!formData.contactPersonName.trim()) newErrors.contactPersonName = 'Contact person name is required'
//         if (!formData.operatingLicense.trim()) newErrors.operatingLicense = 'Operating license is required'

//         // Email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//         if (formData.email && !emailRegex.test(formData.email)) {
//             newErrors.email = 'Please enter a valid email address'
//         }

//         if (formData.contactPersonEmail && !emailRegex.test(formData.contactPersonEmail)) {
//             newErrors.contactPersonEmail = 'Please enter a valid email address'
//         }

//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if (validateForm()) {
//             if (onSubmit) {
//                 onSubmit(formData)
//             } else {
//                 console.log('Carrier registration data:', formData)
//                 alert('Carrier registered successfully!')
//             }
//         }
//     }

//     const handleCancel = () => {
//         if (onCancel) {
//             onCancel()
//         } else {
//             if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
//                 setFormData({
//                     companyName: '',
//                     registrationNumber: '',
//                     taxId: '',
//                     companyType: 'Private',
//                     establishedYear: '',
//                     phoneNumber: '',
//                     email: '',
//                     website: '',
//                     address: '',
//                     city: '',
//                     postalCode: '',
//                     contactPersonName: '',
//                     contactPersonTitle: '',
//                     contactPersonPhone: '',
//                     contactPersonEmail: '',
//                     fleetSize: '',
//                     operatingLicense: '',
//                     licenseExpiry: '',
//                     insuranceProvider: '',
//                     insurancePolicyNumber: '',
//                     insuranceExpiry: '',
//                     servicesOffered: [],
//                     operatingRoutes: [],
//                     certifications: []
//                 })
//                 setErrors({})
//             }
//         }
//     }

//     return (
//         <div style={styles.container}>
//             <div style={styles.header}>
//                 <h2 style={styles.title}>Enregistrement du Transporteur</h2>
//                 <p style={styles.subtitle}>Enregistrez une nouvelle société de transport pour les opérations portuaires</p>
//             </div>

//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Informations sur la société</h3>
//                     <div style={styles.grid}>
//                         <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
//                             <label htmlFor="companyName" style={styles.label}>Nom de la société *</label>
//                             <input
//                                 type="text"
//                                 id="companyName"
//                                 name="companyName"
//                                 value={formData.companyName}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.companyName ? styles.inputError : {}) }}
//                                 placeholder="Entrez le nom de la société"
//                             />
//                             {errors.companyName && <span style={styles.errorMessage}>{errors.companyName}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="registrationNumber" style={styles.label}>Numéro d'enregistrement *</label>
//                             <input
//                                 type="text"
//                                 id="registrationNumber"
//                                 name="registrationNumber"
//                                 value={formData.registrationNumber}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.registrationNumber ? styles.inputError : {}) }}
//                                 placeholder="Numéro d'enregistrement de la société"
//                             />
//                             {errors.registrationNumber && <span style={styles.errorMessage}>{errors.registrationNumber}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="taxId" style={styles.label}>Identifiant fiscal</label>
//                             <input
//                                 type="text"
//                                 id="taxId"
//                                 name="taxId"
//                                 value={formData.taxId}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Numéro d'identification fiscale"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="companyType" style={styles.label}>Type de société</label>
//                             <select
//                                 id="companyType"
//                                 name="companyType"
//                                 value={formData.companyType}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="Private">Société privée</option>
//                                 <option value="Public">Société publique</option>
//                                 <option value="Partnership">Partenariat</option>
//                                 <option value="Sole Proprietorship">Entreprise individuelle</option>
//                                 <option value="Cooperative">Coopérative</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="establishedYear" style={styles.label}>Année de création</label>
//                             <input
//                                 type="number"
//                                 id="establishedYear"
//                                 name="establishedYear"
//                                 value={formData.establishedYear}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 min="1900"
//                                 max={new Date().getFullYear()}
//                                 placeholder="AAAA"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Informations de contact</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="phoneNumber" style={styles.label}>Numéro de téléphone *</label>
//                             <input
//                                 type="tel"
//                                 id="phoneNumber"
//                                 name="phoneNumber"
//                                 value={formData.phoneNumber}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.phoneNumber ? styles.inputError : {}) }}
//                                 placeholder="+228 XX XX XX XX"
//                             />
//                             {errors.phoneNumber && <span style={styles.errorMessage}>{errors.phoneNumber}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="email" style={styles.label}>Adresse e-mail *</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
//                                 placeholder="societe@exemple.com"
//                             />
//                             {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
//                         </div>

//                         <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
//                             <label htmlFor="website" style={styles.label}>Site web</label>
//                             <input
//                                 type="url"
//                                 id="website"
//                                 name="website"
//                                 value={formData.website}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="https://www.societe.com"
//                             />
//                         </div>

//                         <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
//                             <label htmlFor="address" style={styles.label}>Adresse</label>
//                             <input
//                                 type="text"
//                                 id="address"
//                                 name="address"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Adresse postale"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="city" style={styles.label}>Ville</label>
//                             <select
//                                 id="city"
//                                 name="city"
//                                 value={formData.city}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="">Sélectionnez une ville</option>
//                                 <option value="Lomé">Lomé</option>
//                                 <option value="Kara">Kara</option>
//                                 <option value="Sokodé">Sokodé</option>
//                                 <option value="Kpalimé">Kpalimé</option>
//                                 <option value="Atakpamé">Atakpamé</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="postalCode" style={styles.label}>Code postal</label>
//                             <input
//                                 type="text"
//                                 id="postalCode"
//                                 name="postalCode"
//                                 value={formData.postalCode}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Code postal"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Personne de contact principale</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="contactPersonName" style={styles.label}>Nom de la personne de contact *</label>
//                             <input
//                                 type="text"
//                                 id="contactPersonName"
//                                 name="contactPersonName"
//                                 value={formData.contactPersonName}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.contactPersonName ? styles.inputError : {}) }}
//                                 placeholder="Nom complet"
//                             />
//                             {errors.contactPersonName && <span style={styles.errorMessage}>{errors.contactPersonName}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="contactPersonTitle" style={styles.label}>Titre/Poste</label>
//                             <input
//                                 type="text"
//                                 id="contactPersonTitle"
//                                 name="contactPersonTitle"
//                                 value={formData.contactPersonTitle}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="ex : Directeur général"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="contactPersonPhone" style={styles.label}>Téléphone du contact</label>
//                             <input
//                                 type="tel"
//                                 id="contactPersonPhone"
//                                 name="contactPersonPhone"
//                                 value={formData.contactPersonPhone}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="+228 XX XX XX XX"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="contactPersonEmail" style={styles.label}>E-mail du contact</label>
//                             <input
//                                 type="email"
//                                 id="contactPersonEmail"
//                                 name="contactPersonEmail"
//                                 value={formData.contactPersonEmail}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.contactPersonEmail ? styles.inputError : {}) }}
//                                 placeholder="contact@societe.com"
//                             />
//                             {errors.contactPersonEmail && <span style={styles.errorMessage}>{errors.contactPersonEmail}</span>}
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Informations sur les opérations</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="fleetSize" style={styles.label}>Taille de la flotte</label>
//                             <select
//                                 id="fleetSize"
//                                 name="fleetSize"
//                                 value={formData.fleetSize}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="">Sélectionnez la taille de la flotte</option>
//                                 <option value="1-5">1-5 véhicules</option>
//                                 <option value="6-10">6-10 véhicules</option>
//                                 <option value="11-25">11-25 véhicules</option>
//                                 <option value="26-50">26-50 véhicules</option>
//                                 <option value="51-100">51-100 véhicules</option>
//                                 <option value="100+">100+ véhicules</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="operatingLicense" style={styles.label}>Numéro de licence d'exploitation *</label>
//                             <input
//                                 type="text"
//                                 id="operatingLicense"
//                                 name="operatingLicense"
//                                 value={formData.operatingLicense}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.operatingLicense ? styles.inputError : {}) }}
//                                 placeholder="Numéro de licence"
//                             />
//                             {errors.operatingLicense && <span style={styles.errorMessage}>{errors.operatingLicense}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="licenseExpiry" style={styles.label}>Date d'expiration de la licence</label>
//                             <input
//                                 type="date"
//                                 id="licenseExpiry"
//                                 name="licenseExpiry"
//                                 value={formData.licenseExpiry}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Informations sur l'assurance</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="insuranceProvider" style={styles.label}>Compagnie d'assurance</label>
//                             <input
//                                 type="text"
//                                 id="insuranceProvider"
//                                 name="insuranceProvider"
//                                 value={formData.insuranceProvider}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Nom de la compagnie d'assurance"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="insurancePolicyNumber" style={styles.label}>Numéro de police</label>
//                             <input
//                                 type="text"
//                                 id="insurancePolicyNumber"
//                                 name="insurancePolicyNumber"
//                                 value={formData.insurancePolicyNumber}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Numéro de police"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="insuranceExpiry" style={styles.label}>Date d'expiration de l'assurance</label>
//                             <input
//                                 type="date"
//                                 id="insuranceExpiry"
//                                 name="insuranceExpiry"
//                                 value={formData.insuranceExpiry}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Services proposés</h3>
//                     <div style={styles.checkboxGrid}>
//                         {[
//                             'Transport de conteneurs',
//                             'Marchandises en vrac',
//                             'Marchandises générales',
//                             'Matériaux dangereux',
//                             'Transport réfrigéré',
//                             'Machines lourdes',
//                             'Transport de liquides',
//                             'Transport de bétail'
//                         ].map(service => (
//                             <label key={service} style={styles.checkboxLabel}>
//                                 <input
//                                     type="checkbox"
//                                     name="servicesOffered"
//                                     value={service}
//                                     checked={formData.servicesOffered.includes(service)}
//                                     onChange={handleChange}
//                                     style={styles.checkbox}
//                                 />
//                                 <span style={styles.checkboxText}>{service}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Itinéraires d'exploitation</h3>
//                     <div style={styles.checkboxGrid}>
//                         {[
//                             'Port de Lomé - Burkina Faso',
//                             'Port de Lomé - Mali',
//                             'Port de Lomé - Niger',
//                             'Port de Lomé - Ghana',
//                             'Itinéraires nationaux',
//                             'Région Afrique de l’Ouest',
//                             'Itinéraires internationaux'
//                         ].map(route => (
//                             <label key={route} style={styles.checkboxLabel}>
//                                 <input
//                                     type="checkbox"
//                                     name="operatingRoutes"
//                                     value={route}
//                                     checked={formData.operatingRoutes.includes(route)}
//                                     onChange={handleChange}
//                                     style={styles.checkbox}
//                                 />
//                                 <span style={styles.checkboxText}>{route}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div style={styles.actions}>
//                     <button type="button" onClick={handleCancel} style={styles.cancelButton}>
//                         Annuler
//                     </button>
//                     <button type="submit" style={styles.submitButton}>
//                         Enregistrer le transporteur
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// const styles = {
//     container: {
//         maxWidth: '800px',
//         margin: '20px auto',
//         padding: '20px',
//         backgroundColor: '#ffffff',
//         borderRadius: '12px',
//         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//         fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//     },
//     header: {
//         textAlign: 'center',
//         marginBottom: '32px',
//         paddingBottom: '24px',
//         borderBottom: '2px solid #f1f5f9'
//     },
//     title: {
//         fontSize: '28px',
//         fontWeight: '700',
//         color: '#1f2937',
//         marginBottom: '8px'
//     },
//     subtitle: {
//         fontSize: '16px',
//         color: '#6b7280'
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '32px'
//     },
//     section: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '20px'
//     },
//     sectionTitle: {
//         fontSize: '20px',
//         fontWeight: '600',
//         color: '#1f2937',
//         marginBottom: '4px',
//         paddingBottom: '8px',
//         borderBottom: '1px solid #e5e7eb'
//     },
//     grid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//         gap: '20px'
//     },
//     formGroup: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '6px'
//     },
//     label: {
//         fontSize: '14px',
//         fontWeight: '500',
//         color: '#374151'
//     },
//     input: {
//         padding: '12px 16px',
//         border: '2px solid #e5e7eb',
//         borderRadius: '8px',
//         fontSize: '16px',
//         transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
//         backgroundColor: '#ffffff'
//     },
//     select: {
//         padding: '12px 16px',
//         border: '2px solid #e5e7eb',
//         borderRadius: '8px',
//         fontSize: '16px',
//         transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
//         backgroundColor: '#ffffff'
//     },
//     inputError: {
//         borderColor: '#ef4444'
//     },
//     errorMessage: {
//         fontSize: '12px',
//         color: '#ef4444',
//         marginTop: '4px'
//     },
//     checkboxGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//         gap: '12px',
//         marginTop: '8px'
//     },
//     checkboxLabel: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px',
//         cursor: 'pointer',
//         padding: '8px 12px',
//         borderRadius: '8px',
//         transition: 'background 0.2s ease'
//     },
//     checkbox: {
//         width: '16px',
//         height: '16px',
//         margin: '0'
//     },
//     checkboxText: {
//         fontSize: '14px',
//         color: '#374151'
//     },
//     actions: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         gap: '16px',
//         paddingTop: '24px',
//         borderTop: '2px solid #f1f5f9'
//     },
//     cancelButton: {
//         padding: '12px 24px',
//         borderRadius: '8px',
//         fontWeight: '600',
//         cursor: 'pointer',
//         transition: 'all 0.2s ease',
//         border: '2px solid #d1d5db',
//         backgroundColor: '#ffffff',
//         color: '#6b7280'
//     },
//     submitButton: {
//         padding: '12px 24px',
//         borderRadius: '8px',
//         fontWeight: '600',
//         cursor: 'pointer',
//         transition: 'all 0.2s ease',
//         border: '2px solid #3b82f6',
//         backgroundColor: '#3b82f6',
//         color: '#ffffff'
//     }
// }

// export default CarrierRegistration


import { useState } from 'react'

const CarrierRegistration = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1)
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

  const steps = [
    { id: 1, title: 'Company', icon: '🏢' },
    { id: 2, title: 'Contact', icon: '📞' },
    { id: 3, title: 'Operations', icon: '🚛' },
    { id: 4, title: 'Complete', icon: '✓' }
  ]

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

  const validateStep = (step) => {
    const newErrors = {}
    
    switch (step) {
      case 1:
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required'
        break
      case 2:
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!formData.contactPersonName.trim()) newErrors.contactPersonName = 'Contact person name is required'
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (formData.email && !emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address'
        }
        
        if (formData.contactPersonEmail && !emailRegex.test(formData.contactPersonEmail)) {
          newErrors.contactPersonEmail = 'Please enter a valid email address'
        }
        break
      case 3:
        if (!formData.operatingLicense.trim()) newErrors.operatingLicense = 'Operating license is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
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
        setCurrentStep(1)
      }
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Company Information</h3>
            <div style={styles.formGrid}>
              <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                <label style={styles.label}>Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.companyName ? styles.inputError : {})}}
                  placeholder="Enter company name"
                />
                {errors.companyName && <span style={styles.errorMessage}>{errors.companyName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Registration Number *</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.registrationNumber ? styles.inputError : {})}}
                  placeholder="Company registration number"
                />
                {errors.registrationNumber && <span style={styles.errorMessage}>{errors.registrationNumber}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Tax ID</label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Tax identification number"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Company Type</label>
                <select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Private">Private Company</option>
                  <option value="Public">Public Company</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Cooperative">Cooperative</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Established Year</label>
                <input
                  type="number"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleChange}
                  style={styles.input}
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="YYYY"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Contact Information</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.phoneNumber ? styles.inputError : {})}}
                  placeholder="+228 XX XX XX XX"
                />
                {errors.phoneNumber && <span style={styles.errorMessage}>{errors.phoneNumber}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.email ? styles.inputError : {})}}
                  placeholder="company@example.com"
                />
                {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
              </div>

              <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                <label style={styles.label}>Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="https://www.company.com"
                />
              </div>

              <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                <label style={styles.label}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Street address"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select city</option>
                  <option value="Lomé">Lomé</option>
                  <option value="Kara">Kara</option>
                  <option value="Sokodé">Sokodé</option>
                  <option value="Kpalimé">Kpalimé</option>
                  <option value="Atakpamé">Atakpamé</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Postal code"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Person Name *</label>
                <input
                  type="text"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.contactPersonName ? styles.inputError : {})}}
                  placeholder="Full name"
                />
                {errors.contactPersonName && <span style={styles.errorMessage}>{errors.contactPersonName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Person Title</label>
                <input
                  type="text"
                  name="contactPersonTitle"
                  value={formData.contactPersonTitle}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="e.g., General Manager"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Phone</label>
                <input
                  type="tel"
                  name="contactPersonPhone"
                  value={formData.contactPersonPhone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="+228 XX XX XX XX"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Email</label>
                <input
                  type="email"
                  name="contactPersonEmail"
                  value={formData.contactPersonEmail}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.contactPersonEmail ? styles.inputError : {})}}
                  placeholder="contact@company.com"
                />
                {errors.contactPersonEmail && <span style={styles.errorMessage}>{errors.contactPersonEmail}</span>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Operations & Services</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Fleet Size</label>
                <select
                  name="fleetSize"
                  value={formData.fleetSize}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select fleet size</option>
                  <option value="1-5">1-5 vehicles</option>
                  <option value="6-10">6-10 vehicles</option>
                  <option value="11-25">11-25 vehicles</option>
                  <option value="26-50">26-50 vehicles</option>
                  <option value="51-100">51-100 vehicles</option>
                  <option value="100+">100+ vehicles</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Operating License Number *</label>
                <input
                  type="text"
                  name="operatingLicense"
                  value={formData.operatingLicense}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.operatingLicense ? styles.inputError : {})}}
                  placeholder="License number"
                />
                {errors.operatingLicense && <span style={styles.errorMessage}>{errors.operatingLicense}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>License Expiry Date</label>
                <input
                  type="date"
                  name="licenseExpiry"
                  value={formData.licenseExpiry}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Insurance Provider</label>
                <input
                  type="text"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Insurance company name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Policy Number</label>
                <input
                  type="text"
                  name="insurancePolicyNumber"
                  value={formData.insurancePolicyNumber}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Policy number"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Insurance Expiry</label>
                <input
                  type="date"
                  name="insuranceExpiry"
                  value={formData.insuranceExpiry}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.servicesSection}>
              <label style={styles.label}>Services Offered</label>
              <div style={styles.checkboxGrid}>
                {[
                  'Container Transport',
                  'Bulk Cargo',
                  'General Cargo',
                  'Hazardous Materials',
                  'Refrigerated Transport',
                  'Heavy Machinery'
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

            <div style={styles.routesSection}>
              <label style={styles.label}>Operating Routes</label>
              <div style={styles.checkboxGrid}>
                {[
                  'Lomé Port - Burkina Faso',
                  'Lomé Port - Mali',
                  'Lomé Port - Niger',
                  'Lomé Port - Ghana',
                  'Domestic Routes',
                  'Regional West Africa'
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
          </div>
        )

      case 4:
        return (
          <div style={styles.stepContent}>
            <div style={styles.completionContent}>
              <div style={styles.completionIcon}>✅</div>
              <h3 style={styles.completionTitle}>Review & Complete</h3>
              <p style={styles.completionText}>Please review your information before submitting</p>
              
              <div style={styles.summaryGrid}>
                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Company Info</h4>
                  <p><strong>Name:</strong> {formData.companyName}</p>
                  <p><strong>Registration:</strong> {formData.registrationNumber}</p>
                  <p><strong>Type:</strong> {formData.companyType}</p>
                  <p><strong>Established:</strong> {formData.establishedYear || 'Not provided'}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Contact</h4>
                  <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Contact Person:</strong> {formData.contactPersonName}</p>
                  <p><strong>City:</strong> {formData.city || 'Not provided'}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Operations</h4>
                  <p><strong>Fleet Size:</strong> {formData.fleetSize || 'Not specified'}</p>
                  <p><strong>License:</strong> {formData.operatingLicense}</p>
                  <p><strong>Insurance:</strong> {formData.insuranceProvider || 'Not provided'}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Services</h4>
                  <p><strong>Services:</strong> {formData.servicesOffered.length} selected</p>
                  <p><strong>Routes:</strong> {formData.operatingRoutes.length} selected</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>REGISTER NEW CARRIER</h2>
        <p style={styles.subtitle}>Fill all form fields to complete registration</p>
      </div>

      <div style={styles.progressContainer}>
        {steps.map((step, index) => (
          <div key={step.id} style={styles.stepContainer}>
            <div style={{
              ...styles.stepCircle,
              ...(currentStep >= step.id ? styles.stepCircleActive : {}),
              ...(currentStep === step.id ? styles.stepCircleCurrent : {})
            }}>
              <span style={styles.stepIcon}>{step.icon}</span>
            </div>
            <span style={{
              ...styles.stepLabel,
              ...(currentStep >= step.id ? styles.stepLabelActive : {})
            }}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div style={{
                ...styles.stepConnector,
                ...(currentStep > step.id ? styles.stepConnectorActive : {})
              }} />
            )}
          </div>
        ))}
      </div>

      <div style={styles.stepInfo}>
        <span style={styles.stepCounter}>Step {currentStep} - {steps.length}</span>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {renderStepContent()}

        <div style={styles.actions}>
          <button 
            type="button" 
            onClick={handleCancel} 
            style={styles.cancelButton}
          >
            Cancel
          </button>
          
          <div style={styles.navigationButtons}>
            {currentStep > 1 && (
              <button 
                type="button" 
                onClick={handlePrevious}
                style={styles.previousButton}
              >
                Previous
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button 
                type="button" 
                onClick={handleNext}
                style={styles.nextButton}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit"
                style={styles.submitButton}
              >
                Complete Registration
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: '600px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: '8px',
    letterSpacing: '0.5px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    padding: '0 20px'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    flex: 1
  },
  stepCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
    transition: 'all 0.3s ease',
    border: '2px solid #e5e7eb'
  },
  stepCircleActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1'
  },
  stepCircleCurrent: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
    boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.2)'
  },
  stepIcon: {
    fontSize: '18px',
    color: '#ffffff'
  },
  stepLabel: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '500',
    textAlign: 'center'
  },
  stepLabelActive: {
    color: '#6366f1',
    fontWeight: '600'
  },
  stepConnector: {
    position: 'absolute',
    top: '24px',
    left: '60%',
    right: '-40%',
    height: '2px',
    backgroundColor: '#e5e7eb',
    transition: 'all 0.3s ease'
  },
  stepConnectorActive: {
    backgroundColor: '#6366f1'
  },
  stepInfo: {
    textAlign: 'right',
    marginBottom: '24px'
  },
  stepCounter: {
    fontSize: '14px',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '4px 12px',
    borderRadius: '12px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  stepContent: {
    flex: 1,
    minHeight: '300px'
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '24px',
    textAlign: 'center'
  },
  formGrid: {
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
  servicesSection: {
    marginTop: '24px'
  },
  routesSection: {
    marginTop: '24px'
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
    marginTop: '12px'
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
  completionContent: {
    textAlign: 'center'
  },
  completionIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  completionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '8px'
  },
  completionText: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '32px'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    textAlign: 'left'
  },
  summarySection: {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '8px'
  },
  summaryTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: '8px',
    textTransform: 'uppercase'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '24px',
    borderTop: '1px solid #e5e7eb',
    marginTop: '24px'
  },
  navigationButtons: {
    display: 'flex',
    gap: '12px'
  },
  cancelButton: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#6b7280'
  },
  previousButton: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #6366f1',
    backgroundColor: '#ffffff',
    color: '#6366f1'
  },
  nextButton: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #6366f1',
    backgroundColor: '#6366f1',
    color: '#ffffff'
  },
  submitButton: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #10b981',
    backgroundColor: '#10b981',
    color: '#ffffff'
  }
}

export default CarrierRegistration