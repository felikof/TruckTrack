// import { useState } from 'react'

// const TruckRegistration = ({ onSubmit, onCancel }) => {
//     const [formData, setFormData] = useState({
//         plateNumber: '',
//         chassisNumber: '',
//         engineNumber: '',
//         make: '',
//         model: '',
//         year: '',
//         color: '',
//         fuelType: 'Diesel',
//         truckType: 'Standard',
//         cargoType: 'Container',
//         maxWeight: '',
//         dimensions: {
//             length: '',
//             width: '',
//             height: ''
//         },
//         registrationDate: '',
//         registrationExpiry: '',
//         insuranceProvider: '',
//         insurancePolicyNumber: '',
//         insuranceExpiry: '',
//         inspectionDate: '',
//         inspectionExpiry: '',
//         ownerType: 'Company',
//         ownerName: '',
//         ownerContact: '',
//         driverAssigned: '',
//         gpsInstalled: false,
//         trackingDeviceId: '',
//         specialEquipment: [],
//         certifications: [],
//         operatingPermits: []
//     })

//     const [errors, setErrors] = useState({})

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target

//         if (type === 'checkbox') {
//             if (name === 'gpsInstalled') {
//                 setFormData(prev => ({
//                     ...prev,
//                     [name]: checked
//                 }))
//             } else if (['specialEquipment', 'certifications', 'operatingPermits'].includes(name)) {
//                 setFormData(prev => ({
//                     ...prev,
//                     [name]: checked
//                         ? [...prev[name], value]
//                         : prev[name].filter(item => item !== value)
//                 }))
//             }
//         } else if (name.includes('.')) {
//             const [parent, child] = name.split('.')
//             setFormData(prev => ({
//                 ...prev,
//                 [parent]: {
//                     ...prev[parent],
//                     [child]: value
//                 }
//             }))
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }))
//         }
//     }

//     const validateForm = () => {
//         const newErrors = {}

//         if (!formData.plateNumber.trim()) newErrors.plateNumber = 'Plate number is required'
//         if (!formData.chassisNumber.trim()) newErrors.chassisNumber = 'Chassis number is required'
//         if (!formData.make.trim()) newErrors.make = 'Make is required'
//         if (!formData.model.trim()) newErrors.model = 'Model is required'
//         if (!formData.year) newErrors.year = 'Year is required'
//         if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required'
//         if (!formData.maxWeight) newErrors.maxWeight = 'Maximum weight is required'

//         // Plate number format validation (basic)
//         const plateRegex = /^[A-Z]{2}-\d{4}-[A-Z]{2}$/
//         if (formData.plateNumber && !plateRegex.test(formData.plateNumber)) {
//             newErrors.plateNumber = 'Plate number format should be XX-0000-XX'
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
//                 console.log('Truck registration data:', formData)
//                 alert('Truck registered successfully!')
//             }
//         }
//     }

//     const handleCancel = () => {
//         if (onCancel) {
//             onCancel()
//         } else {
//             if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
//                 setFormData({
//                     plateNumber: '',
//                     chassisNumber: '',
//                     engineNumber: '',
//                     make: '',
//                     model: '',
//                     year: '',
//                     color: '',
//                     fuelType: 'Diesel',
//                     truckType: 'Standard',
//                     cargoType: 'Container',
//                     maxWeight: '',
//                     dimensions: {
//                         length: '',
//                         width: '',
//                         height: ''
//                     },
//                     registrationDate: '',
//                     registrationExpiry: '',
//                     insuranceProvider: '',
//                     insurancePolicyNumber: '',
//                     insuranceExpiry: '',
//                     inspectionDate: '',
//                     inspectionExpiry: '',
//                     ownerType: 'Company',
//                     ownerName: '',
//                     ownerContact: '',
//                     driverAssigned: '',
//                     gpsInstalled: false,
//                     trackingDeviceId: '',
//                     specialEquipment: [],
//                     certifications: [],
//                     operatingPermits: []
//                 })
//                 setErrors({})
//             }
//         }
//     }

//     return (
//         <div style={styles.container}>
//             <div style={styles.header}>
//                 <h2 style={styles.title}>Enregistrement du camion</h2>
//                 <p style={styles.subtitle}>Enregistrez un nouveau camion pour les opérations portuaires</p>
//             </div>

