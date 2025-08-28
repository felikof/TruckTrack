// import { useState } from 'react'
// import { parsePhoneNumberFromString } from 'libphonenumber-js';

// const SlotReservation = ({ selectedSlot, onSubmit, onCancel }) => {
//     const [formData, setFormData] = useState({
//         // Truck Information
//         truckPlateNumber: '',
//         truckType: 'Standard',
//         cargoType: 'Container',
//         cargoWeight: '',
//         cargoDescription: '',
//         containerNumber: '',
//         sealNumber: '',

//         // Driver Information
//         driverName: '',
//         driverLicense: '',
//         driverPhone: '',

//         // Carrier Information
//         carrierName: '',
//         carrierContact: '',

//         // Route Information
//         origin: selectedSlot?.gate || 'Gate A1',
//         destination: selectedSlot?.terminal || 'Terminal 3',
//         estimatedArrival: '',

//         // Additional Services
//         additionalServices: [],
//         specialRequirements: '',

//         // Documentation
//         billOfLading: '',
//         customsDeclaration: '',

//         // Emergency Contact
//         emergencyContactName: '',
//         emergencyContactPhone: '',

//         // Terms and Conditions
//         acceptTerms: false,
//         acceptPricing: false
//     })

//     const [errors, setErrors] = useState({})

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target

//         if (type === 'checkbox') {
//             if (name === 'additionalServices') {
//                 setFormData(prev => ({
//                     ...prev,
//                     additionalServices: checked
//                         ? [...prev.additionalServices, value]
//                         : prev.additionalServices.filter(service => service !== value)
//                 }))
//             } else {
//                 setFormData(prev => ({
//                     ...prev,
//                     [name]: checked
//                 }))
//             }
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }))
//         }
//     }

//     function isValidPhone(phone) {
//         const phoneNumber = parsePhoneNumberFromString(phone);
//         return phoneNumber?.isValid() || false;
//     }

//     const validateForm = () => {
//         const newErrors = {}

//         // Required fields validation
//         if (!formData.truckPlateNumber.trim()) newErrors.truckPlateNumber = 'Truck plate number is required'
//         if (!formData.driverName.trim()) newErrors.driverName = 'Driver name is required'
//         if (!formData.driverLicense.trim()) newErrors.driverLicense = 'Driver license is required'
//         if (!formData.driverPhone.trim()) newErrors.driverPhone = 'Driver phone is required'
//         if (!formData.carrierName.trim()) newErrors.carrierName = 'Carrier name is required'
//         if (!formData.cargoWeight) newErrors.cargoWeight = 'Cargo weight is required'
//         if (!formData.estimatedArrival) newErrors.estimatedArrival = 'Estimated arrival time is required'
//         if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions'
//         if (!formData.acceptPricing) newErrors.acceptPricing = 'You must accept the pricing terms'

//         // Plate number format validation
//         const plateRegex = /^[A-Z]{2}-\d{4}-[A-Z]{2}$/
//         if (formData.truckPlateNumber && !plateRegex.test(formData.truckPlateNumber)) {
//             newErrors.truckPlateNumber = 'Plate number format should be XX-0000-XX'
//         }

//         // Phone validation
//         const phoneRegex = /^[+]?[0-9\s\-\d()]{8,20}$/
//         if (formData.driverPhone && !phoneRegex.test(formData.driverPhone)) {
//             newErrors.driverPhone = 'Please enter a valid phone number'
//         }

