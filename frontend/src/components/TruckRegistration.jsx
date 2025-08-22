import { useState } from 'react'

const TruckRegistration = ({ onSubmit, onCancel }) => {
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

    const validateForm = () => {
        const newErrors = {}

        if (!formData.plateNumber.trim()) newErrors.plateNumber = 'Plate number is required'
        if (!formData.chassisNumber.trim()) newErrors.chassisNumber = 'Chassis number is required'
        if (!formData.make.trim()) newErrors.make = 'Make is required'
        if (!formData.model.trim()) newErrors.model = 'Model is required'
        if (!formData.year) newErrors.year = 'Year is required'
        if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required'
        if (!formData.maxWeight) newErrors.maxWeight = 'Maximum weight is required'

        // Plate number format validation (basic)
        const plateRegex = /^[A-Z]{2}-\d{4}-[A-Z]{2}$/
        if (formData.plateNumber && !plateRegex.test(formData.plateNumber)) {
            newErrors.plateNumber = 'Plate number format should be XX-0000-XX'
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
            }
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Enregistrement du camion</h2>
                <p style={styles.subtitle}>Enregistrez un nouveau camion pour les opérations portuaires</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Identification du véhicule</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="plateNumber" style={styles.label}>Numéro de plaque *</label>
                            <input
                                type="text"
                                id="plateNumber"
                                name="plateNumber"
                                value={formData.plateNumber}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.plateNumber ? styles.inputError : {}), textTransform: 'uppercase' }}
                                placeholder="TG-1234-AB"
                            />
                            {errors.plateNumber && <span style={styles.errorMessage}>{errors.plateNumber}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="chassisNumber" style={styles.label}>Numéro de châssis *</label>
                            <input
                                type="text"
                                id="chassisNumber"
                                name="chassisNumber"
                                value={formData.chassisNumber}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.chassisNumber ? styles.inputError : {}) }}
                                placeholder="Entrez le numéro de châssis"
                            />
                            {errors.chassisNumber && <span style={styles.errorMessage}>{errors.chassisNumber}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="engineNumber" style={styles.label}>Numéro de moteur</label>
                            <input
                                type="text"
                                id="engineNumber"
                                name="engineNumber"
                                value={formData.engineNumber}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Entrez le numéro de moteur"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Détails du véhicule</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="make" style={styles.label}>Marque *</label>
                            <select
                                id="make"
                                name="make"
                                value={formData.make}
                                onChange={handleChange}
                                style={{ ...styles.select, ...(errors.make ? styles.inputError : {}) }}
                            >
                                <option value="">Sélectionnez la marque</option>
                                <option value="Mercedes-Benz">Mercedes-Benz</option>
                                <option value="Volvo">Volvo</option>
                                <option value="Scania">Scania</option>
                                <option value="MAN">MAN</option>
                                <option value="DAF">DAF</option>
                                <option value="Iveco">Iveco</option>
                                <option value="Renault">Renault</option>
                                <option value="Isuzu">Isuzu</option>
                                <option value="Mitsubishi">Mitsubishi</option>
                                <option value="Other">Autre</option>
                            </select>
                            {errors.make && <span style={styles.errorMessage}>{errors.make}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="model" style={styles.label}>Modèle *</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.model ? styles.inputError : {}) }}
                                placeholder="Entrez le modèle"
                            />
                            {errors.model && <span style={styles.errorMessage}>{errors.model}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="year" style={styles.label}>Année *</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.year ? styles.inputError : {}) }}
                                min="1990"
                                max={new Date().getFullYear() + 1}
                                placeholder="AAAA"
                            />
                            {errors.year && <span style={styles.errorMessage}>{errors.year}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="color" style={styles.label}>Couleur</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Couleur du véhicule"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="fuelType" style={styles.label}>Type de carburant</label>
                            <select
                                id="fuelType"
                                name="fuelType"
                                value={formData.fuelType}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="Diesel">Diesel</option>
                                <option value="Gasoline">Essence</option>
                                <option value="Electric">Électrique</option>
                                <option value="Hybrid">Hybride</option>
                                <option value="CNG">GNC (Gaz naturel comprimé)</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="truckType" style={styles.label}>Type de camion</label>
                            <select
                                id="truckType"
                                name="truckType"
                                value={formData.truckType}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="Standard">Camion standard</option>
                                <option value="Heavy Duty">Poids lourd</option>
                                <option value="Container">Camion conteneur</option>
                                <option value="Flatbed">Plateau</option>
                                <option value="Tanker">Citerne</option>
                                <option value="Refrigerated">Frigorifique</option>
                                <option value="Dump Truck">Benne</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="cargoType" style={styles.label}>Type de cargaison principale</label>
                            <select
                                id="cargoType"
                                name="cargoType"
                                value={formData.cargoType}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="Container">Conteneur</option>
                                <option value="Bulk">Cargaison en vrac</option>
                                <option value="General">Cargaison générale</option>
                                <option value="Liquid">Liquide</option>
                                <option value="Hazardous">Matériaux dangereux</option>
                                <option value="Refrigerated">Produits réfrigérés</option>
                                <option value="Heavy Machinery">Machines lourdes</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="maxWeight" style={styles.label}>Poids maximal (tonnes) *</label>
                            <input
                                type="number"
                                id="maxWeight"
                                name="maxWeight"
                                value={formData.maxWeight}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.maxWeight ? styles.inputError : {}) }}
                                min="1"
                                max="100"
                                step="0.1"
                                placeholder="ex : 25.5"
                            />
                            {errors.maxWeight && <span style={styles.errorMessage}>{errors.maxWeight}</span>}
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Dimensions</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="dimensions.length" style={styles.label}>Longueur (m)</label>
                            <input
                                type="number"
                                id="dimensions.length"
                                name="dimensions.length"
                                value={formData.dimensions.length}
                                onChange={handleChange}
                                style={styles.input}
                                step="0.1"
                                placeholder="ex : 12.5"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="dimensions.width" style={styles.label}>Largeur (m)</label>
                            <input
                                type="number"
                                id="dimensions.width"
                                name="dimensions.width"
                                value={formData.dimensions.width}
                                onChange={handleChange}
                                style={styles.input}
                                step="0.1"
                                placeholder="ex : 2.5"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="dimensions.height" style={styles.label}>Hauteur (m)</label>
                            <input
                                type="number"
                                id="dimensions.height"
                                name="dimensions.height"
                                value={formData.dimensions.height}
                                onChange={handleChange}
                                style={styles.input}
                                step="0.1"
                                placeholder="ex : 4.0"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Enregistrement & Documentation</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="registrationDate" style={styles.label}>Date d'enregistrement</label>
                            <input
                                type="date"
                                id="registrationDate"
                                name="registrationDate"
                                value={formData.registrationDate}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="registrationExpiry" style={styles.label}>Expiration de l'enregistrement</label>
                            <input
                                type="date"
                                id="registrationExpiry"
                                name="registrationExpiry"
                                value={formData.registrationExpiry}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="inspectionDate" style={styles.label}>Date de la dernière inspection</label>
                            <input
                                type="date"
                                id="inspectionDate"
                                name="inspectionDate"
                                value={formData.inspectionDate}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="inspectionExpiry" style={styles.label}>Expiration de l'inspection</label>
                            <input
                                type="date"
                                id="inspectionExpiry"
                                name="inspectionExpiry"
                                value={formData.inspectionExpiry}
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
                            <label htmlFor="insuranceExpiry" style={styles.label}>Expiration de l'assurance</label>
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
                    <h3 style={styles.sectionTitle}>Informations sur le propriétaire</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="ownerType" style={styles.label}>Type de propriétaire</label>
                            <select
                                id="ownerType"
                                name="ownerType"
                                value={formData.ownerType}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="Company">Entreprise</option>
                                <option value="Individual">Individuel</option>
                                <option value="Cooperative">Coopérative</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="ownerName" style={styles.label}>Nom du propriétaire *</label>
                            <input
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.ownerName ? styles.inputError : {}) }}
                                placeholder="Nom du propriétaire/entreprise"
                            />
                            {errors.ownerName && <span style={styles.errorMessage}>{errors.ownerName}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="ownerContact" style={styles.label}>Contact du propriétaire</label>
                            <input
                                type="tel"
                                id="ownerContact"
                                name="ownerContact"
                                value={formData.ownerContact}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="driverAssigned" style={styles.label}>Chauffeur assigné</label>
                            <input
                                type="text"
                                id="driverAssigned"
                                name="driverAssigned"
                                value={formData.driverAssigned}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Nom du chauffeur principal"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Suivi & Équipement</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="gpsInstalled"
                                    checked={formData.gpsInstalled}
                                    onChange={handleChange}
                                    style={styles.checkbox}
                                />
                                <span style={styles.checkboxText}>GPS installé</span>
                            </label>
                        </div>

                        {formData.gpsInstalled && (
                            <div style={styles.formGroup}>
                                <label htmlFor="trackingDeviceId" style={styles.label}>ID du dispositif de suivi</label>
                                <input
                                    type="text"
                                    id="trackingDeviceId"
                                    name="trackingDeviceId"
                                    value={formData.trackingDeviceId}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder="ID ou IMEI du dispositif"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Équipements spéciaux</h3>
                    <div style={styles.checkboxGrid}>
                        {[
                            'Grue',
                            'Lift hydraulique',
                            'Unité de réfrigération',
                            'Système de réservoir',
                            'Équipement Hazmat',
                            'Rampes de chargement',
                            'Points d’arrimage',
                            'Système de bâche'
                        ].map((equipment) => (
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

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Permis d'exploitation</h3>
                    <div style={styles.checkboxGrid}>
                        {[
                            "Permis d'accès au port",
                            "Permis matières dangereuses",
                            "Permis de transport de charges hors gabarit",
                            "Permis de transport international",
                            "Licence de transport de conteneurs",
                            "Licence de cargaison en vrac"
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

                <div style={styles.actions}>
                    <button type="button" onClick={handleCancel} style={styles.cancelButton}>
                        Annuler
                    </button>
                    <button type="submit" style={styles.submitButton}>
                        Enregistrer le camion
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

export default TruckRegistration