//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Identification du véhicule</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="plateNumber" style={styles.label}>Numéro de plaque *</label>
//                             <input
//                                 type="text"
//                                 id="plateNumber"
//                                 name="plateNumber"
//                                 value={formData.plateNumber}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.plateNumber ? styles.inputError : {}), textTransform: 'uppercase' }}
//                                 placeholder="TG-1234-AB"
//                             />
//                             {errors.plateNumber && <span style={styles.errorMessage}>{errors.plateNumber}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="chassisNumber" style={styles.label}>Numéro de châssis *</label>
//                             <input
//                                 type="text"
//                                 id="chassisNumber"
//                                 name="chassisNumber"
//                                 value={formData.chassisNumber}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.chassisNumber ? styles.inputError : {}) }}
//                                 placeholder="Entrez le numéro de châssis"
//                             />
//                             {errors.chassisNumber && <span style={styles.errorMessage}>{errors.chassisNumber}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="engineNumber" style={styles.label}>Numéro de moteur</label>
//                             <input
//                                 type="text"
//                                 id="engineNumber"
//                                 name="engineNumber"
//                                 value={formData.engineNumber}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Entrez le numéro de moteur"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Détails du véhicule</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="make" style={styles.label}>Marque *</label>
//                             <select
//                                 id="make"
//                                 name="make"
//                                 value={formData.make}
//                                 onChange={handleChange}
//                                 style={{ ...styles.select, ...(errors.make ? styles.inputError : {}) }}
//                             >
//                                 <option value="">Sélectionnez la marque</option>
//                                 <option value="Mercedes-Benz">Mercedes-Benz</option>
//                                 <option value="Volvo">Volvo</option>
//                                 <option value="Scania">Scania</option>
//                                 <option value="MAN">MAN</option>
//                                 <option value="DAF">DAF</option>
//                                 <option value="Iveco">Iveco</option>
//                                 <option value="Renault">Renault</option>
//                                 <option value="Isuzu">Isuzu</option>
//                                 <option value="Mitsubishi">Mitsubishi</option>
//                                 <option value="Other">Autre</option>
//                             </select>
//                             {errors.make && <span style={styles.errorMessage}>{errors.make}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="model" style={styles.label}>Modèle *</label>
//                             <input
//                                 type="text"
//                                 id="model"
//                                 name="model"
//                                 value={formData.model}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.model ? styles.inputError : {}) }}
//                                 placeholder="Entrez le modèle"
//                             />
//                             {errors.model && <span style={styles.errorMessage}>{errors.model}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="year" style={styles.label}>Année *</label>
//                             <input
//                                 type="number"
//                                 id="year"
//                                 name="year"
//                                 value={formData.year}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.year ? styles.inputError : {}) }}
//                                 min="1990"
//                                 max={new Date().getFullYear() + 1}
//                                 placeholder="AAAA"
//                             />
//                             {errors.year && <span style={styles.errorMessage}>{errors.year}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="color" style={styles.label}>Couleur</label>
//                             <input
//                                 type="text"
//                                 id="color"
//                                 name="color"
//                                 value={formData.color}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Couleur du véhicule"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="fuelType" style={styles.label}>Type de carburant</label>
//                             <select
//                                 id="fuelType"
//                                 name="fuelType"
//                                 value={formData.fuelType}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="Diesel">Diesel</option>
//                                 <option value="Gasoline">Essence</option>
//                                 <option value="Electric">Électrique</option>
//                                 <option value="Hybrid">Hybride</option>
//                                 <option value="CNG">GNC (Gaz naturel comprimé)</option>
//                             </select>
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
//                                 <option value="Container">Camion conteneur</option>
//                                 <option value="Flatbed">Plateau</option>
//                                 <option value="Tanker">Citerne</option>
//                                 <option value="Refrigerated">Frigorifique</option>
//                                 <option value="Dump Truck">Benne</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="cargoType" style={styles.label}>Type de cargaison principale</label>
//                             <select
//                                 id="cargoType"
//                                 name="cargoType"
//                                 value={formData.cargoType}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="Container">Conteneur</option>
//                                 <option value="Bulk">Cargaison en vrac</option>
//                                 <option value="General">Cargaison générale</option>
//                                 <option value="Liquid">Liquide</option>
//                                 <option value="Hazardous">Matériaux dangereux</option>
//                                 <option value="Refrigerated">Produits réfrigérés</option>
//                                 <option value="Heavy Machinery">Machines lourdes</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="maxWeight" style={styles.label}>Poids maximal (tonnes) *</label>
//                             <input
//                                 type="number"
//                                 id="maxWeight"
//                                 name="maxWeight"
//                                 value={formData.maxWeight}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.maxWeight ? styles.inputError : {}) }}
//                                 min="1"
//                                 max="100"
//                                 step="0.1"
//                                 placeholder="ex : 25.5"
//                             />
//                             {errors.maxWeight && <span style={styles.errorMessage}>{errors.maxWeight}</span>}
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Dimensions</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="dimensions.length" style={styles.label}>Longueur (m)</label>
//                             <input
//                                 type="number"
//                                 id="dimensions.length"
//                                 name="dimensions.length"
//                                 value={formData.dimensions.length}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 step="0.1"
//                                 placeholder="ex : 12.5"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="dimensions.width" style={styles.label}>Largeur (m)</label>
//                             <input
//                                 type="number"
//                                 id="dimensions.width"
//                                 name="dimensions.width"
//                                 value={formData.dimensions.width}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 step="0.1"
//                                 placeholder="ex : 2.5"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="dimensions.height" style={styles.label}>Hauteur (m)</label>
//                             <input
//                                 type="number"
//                                 id="dimensions.height"
//                                 name="dimensions.height"
//                                 value={formData.dimensions.height}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 step="0.1"
//                                 placeholder="ex : 4.0"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Enregistrement & Documentation</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="registrationDate" style={styles.label}>Date d'enregistrement</label>
//                             <input
//                                 type="date"
//                                 id="registrationDate"
//                                 name="registrationDate"
//                                 value={formData.registrationDate}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="registrationExpiry" style={styles.label}>Expiration de l'enregistrement</label>
//                             <input
//                                 type="date"
//                                 id="registrationExpiry"
//                                 name="registrationExpiry"
//                                 value={formData.registrationExpiry}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="inspectionDate" style={styles.label}>Date de la dernière inspection</label>
//                             <input
//                                 type="date"
//                                 id="inspectionDate"
//                                 name="inspectionDate"
//                                 value={formData.inspectionDate}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="inspectionExpiry" style={styles.label}>Expiration de l'inspection</label>
//                             <input
//                                 type="date"
//                                 id="inspectionExpiry"
//                                 name="inspectionExpiry"
//                                 value={formData.inspectionExpiry}
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
//                             <label htmlFor="insuranceExpiry" style={styles.label}>Expiration de l'assurance</label>
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
//                     <h3 style={styles.sectionTitle}>Informations sur le propriétaire</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="ownerType" style={styles.label}>Type de propriétaire</label>
//                             <select
//                                 id="ownerType"
//                                 name="ownerType"
//                                 value={formData.ownerType}
//                                 onChange={handleChange}
//                                 style={styles.select}
//                             >
//                                 <option value="Company">Entreprise</option>
//                                 <option value="Individual">Individuel</option>
//                                 <option value="Cooperative">Coopérative</option>
//                             </select>
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="ownerName" style={styles.label}>Nom du propriétaire *</label>
//                             <input
//                                 type="text"
//                                 id="ownerName"
//                                 name="ownerName"
//                                 value={formData.ownerName}
//                                 onChange={handleChange}
//                                 style={{ ...styles.input, ...(errors.ownerName ? styles.inputError : {}) }}
//                                 placeholder="Nom du propriétaire/entreprise"
//                             />
//                             {errors.ownerName && <span style={styles.errorMessage}>{errors.ownerName}</span>}
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="ownerContact" style={styles.label}>Contact du propriétaire</label>
//                             <input
//                                 type="tel"
//                                 id="ownerContact"
//                                 name="ownerContact"
//                                 value={formData.ownerContact}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="+228 XX XX XX XX"
//                             />
//                         </div>