//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }

    

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if (validateForm()) {
//             const reservationData = {
//                 ...formData,
//                 slotId: selectedSlot?.id,
//                 slotTime: selectedSlot?.timeSlot,
//                 slotDate: new Date().toISOString().split('T')[0],
//                 totalPrice: selectedSlot?.price,
//                 currency: selectedSlot?.currency || 'CFA',
//                 reservationId: `RES-${Date.now()}`,
//                 status: 'pending',
//                 createdAt: new Date().toISOString()
//             }

//             if (onSubmit) {
//                 onSubmit(reservationData)
//             } else {
//                 console.log('Slot reservation data:', reservationData)
//                 alert('Slot reserved successfully!')
//             }
//         }
//         const phone = "+228 23456789";
//         console.log(isValidPhone(phone));
//     }

//     const handleCancel = () => {
//         if (onCancel) {
//             onCancel()
//         } else {
//             if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
//                 setFormData({
//                     truckPlateNumber: '',
//                     truckType: 'Standard',
//                     cargoType: 'Container',
//                     cargoWeight: '',
//                     cargoDescription: '',
//                     containerNumber: '',
//                     sealNumber: '',
//                     driverName: '',
//                     driverLicense: '',
//                     driverPhone: '',
//                     carrierName: '',
//                     carrierContact: '',
//                     origin: selectedSlot?.gate || 'Gate A1',
//                     destination: selectedSlot?.terminal || 'Terminal 3',
//                     estimatedArrival: '',
//                     additionalServices: [],
//                     specialRequirements: '',
//                     billOfLading: '',
//                     customsDeclaration: '',
//                     emergencyContactName: '',
//                     emergencyContactPhone: '',
//                     acceptTerms: false,
//                     acceptPricing: false
//                 })
//                 setErrors({})
//             }
//         }
//     }

//     const formatPrice = (price, currency) => {
//         return `${currency} ${price?.toLocaleString() || '0'}`
//     }

//     // Default slot data for standalone use
//     const defaultSlot = {
//         id: 1,
//         timeSlot: '08:00',
//         gate: 'Gate A1',
//         terminal: 'Terminal 3',
//         duration: '2h 30m',
//         price: 45000,
//         currency: 'CFA'
//     }

//     const slot = selectedSlot || defaultSlot

//     return (
//         <div style={styles.container}>
//             <div style={styles.header}>
//                 <h2 style={styles.title}>Réserver un créneau</h2>
//                 <p style={styles.subtitle}>Complétez votre réservation pour {slot.timeSlot} - {slot.gate} vers {slot.terminal}</p>
//                 <div style={styles.slotSummary}>
//                     <div style={styles.summaryItem}>
//                         <span style={styles.summaryLabel}>Créneau horaire :</span>
//                         <span style={styles.summaryValue}>{slot.timeSlot}</span>
//                     </div>
//                     <div style={styles.summaryItem}>
//                         <span style={styles.summaryLabel}>Itinéraire :</span>
//                         <span style={styles.summaryValue}>{slot.gate} → {slot.terminal}</span>
//                     </div>
//                     <div style={styles.summaryItem}>
//                         <span style={styles.summaryLabel}>Durée :</span>
//                         <span style={styles.summaryValue}>{slot.duration}</span>
//                     </div>
//                     <div style={styles.summaryItem}>
//                         <span style={styles.summaryLabel}>Prix :</span>
//                         <span style={{ ...styles.summaryValue, color: '#3b82f6', fontSize: '18px' }}>{formatPrice(slot.price, slot.currency)}</span>
//                     </div>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Informations sur le camion</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="truckPlateNumber" style={styles.label}>Immatriculation du camion *</label>
//                             <input
//                                 type="text"
//                                 id="truckPlateNumber"
//                                 name="truckPlateNumber"
//                                 value={formData.truckPlateNumber}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.truckPlateNumber ? styles.inputError : {}), textTransform: 'uppercase' }}
//                                 placeholder="TG-1234-AB"
//                             />
//                             {errors.truckPlateNumber && <span style={styles.errorMessage}>{errors.truckPlateNumber}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="truckType" style={styles.label}>Type de camion</label>
//                             <select
//                                 id="truckType"
//                                 name="truckType"
//                                 value={formData.truckType}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="Standard">Camion standard</option>
//                                 <option value="Heavy Duty">Poids lourd</option>
//                                 <option value="Container">Camion porte-conteneur</option>
//                                 <option value="Flatbed">Plateau</option>
//                                 <option value="Tanker">Citerne</option>
//                                 <option value="Refrigerated">Frigorifique</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="cargoType" style={styles.label}>Type de cargaison</label>
//                             <select
//                                 id="cargoType"
//                                 name="cargoType"
//                                 value={formData.cargoType}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="Container">Conteneur</option>
//                                 <option value="Bulk">Marchandise en vrac</option>
//                                 <option value="General">Marchandise générale</option>
//                                 <option value="Liquid">Liquide</option>
//                                 <option value="Hazardous">Matières dangereuses</option>
//                                 <option value="Refrigerated">Produits réfrigérés</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="cargoWeight" style={styles.label}>Poids de la cargaison (tonnes) *</label>
//                             <input
//                                 type="number"
//                                 id="cargoWeight"
//                                 name="cargoWeight"
//                                 value={formData.cargoWeight}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.cargoWeight ? styles.inputError : {}) }}
//                                 min="0.1"
//                                 step="0.1"
//                                 placeholder="ex : 25.5"
//                             />
//                             {errors.cargoWeight && <span style={styles.errorMessage}>{errors.cargoWeight}</span>}
//                         </div>

//                         <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
//                             <label htmlFor="cargoDescription" style={styles.label}>Description de la cargaison</label>
//                             <textarea
//                                 id="cargoDescription"
//                                 name="cargoDescription"
//                                 value={formData.cargoDescription}
//                                 onChange={handleChange}
//                                 style={styles.textarea}
//                                 rows="3"
//                                 placeholder="Décrivez la cargaison transportée"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="containerNumber" style={styles.label}>Numéro du conteneur</label>
//                             <input
//                                 type="text"
//                                 id="containerNumber"
//                                 name="containerNumber"
//                                 value={formData.containerNumber}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="ID du conteneur (si applicable)"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="sealNumber" style={styles.label}>Numéro du plomb</label>
//                             <input
//                                 type="text"
//                                 id="sealNumber"
//                                 name="sealNumber"
//                                 value={formData.sealNumber}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Numéro du plomb du conteneur"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Informations sur le conducteur</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="driverName" style={styles.label}>Nom du conducteur *</label>
//                             <input
//                                 type="text"
//                                 id="driverName"
//                                 name="driverName"
//                                 value={formData.driverName}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.driverName ? styles.inputError : {}) }}
//                                 placeholder="Nom complet du conducteur"
//                             />
//                             {errors.driverName && <span style={styles.errorMessage}>{errors.driverName}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="driverLicense" style={styles.label}>Numéro du permis *</label>
//                             <input
//                                 type="text"
//                                 id="driverLicense"
//                                 name="driverLicense"
//                                 value={formData.driverLicense}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.driverLicense ? styles.inputError : {}) }}
//                                 placeholder="Numéro du permis"
//                             />
//                             {errors.driverLicense && <span style={styles.errorMessage}>{errors.driverLicense}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="driverPhone" style={styles.label}>Téléphone du conducteur *</label>
//                             <input
//                                 type="tel"
//                                 id="driverPhone"
//                                 name="driverPhone"
//                                 value={formData.driverPhone}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.driverPhone ? styles.inputError : {}) }}
//                                 placeholder="+228 XX XX XX XX"
//                             />
//                             {errors.driverPhone && <span style={styles.errorMessage}>{errors.driverPhone}</span>}
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Informations sur le transporteur</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="carrierName" style={styles.label}>Nom du transporteur / entreprise *</label>
//                             <input
//                                 type="text"
//                                 id="carrierName"
//                                 name="carrierName"
//                                 value={formData.carrierName}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.carrierName ? styles.inputError : {}) }}
//                                 placeholder="Nom de l'entreprise ou du transporteur"
//                             />
//                             {errors.carrierName && <span style={styles.errorMessage}>{errors.carrierName}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="carrierContact" style={styles.label}>Contact du transporteur</label>
//                             <input
//                                 type="tel"
//                                 id="carrierContact"
//                                 name="carrierContact"
//                                 value={formData.carrierContact}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="+228 XX XX XX XX"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Itinéraire & horaire</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="origin" style={styles.label}>Porte d'origine</label>
//                             <select
//                                 id="origin"
//                                 name="origin"
//                                 value={formData.origin}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="Gate A1">Porte A1</option>
//                                 <option value="Gate A2">Porte A2</option>
//                                 <option value="Gate B1">Porte B1</option>
//                                 <option value="Gate B2">Porte B2</option>
//                                 <option value="Gate C1">Porte C1</option>
//                                 <option value="Gate C2">Porte C2</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="destination" style={styles.label}>Terminal de destination</label>
//                             <select
//                                 id="destination"
//                                 name="destination"
//                                 value={formData.destination}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="Terminal 1">Terminal 1</option>
//                                 <option value="Terminal 2">Terminal 2</option>
//                                 <option value="Terminal 3">Terminal 3</option>
//                                 <option value="Container Yard">Parc à conteneurs</option>
//                                 <option value="Bulk Terminal">Terminal vrac</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="estimatedArrival" style={styles.label}>Heure d'arrivée estimée *</label>
//                             <input
//                                 type="time"
//                                 id="estimatedArrival"
//                                 name="estimatedArrival"
//                                 value={formData.estimatedArrival}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.estimatedArrival ? styles.inputError : {}) }}
//                             />
//                             {errors.estimatedArrival && <span style={styles.errorMessage}>{errors.estimatedArrival}</span>}
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Services additionnels</h3>
//                     <div style={styles.checkboxGrid}>
//                         {[
//                             'Traitement prioritaire',
//                             'Service d\'escorte',
//                             'Dédouanement',
//                             'Service de pesage',
//                             'Inspection de sécurité',
//                             'Assistance documentaire',
//                             'Aide au chargement/déchargement',
//                             'Stockage temporaire'
//                         ].map((service) => (
//                             <label key={service} style={styles.checkboxLabel}>
//                                 <input
//                                     type="checkbox"
//                                     name="additionalServices"
//                                     value={service}
//                                     checked={formData.additionalServices.includes(service)}
//                                     onChange={handleChange}
//                                     style={styles.checkbox}
//                                 />
//                                 <span style={styles.checkboxText}>{service}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Exigences particulières</h3>
//                     <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
//                         <label htmlFor="specialRequirements" style={styles.label}>Exigences ou remarques particulières</label>
//                         <textarea
//                             id="specialRequirements"
//                             name="specialRequirements"
//                             value={formData.specialRequirements}
//                             onChange={handleChange}
//                             style={styles.textarea}
//                             rows="4"
//                             placeholder="Exigences spécifiques, restrictions ou informations complémentaires"
//                         />
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Documents</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="billOfLading" style={styles.label}>Numéro du connaissement</label>
//                             <input
//                                 type="text"
//                                 id="billOfLading"
//                                 name="billOfLading"
//                                 value={formData.billOfLading}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Numéro du connaissement"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="customsDeclaration" style={styles.label}>Numéro de déclaration douanière</label>
//                             <input
//                                 type="text"
//                                 id="customsDeclaration"
//                                 name="customsDeclaration"
//                                 value={formData.customsDeclaration}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Numéro de déclaration douanière"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Contact d'urgence</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="emergencyContactName" style={styles.label}>Nom du contact d'urgence</label>
//                             <input
//                                 type="text"
//                                 id="emergencyContactName"
//                                 name="emergencyContactName"
//                                 value={formData.emergencyContactName}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Personne à contacter en urgence"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="emergencyContactPhone" style={styles.label}>Téléphone d'urgence</label>
//                             <input
//                                 type="tel"
//                                 id="emergencyContactPhone"
//                                 name="emergencyContactPhone"
//                                 value={formData.emergencyContactPhone}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="+228 XX XX XX XX"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Conditions générales</h3>
//                     <div style={styles.termsSection}>
//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="acceptTerms"
//                                 checked={formData.acceptTerms}
//                                 onChange={handleChange}
//                                 style={{ ...styles.checkbox, ...(errors.acceptTerms ? styles.inputError : {}) }}
//                             />
//                             <span style={styles.checkboxText}>J'accepte les conditions générales des opérations portuaires *</span>
//                         </label>
//                         {errors.acceptTerms && <span style={styles.errorMessage}>{errors.acceptTerms}</span>}

//                         <label style={styles.checkboxLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="acceptPricing"
//                                 checked={formData.acceptPricing}
//                                 onChange={handleChange}
//                                 style={{ ...styles.checkbox, ...(errors.acceptPricing ? styles.inputError : {}) }}
//                             />
//                             <span style={styles.checkboxText}>J'accepte les conditions tarifaires et comprends tous les frais *</span>
//                         </label>
//                         {errors.acceptPricing && <span style={styles.errorMessage}>{errors.acceptPricing}</span>}
//                     </div>
//                 </div>

//                 <div style={styles.reservationSummary}>
//                     <h3 style={styles.sectionTitle}>Résumé de la réservation</h3>
//                     <div style={styles.summaryDetails}>
//                         <div style={styles.summaryRow}>
//                             <span>Créneau horaire :</span>
//                             <span>{slot.timeSlot}</span>
//                         </div>
//                         <div style={styles.summaryRow}>
//                             <span>Itinéraire :</span>
//                             <span>{formData.origin} → {formData.destination}</span>
//                         </div>
//                         <div style={styles.summaryRow}>
//                             <span>Durée :</span>
//                             <span>{slot.duration}</span>
//                         </div>
//                         <div style={styles.summaryRow}>
//                             <span>Prix de base :</span>
//                             <span>{formatPrice(slot.price, slot.currency)}</span>
//                         </div>
//                         <div style={styles.summaryRow}>
//                             <span>Services additionnels :</span>
//                             <span>{formData.additionalServices.length} sélectionné(s)</span>
//                         </div>
//                         <div style={{ ...styles.summaryRow, ...styles.summaryTotal }}>
//                             <span>Prix total :</span>
//                             <span>{formatPrice(slot.price, slot.currency)}</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.actions}>
//                     <button type="button" onClick={handleCancel} style={styles.cancelButton}>
//                         Annuler
//                     </button>
//                     <button type="submit" style={styles.submitButton}>
//                         Réserver le créneau
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
//         backgroundColor: '#ffffffff',
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
//         color: '#6b7280',
//         marginBottom: '16px'
//     },
//     slotSummary: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//         gap: '16px',
//         padding: '20px',
//         backgroundColor: '#f8fafc',
//         borderRadius: '12px'
//     },
//     summaryItem: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '4px'
//     },
//     summaryLabel: {
//         fontSize: '12px',
//         color: '#6b7280',
//         fontWeight: '500',
//         textTransform: 'uppercase'
//     },
//     summaryValue: {
//         fontSize: '16px',
//         color: '#1f2937',
//         fontWeight: '600'
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
//     textarea: {
//         padding: '12px 16px',
//         border: '2px solid #e5e7eb',
//         borderRadius: '8px',
//         fontSize: '16px',
//         transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
//         backgroundColor: '#ffffff',
//         resize: 'vertical'
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
//     termsSection: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '12px',
//         padding: '16px',
//         backgroundColor: '#f9fafb',
//         borderRadius: '8px',
//         border: '1px solid #e5e7eb'
//     },
//     reservationSummary: {
//         backgroundColor: '#f8fafc',
//         borderRadius: '12px',
//         padding: '24px'
//     },
//     summaryDetails: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '12px'
//     },
//     summaryRow: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '8px 0',
//         borderBottom: '1px solid #e5e7eb'
//     },
//     summaryTotal: {
//         fontWeight: '700',
//         fontSize: '18px',
//         color: '#3b82f6',
//         borderTop: '2px solid #3b82f6',
//         paddingTop: '12px',
//         marginTop: '8px',
//         borderBottom: 'none'
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

// export default SlotReservation


import { useState } from 'react'

const SlotReservation = ({ selectedSlot, onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Truck Information
    truckPlateNumber: '',
    truckType: 'Standard',
    cargoType: 'Container',
    cargoWeight: '',
    cargoDescription: '',
    containerNumber: '',
    sealNumber: '',
    
    // Driver Information
    driverName: '',
    driverLicense: '',
    driverPhone: '',
    
    // Carrier Information
    carrierName: '',
    carrierContact: '',
    
    // Route Information
    origin: selectedSlot?.gate || 'Gate A1',
    destination: selectedSlot?.terminal || 'Terminal 3',
    estimatedArrival: '',
    
    // Additional Services
    additionalServices: [],
    specialRequirements: '',
    
    // Documentation
    billOfLading: '',
    customsDeclaration: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    
    // Terms and Conditions
    acceptTerms: false,
    acceptPricing: false
  })

  const [errors, setErrors] = useState({})

  const steps = [
    { id: 1, title: 'Truck', icon: '🚛' },
    { id: 2, title: 'Driver', icon: '👤' },
    { id: 3, title: 'Services', icon: '⚙️' },
    { id: 4, title: 'Complete', icon: '✓' }
  ]

  // Default slot data for standalone use
  const defaultSlot = {
    id: 1,
    timeSlot: '08:00',
    gate: 'Gate A1',
    terminal: 'Terminal 3',
    duration: '2h 30m',
    price: 45000,
    currency: 'CFA'
  }

  const slot = selectedSlot || defaultSlot

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      if (name === 'additionalServices') {
        setFormData(prev => ({
          ...prev,
          additionalServices: checked 
            ? [...prev.additionalServices, value]
            : prev.additionalServices.filter(service => service !== value)
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
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
        if (!formData.truckPlateNumber.trim()) newErrors.truckPlateNumber = 'Truck plate number is required'
        if (!formData.cargoWeight) newErrors.cargoWeight = 'Cargo weight is required'
        
        const plateRegex = /^[A-Z]{2}-\d{4}-[A-Z]{2}$/
        if (formData.truckPlateNumber && !plateRegex.test(formData.truckPlateNumber)) {
          newErrors.truckPlateNumber = 'Plate number format should be XX-0000-XX'
        }
        break
      case 2:
        if (!formData.driverName.trim()) newErrors.driverName = 'Driver name is required'
        if (!formData.driverLicense.trim()) newErrors.driverLicense = 'Driver license is required'
        if (!formData.driverPhone.trim()) newErrors.driverPhone = 'Driver phone is required'
        if (!formData.carrierName.trim()) newErrors.carrierName = 'Carrier name is required'
        if (!formData.estimatedArrival) newErrors.estimatedArrival = 'Estimated arrival time is required'
        
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/
        if (formData.driverPhone && !phoneRegex.test(formData.driverPhone)) {
          newErrors.driverPhone = 'Please enter a valid phone number'
        }
        break
      case 3:
        if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions'
        if (!formData.acceptPricing) newErrors.acceptPricing = 'You must accept the pricing terms'
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
      const reservationData = {
        ...formData,
        slotId: slot?.id,
        slotTime: slot?.timeSlot,
        slotDate: new Date().toISOString().split('T')[0],
        totalPrice: slot?.price,
        currency: slot?.currency || 'CFA',
        reservationId: `RES-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      if (onSubmit) {
        onSubmit(reservationData)
      } else {
        console.log('Slot reservation data:', reservationData)
        alert('Slot reserved successfully!')
      }
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
        setFormData({
          truckPlateNumber: '',
          truckType: 'Standard',
          cargoType: 'Container',
          cargoWeight: '',
          cargoDescription: '',
          containerNumber: '',
          sealNumber: '',
          driverName: '',
          driverLicense: '',
          driverPhone: '',
          carrierName: '',
          carrierContact: '',
          origin: slot?.gate || 'Gate A1',
          destination: slot?.terminal || 'Terminal 3',
          estimatedArrival: '',
          additionalServices: [],
          specialRequirements: '',
          billOfLading: '',
          customsDeclaration: '',
          emergencyContactName: '',
          emergencyContactPhone: '',
          acceptTerms: false,
          acceptPricing: false
        })
        setErrors({})
        setCurrentStep(1)
      }
    }
  }

  const formatPrice = (price, currency) => {
    return `${currency} ${price?.toLocaleString() || '0'}`
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Truck & Cargo Information</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Truck Plate Number *</label>
                <input
                  type="text"
                  name="truckPlateNumber"
                  value={formData.truckPlateNumber}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.truckPlateNumber ? styles.inputError : {}), textTransform: 'uppercase'}}
                  placeholder="TG-1234-AB"
                />
                {errors.truckPlateNumber && <span style={styles.errorMessage}>{errors.truckPlateNumber}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Truck Type</label>
                <select
                  name="truckType"
                  value={formData.truckType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Standard">Standard Truck</option>
                  <option value="Heavy Duty">Heavy Duty</option>
                  <option value="Container">Container Truck</option>
                  <option value="Flatbed">Flatbed</option>
                  <option value="Tanker">Tanker</option>
                  <option value="Refrigerated">Refrigerated</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Cargo Type</label>
                <select
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Container">Container</option>
                  <option value="Bulk">Bulk Cargo</option>
                  <option value="General">General Cargo</option>
                  <option value="Liquid">Liquid</option>
                  <option value="Hazardous">Hazardous Materials</option>
                  <option value="Refrigerated">Refrigerated Goods</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Cargo Weight (tons) *</label>
                <input
                  type="number"
                  name="cargoWeight"
                  value={formData.cargoWeight}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.cargoWeight ? styles.inputError : {})}}
                  min="0.1"
                  step="0.1"
                  placeholder="e.g., 25.5"
                />
                {errors.cargoWeight && <span style={styles.errorMessage}>{errors.cargoWeight}</span>}
              </div>

              <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                <label style={styles.label}>Cargo Description</label>
                <textarea
                  name="cargoDescription"
                  value={formData.cargoDescription}
                  onChange={handleChange}
                  style={styles.textarea}
                  rows="3"
                  placeholder="Describe the cargo being transported"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Container Number</label>
                <input
                  type="text"
                  name="containerNumber"
                  value={formData.containerNumber}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Container ID (if applicable)"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Seal Number</label>
                <input
                  type="text"
                  name="sealNumber"
                  value={formData.sealNumber}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Container seal number"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Driver & Carrier Information</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Driver Name *</label>
                <input
                  type="text"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.driverName ? styles.inputError : {})}}
                  placeholder="Full name of driver"
                />
                {errors.driverName && <span style={styles.errorMessage}>{errors.driverName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Driver License Number *</label>
                <input
                  type="text"
                  name="driverLicense"
                  value={formData.driverLicense}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.driverLicense ? styles.inputError : {})}}
                  placeholder="License number"
                />
                {errors.driverLicense && <span style={styles.errorMessage}>{errors.driverLicense}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Driver Phone *</label>
                <input
                  type="tel"
                  name="driverPhone"
                  value={formData.driverPhone}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.driverPhone ? styles.inputError : {})}}
                  placeholder="+228 XX XX XX XX"
                />
                {errors.driverPhone && <span style={styles.errorMessage}>{errors.driverPhone}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Carrier/Company Name *</label>
                <input
                  type="text"
                  name="carrierName"
                  value={formData.carrierName}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.carrierName ? styles.inputError : {})}}
                  placeholder="Company or carrier name"
                />
                {errors.carrierName && <span style={styles.errorMessage}>{errors.carrierName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Carrier Contact</label>
                <input
                  type="tel"
                  name="carrierContact"
                  value={formData.carrierContact}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="+228 XX XX XX XX"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Estimated Arrival Time *</label>
                <input
                  type="time"
                  name="estimatedArrival"
                  value={formData.estimatedArrival}
                  onChange={handleChange}
                  style={{...styles.input, ...(errors.estimatedArrival ? styles.inputError : {})}}
                />
                {errors.estimatedArrival && <span style={styles.errorMessage}>{errors.estimatedArrival}</span>}
              </div>
            </div>

            <div style={styles.routeSection}>
              <h4 style={styles.sectionSubtitle}>Route Information</h4>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Origin Gate</label>
                  <select
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="Gate A1">Gate A1</option>
                    <option value="Gate A2">Gate A2</option>
                    <option value="Gate B1">Gate B1</option>
                    <option value="Gate B2">Gate B2</option>
                    <option value="Gate C1">Gate C1</option>
                    <option value="Gate C2">Gate C2</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Destination Terminal</label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="Terminal 1">Terminal 1</option>
                    <option value="Terminal 2">Terminal 2</option>
                    <option value="Terminal 3">Terminal 3</option>
                    <option value="Container Yard">Container Yard</option>
                    <option value="Bulk Terminal">Bulk Terminal</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={styles.emergencySection}>
              <h4 style={styles.sectionSubtitle}>Emergency Contact</h4>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Emergency contact person"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Emergency Contact Phone</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Additional Services & Documentation</h3>
            
            <div style={styles.servicesSection}>
              <label style={styles.label}>Additional Services</label>
              <div style={styles.checkboxGrid}>
                {[
                  'Priority Processing',
                  'Escort Service',
                  'Customs Clearance',
                  'Weighbridge Service',
                  'Security Inspection',
                  'Documentation Assistance',
                  'Loading/Unloading Assistance',
                  'Temporary Storage'
                ].map(service => (
                  <label key={service} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="additionalServices"
                      value={service}
                      checked={formData.additionalServices.includes(service)}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span style={styles.checkboxText}>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.documentationSection}>
              <h4 style={styles.sectionSubtitle}>Documentation</h4>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Bill of Lading Number</label>
                  <input
                    type="text"
                    name="billOfLading"
                    value={formData.billOfLading}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="B/L number"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Customs Declaration Number</label>
                  <input
                    type="text"
                    name="customsDeclaration"
                    value={formData.customsDeclaration}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Customs declaration number"
                  />
                </div>
              </div>
            </div>

            <div style={styles.requirementsSection}>
              <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                <label style={styles.label}>Special Requirements or Notes</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  style={styles.textarea}
                  rows="4"
                  placeholder="Any special handling requirements, restrictions, or additional information"
                />
              </div>
            </div>

            <div style={styles.termsSection}>
              <h4 style={styles.sectionSubtitle}>Terms and Conditions</h4>
              <div style={styles.termsContent}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    style={{...styles.checkbox, ...(errors.acceptTerms ? styles.inputError : {})}}
                  />
                  <span style={styles.checkboxText}>I accept the terms and conditions for port operations *</span>
                </label>
                {errors.acceptTerms && <span style={styles.errorMessage}>{errors.acceptTerms}</span>}

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="acceptPricing"
                    checked={formData.acceptPricing}
                    onChange={handleChange}
                    style={{...styles.checkbox, ...(errors.acceptPricing ? styles.inputError : {})}}
                  />
                  <span style={styles.checkboxText}>I accept the pricing terms and understand all fees *</span>
                </label>
                {errors.acceptPricing && <span style={styles.errorMessage}>{errors.acceptPricing}</span>}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div style={styles.stepContent}>
            <div style={styles.completionContent}>
              <div style={styles.completionIcon}>✅</div>
              <h3 style={styles.completionTitle}>Review & Complete Reservation</h3>
              <p style={styles.completionText}>Please review your reservation details before submitting</p>
              
              <div style={styles.summaryGrid}>
                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Slot Details</h4>
                  <p><strong>Time:</strong> {slot.timeSlot}</p>
                  <p><strong>Route:</strong> {formData.origin} → {formData.destination}</p>
                  <p><strong>Duration:</strong> {slot.duration}</p>
                  <p><strong>Arrival:</strong> {formData.estimatedArrival}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Truck & Cargo</h4>
                  <p><strong>Truck:</strong> {formData.truckPlateNumber}</p>
                  <p><strong>Type:</strong> {formData.truckType}</p>
                  <p><strong>Cargo:</strong> {formData.cargoType}</p>
                  <p><strong>Weight:</strong> {formData.cargoWeight} tons</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Driver & Carrier</h4>
                  <p><strong>Driver:</strong> {formData.driverName}</p>
                  <p><strong>License:</strong> {formData.driverLicense}</p>
                  <p><strong>Carrier:</strong> {formData.carrierName}</p>
                  <p><strong>Phone:</strong> {formData.driverPhone}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Services & Pricing</h4>
                  <p><strong>Additional Services:</strong> {formData.additionalServices.length} selected</p>
                  <p><strong>Base Price:</strong> {formatPrice(slot.price, slot.currency)}</p>
                  <p style={{color: '#3b82f6', fontWeight: '600', fontSize: '18px'}}>
                    <strong>Total:</strong> {formatPrice(slot.price, slot.currency)}
                  </p>
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
        <h2 style={styles.title}>RESERVE SLOT</h2>
        <p style={styles.subtitle}>Complete your slot reservation for {slot.timeSlot} - {slot.gate} to {slot.terminal}</p>
        
        <div style={styles.slotSummary}>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Time Slot:</span>
            <span style={styles.summaryValue}>{slot.timeSlot}</span>
          </div>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Route:</span>
            <span style={styles.summaryValue}>{slot.gate} → {slot.terminal}</span>
          </div>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Duration:</span>
            <span style={styles.summaryValue}>{slot.duration}</span>
          </div>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Price:</span>
            <span style={{...styles.summaryValue, color: '#3b82f6', fontSize: '18px'}}>{formatPrice(slot.price, slot.currency)}</span>
          </div>
        </div>
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
                Reserve Slot
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
    marginBottom: '16px'
  },
  slotSummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px'
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  summaryLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  summaryValue: {
    fontSize: '16px',
    color: '#1f2937',
    fontWeight: '600'
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
  sectionSubtitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #e5e7eb'
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
  textarea: {
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    backgroundColor: '#ffffff',
    resize: 'vertical'
  },
  inputError: {
    borderColor: '#ef4444'
  },
  errorMessage: {
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '4px'
  },
  routeSection: {
    marginTop: '24px'
  },
  emergencySection: {
    marginTop: '24px'
  },
  servicesSection: {
    marginBottom: '24px'
  },
  documentationSection: {
    marginBottom: '24px'
  },
  requirementsSection: {
    marginBottom: '24px'
  },
  termsSection: {
    marginBottom: '24px'
  },
  termsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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

export default SlotReservation