//                         <div style={styles.formGroup}>
//                             <label htmlFor="driverAssigned" style={styles.label}>Chauffeur assigné</label>
//                             <input
//                                 type="text"
//                                 id="driverAssigned"
//                                 name="driverAssigned"
//                                 value={formData.driverAssigned}
//                                 onChange={handleChange}
//                                 style={styles.input}
//                                 placeholder="Nom du chauffeur principal"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Suivi & Équipement</h3>
//                     <div style={styles.grid}>
//                         <div style={styles.formGroup}>
//                             <label style={styles.checkboxLabel}>
//                                 <input
//                                     type="checkbox"
//                                     name="gpsInstalled"
//                                     checked={formData.gpsInstalled}
//                                     onChange={handleChange}
//                                     style={styles.checkbox}
//                                 />
//                                 <span style={styles.checkboxText}>GPS installé</span>
//                             </label>
//                         </div>

//                         {formData.gpsInstalled && (
//                             <div style={styles.formGroup}>
//                                 <label htmlFor="trackingDeviceId" style={styles.label}>ID du dispositif de suivi</label>
//                                 <input
//                                     type="text"
//                                     id="trackingDeviceId"
//                                     name="trackingDeviceId"
//                                     value={formData.trackingDeviceId}
//                                     onChange={handleChange}
//                                     style={styles.input}
//                                     placeholder="ID ou IMEI du dispositif"
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Équipements spéciaux</h3>
//                     <div style={styles.checkboxGrid}>
//                         {[
//                             'Grue',
//                             'Lift hydraulique',
//                             'Unité de réfrigération',
//                             'Système de réservoir',
//                             'Équipement Hazmat',
//                             'Rampes de chargement',
//                             'Points d’arrimage',
//                             'Système de bâche'
//                         ].map((equipment) => (
//                             <label key={equipment} style={styles.checkboxLabel}>
//                                 <input
//                                     type="checkbox"
//                                     name="specialEquipment"
//                                     value={equipment}
//                                     checked={formData.specialEquipment.includes(equipment)}
//                                     onChange={handleChange}
//                                     style={styles.checkbox}
//                                 />
//                                 <span style={styles.checkboxText}>{equipment}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div style={styles.section}>
//                     <h3 style={styles.sectionTitle}>Permis d'exploitation</h3>
//                     <div style={styles.checkboxGrid}>
//                         {[
//                             "Permis d'accès au port",
//                             "Permis matières dangereuses",
//                             "Permis de transport de charges hors gabarit",
//                             "Permis de transport international",
//                             "Licence de transport de conteneurs",
//                             "Licence de cargaison en vrac"
//                         ].map(permit => (
//                             <label key={permit} style={styles.checkboxLabel}>
//                                 <input
//                                     type="checkbox"
//                                     name="operatingPermits"
//                                     value={permit}
//                                     checked={formData.operatingPermits.includes(permit)}
//                                     onChange={handleChange}
//                                     style={styles.checkbox}
//                                 />
//                                 <span style={styles.checkboxText}>{permit}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div style={styles.actions}>
//                     <button type="button" onClick={handleCancel} style={styles.cancelButton}>
//                         Annuler
//                     </button>
//                     <button type="submit" style={styles.submitButton}>
//                         Enregistrer le camion
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

// export default TruckRegistration


import { useState } from 'react'

const TruckRegistration = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    plateNumber: '',
    chassisNumber: '',
    engineNumber: '',
    make: '',
    model: '',
    year: '',
    color: '',
    fuelType: 'Diesel',
    truckType: 'Standard',
    cargoType: 'Container',
    maxWeight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    registrationDate: '',
    registrationExpiry: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    insuranceExpiry: '',
    inspectionDate: '',
    inspectionExpiry: '',
    ownerType: 'Company',
    ownerName: '',
    ownerContact: '',
    driverAssigned: '',
    gpsInstalled: false,
    trackingDeviceId: '',
    specialEquipment: [],
    certifications: [],
    operatingPermits: []
  })

  const [errors, setErrors] = useState({})

  const steps = [
    { id: 1, title: 'Vehicle', icon: '🚛' },
    { id: 2, title: 'Details', icon: '📋' },
    { id: 3, title: 'Owner', icon: '👤' },
    { id: 4, title: 'Complete', icon: '✓' }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      if (name === 'gpsInstalled') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }))
      } else if (['specialEquipment', 'certifications', 'operatingPermits'].includes(name)) {
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }))
      }
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
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
        if (!formData.plateNumber.trim()) newErrors.plateNumber = 'Plate number is required'
        if (!formData.chassisNumber.trim()) newErrors.chassisNumber = 'Chassis number is required'

        const plateRegex = /^[A-Z]{2}-\d{4}-[A-Z]{2}$/
        if (formData.plateNumber && !plateRegex.test(formData.plateNumber)) {
          newErrors.plateNumber = 'Plate number format should be XX-0000-XX'
        }
        break
      case 2:
        if (!formData.make.trim()) newErrors.make = 'Make is required'
        if (!formData.model.trim()) newErrors.model = 'Model is required'
        if (!formData.year) newErrors.year = 'Year is required'
        if (!formData.maxWeight) newErrors.maxWeight = 'Maximum weight is required'
        break
      case 3:
        if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required'
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
        console.log('Truck registration data:', formData)
        alert('Truck registered successfully!')
      }
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
        setFormData({
          plateNumber: '',
          chassisNumber: '',
          engineNumber: '',
          make: '',
          model: '',
          year: '',
          color: '',
          fuelType: 'Diesel',
          truckType: 'Standard',
          cargoType: 'Container',
          maxWeight: '',
          dimensions: {
            length: '',
            width: '',
            height: ''
          },
          registrationDate: '',
          registrationExpiry: '',
          insuranceProvider: '',
          insurancePolicyNumber: '',
          insuranceExpiry: '',
          inspectionDate: '',
          inspectionExpiry: '',
          ownerType: 'Company',
          ownerName: '',
          ownerContact: '',
          driverAssigned: '',
          gpsInstalled: false,
          trackingDeviceId: '',
          specialEquipment: [],
          certifications: [],
          operatingPermits: []
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
            <h3 style={styles.stepTitle}>Vehicle Identification</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Plate Number *</label>
                <input
                  type="text"
                  name="plateNumber"
                  value={formData.plateNumber}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.plateNumber ? styles.inputError : {}), textTransform: 'uppercase' }}
                  placeholder="TG-1234-AB"
                />
                {errors.plateNumber && <span style={styles.errorMessage}>{errors.plateNumber}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Chassis Number *</label>
                <input
                  type="text"
                  name="chassisNumber"
                  value={formData.chassisNumber}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.chassisNumber ? styles.inputError : {}) }}
                  placeholder="Enter chassis number"
                />
                {errors.chassisNumber && <span style={styles.errorMessage}>{errors.chassisNumber}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Engine Number</label>
                <input
                  type="text"
                  name="engineNumber"
                  value={formData.engineNumber}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter engine number"
                />
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
                  <option value="Dump Truck">Dump Truck</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Primary Cargo Type</label>
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
                  <option value="Heavy Machinery">Heavy Machinery</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Vehicle Details</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Make *</label>
                <select
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  style={{ ...styles.select, ...(errors.make ? styles.inputError : {}) }}
                >
                  <option value="">Select make</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Volvo">Volvo</option>
                  <option value="Scania">Scania</option>
                  <option value="MAN">MAN</option>
                  <option value="DAF">DAF</option>
                  <option value="Iveco">Iveco</option>
                  <option value="Renault">Renault</option>
                  <option value="Isuzu">Isuzu</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Other">Other</option>
                </select>
                {errors.make && <span style={styles.errorMessage}>{errors.make}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.model ? styles.inputError : {}) }}
                  placeholder="Enter model"
                />
                {errors.model && <span style={styles.errorMessage}>{errors.model}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.year ? styles.inputError : {}) }}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  placeholder="YYYY"
                />
                {errors.year && <span style={styles.errorMessage}>{errors.year}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Vehicle color"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG (Compressed Natural Gas)</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Maximum Weight (tons) *</label>
                <input
                  type="number"
                  name="maxWeight"
                  value={formData.maxWeight}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.maxWeight ? styles.inputError : {}) }}
                  min="1"
                  max="100"
                  step="0.1"
                  placeholder="e.g., 25.5"
                />
                {errors.maxWeight && <span style={styles.errorMessage}>{errors.maxWeight}</span>}
              </div>
            </div>

            <div style={styles.dimensionsSection}>
              <label style={styles.label}>Dimensions (meters)</label>
              <div style={styles.dimensionsGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.smallLabel}>Length</label>
                  <input
                    type="number"
                    name="dimensions.length"
                    value={formData.dimensions.length}
                    onChange={handleChange}
                    style={styles.input}
                    step="0.1"
                    placeholder="12.5"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.smallLabel}>Width</label>
                  <input
                    type="number"
                    name="dimensions.width"
                    value={formData.dimensions.width}
                    onChange={handleChange}
                    style={styles.input}
                    step="0.1"
                    placeholder="2.5"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.smallLabel}>Height</label>
                  <input
                    type="number"
                    name="dimensions.height"
                    value={formData.dimensions.height}
                    onChange={handleChange}
                    style={styles.input}
                    step="0.1"
                    placeholder="4.0"
                  />
                </div>
              </div>
            </div>

            <div style={styles.documentsSection}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Registration Date</label>
                  <input
                    type="date"
                    name="registrationDate"
                    value={formData.registrationDate}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Registration Expiry</label>
                  <input
                    type="date"
                    name="registrationExpiry"
                    value={formData.registrationExpiry}
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
            </div>
          </div>
        )

      case 3:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Ownership & Equipment</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Owner Type</label>
                <select
                  name="ownerType"
                  value={formData.ownerType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Company">Company</option>
                  <option value="Individual">Individual</option>
                  <option value="Cooperative">Cooperative</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Owner Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.ownerName ? styles.inputError : {}) }}
                  placeholder="Owner/Company name"
                />
                {errors.ownerName && <span style={styles.errorMessage}>{errors.ownerName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Owner Contact</label>
                <input
                  type="tel"
                  name="ownerContact"
                  value={formData.ownerContact}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="+228 XX XX XX XX"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Assigned Driver</label>
                <input
                  type="text"
                  name="driverAssigned"
                  value={formData.driverAssigned}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Primary driver name"
                />
              </div>
            </div>

            <div style={styles.trackingSection}>
              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="gpsInstalled"
                    checked={formData.gpsInstalled}
                    onChange={handleChange}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>GPS Tracking Installed</span>
                </label>
              </div>

              {formData.gpsInstalled && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Tracking Device ID</label>
                  <input
                    type="text"
                    name="trackingDeviceId"
                    value={formData.trackingDeviceId}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Device ID or IMEI"
                  />
                </div>
              )}
            </div>

            <div style={styles.equipmentSection}>
              <label style={styles.label}>Special Equipment</label>
              <div style={styles.checkboxGrid}>
                {[
                  'Crane',
                  'Hydraulic Lift',
                  'Refrigeration Unit',
                  'Tank System',
                  'Hazmat Equipment',
                  'Loading Ramps'
                ].map(equipment => (
                  <label key={equipment} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="specialEquipment"
                      value={equipment}
                      checked={formData.specialEquipment.includes(equipment)}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span style={styles.checkboxText}>{equipment}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.permitsSection}>
              <label style={styles.label}>Operating Permits</label>
              <div style={styles.checkboxGrid}>
                {[
                  'Port Access Permit',
                  'Hazardous Materials Permit',
                  'Oversize Load Permit',
                  'International Transport Permit',
                  'Container Transport License',
                  'Bulk Cargo License'
                ].map(permit => (
                  <label key={permit} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="operatingPermits"
                      value={permit}
                      checked={formData.operatingPermits.includes(permit)}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span style={styles.checkboxText}>{permit}</span>
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
                  <h4 style={styles.summaryTitle}>Vehicle Info</h4>
                  <p><strong>Plate:</strong> {formData.plateNumber}</p>
                  <p><strong>Make/Model:</strong> {formData.make} {formData.model}</p>
                  <p><strong>Year:</strong> {formData.year}</p>
                  <p><strong>Type:</strong> {formData.truckType}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Specifications</h4>
                  <p><strong>Max Weight:</strong> {formData.maxWeight} tons</p>
                  <p><strong>Fuel:</strong> {formData.fuelType}</p>
                  <p><strong>Cargo Type:</strong> {formData.cargoType}</p>
                  <p><strong>Color:</strong> {formData.color || 'Not specified'}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Owner</h4>
                  <p><strong>Owner:</strong> {formData.ownerName}</p>
                  <p><strong>Type:</strong> {formData.ownerType}</p>
                  <p><strong>Driver:</strong> {formData.driverAssigned || 'Not assigned'}</p>
                  <p><strong>GPS:</strong> {formData.gpsInstalled ? 'Installed' : 'Not installed'}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Equipment & Permits</h4>
                  <p><strong>Equipment:</strong> {formData.specialEquipment.length} items</p>
                  <p><strong>Permits:</strong> {formData.operatingPermits.length} permits</p>
                  <p><strong>Insurance:</strong> {formData.insuranceProvider || 'Not provided'}</p>
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
        <h2 style={styles.title}>REGISTER NEW TRUCK</h2>
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
    position: 'relative',
    maxWidth: '800px',
    margin: '10px 0px 10px 0px',
    padding: '20px',
    left: '250px',
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
  //   stepConnector: {
  //     position: 'absolute',
  //     top: '24px',
  //     left: '60%',
  //     right: '-40%',
  //     height: '2px',
  //     backgroundColor: '#e5e7eb',
  //     transition: 'all 0.3s ease'
  //   },
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
  smallLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280'
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
  dimensionsSection: {
    marginTop: '24px'
  },
  dimensionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginTop: '12px'
  },
  documentsSection: {
    marginTop: '24px'
  },
  trackingSection: {
    marginTop: '24px'
  },
  equipmentSection: {
    marginTop: '24px'
  },
  permitsSection: {
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

export default TruckRegistration