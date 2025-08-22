import { useState } from 'react'
/* Traductions françaises pour les labels, options et textes */
const FR = {
    basicInfo: "Informations de base du créneau",
    slotDate: "Date du créneau *",
    startTime: "Heure de début *",
    endTime: "Heure de fin *",
    duration: "Durée",
    durationPlaceholder: "Calcul automatique",
    routeConfig: "Configuration de l'itinéraire",
    originGate: "Porte d'origine",
    destinationTerminal: "Terminal de destination",
    routeStops: "Arrêts de l'itinéraire",
    location: "Emplacement",
    estimatedTime: "Heure estimée",
    transferTime: "Temps de transfert (min)",
    remove: "Supprimer",
    addRouteStop: "Ajouter un arrêt",
    capacityPricing: "Capacité et tarification",
    totalSlots: "Nombre total de créneaux *",
    reservedSlots: "Créneaux pré-réservés",
    basePrice: "Prix de base *",
    currency: "Devise",
    facilities: "Installations disponibles",
    restrictions: "Restrictions des véhicules",
    maxWeight: "Poids maximal (tonnes)",
    truckTypes: "Types de camions autorisés",
    cargoTypes: "Types de cargaison autorisés",
    operationalDetails: "Détails opérationnels",
    operatorName: "Nom de l'opérateur *",
    contactPerson: "Personne de contact *",
    contactPhone: "Téléphone de contact",
    specialInstructions: "Instructions spéciales",
    statusSettings: "Statut et paramètres",
    status: "Statut",
    visibility: "Visibilité",
    autoConfirm: "Confirmation automatique des réservations",
    cancel: "Annuler",
    createSlot: "Créer le créneau",
    headerTitle: "Créer un nouveau créneau",
    headerSubtitle: "Créez un nouveau créneau horaire pour la gestion du trafic des camions",
    errorSlotDate: "La date du créneau est requise",
    errorStartTime: "L'heure de début est requise",
    errorEndTime: "L'heure de fin est requise",
    errorTotalSlots: "Le nombre total de créneaux doit être au moins 1",
    errorBasePrice: "Le prix de base est requis",
    errorOperatorName: "Le nom de l'opérateur est requis",
    errorContactPerson: "La personne de contact est requise",
    errorEndTimeOrder: "L'heure de fin doit être après l'heure de début",
    errorSlotDatePast: "La date du créneau ne peut pas être dans le passé",
    slotCreated: "Créneau créé avec succès !",
    cancelConfirm: "Êtes-vous sûr de vouloir annuler ? Toutes les données seront perdues.",
    facilitiesList: [
        "Pont bascule",
        "Inspection douanière",
        "Contrôle de sécurité",
        "Zone de stationnement",
        "Chargement/Déchargement",
        "Centre de documentation",
        "Station-service",
        "Service de maintenance"
    ],
    truckTypesList: [
        "Camion standard",
        "Poids lourd",
        "Camion porte-conteneurs",
        "Plateau",
        "Citerne",
        "Réfrigéré",
        "Camion benne"
    ],
    cargoTypesList: [
        "Conteneur",
        "Marchandises en vrac",
        "Marchandises générales",
        "Liquide",
        "Matières dangereuses",
        "Produits réfrigérés",
        "Machines lourdes"
    ],
    statusOptions: [
        { value: "active", label: "Actif" },
        { value: "inactive", label: "Inactif" },
        { value: "maintenance", label: "En maintenance" },
        { value: "suspended", label: "Suspendu" }
    ],
    visibilityOptions: [
        { value: "public", label: "Public" },
        { value: "private", label: "Privé" },
        { value: "restricted", label: "Restreint" }
    ],
    currencyOptions: [
        { value: "CFA", label: "Franc CFA" },
        { value: "USD", label: "Dollar US" },
        { value: "EUR", label: "Euro" }
    ]
}
const AdminSlotCreation = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        // Basic Slot Information
        slotDate: '',
        startTime: '',
        endTime: '',
        duration: '',

        // Route Information
        originGate: 'Gate A1',
        destinationTerminal: 'Terminal 3',
        routeStops: [
            { location: 'Gate A1', estimatedTime: '', transferTime: '15' },
            { location: 'Weighbridge', estimatedTime: '', transferTime: '20' },
            { location: 'Terminal 3', estimatedTime: '', transferTime: '0' }
        ],

        // Capacity and Availability
        totalSlots: 20,
        availableSlots: 20,
        reservedSlots: 0,

        // Pricing
        basePrice: 45000,
        currency: 'CFA',
        priceFactors: {
            priority: 0,
            additionalServices: 0,
            peakHours: 0
        },

        // Facilities and Services
        availableFacilities: [],
        requiredDocuments: [],

        // Restrictions and Requirements
        truckTypes: [],
        cargoTypes: [],
        maxWeight: '',
        maxDimensions: {
            length: '',
            width: '',
            height: ''
        },

        // Operational Details
        operatorName: '',
        contactPerson: '',
        contactPhone: '',
        specialInstructions: '',

        // Status and Visibility
        status: 'active',
        visibility: 'public',
        autoConfirm: true,

        // Recurring Settings
        isRecurring: false,
        recurringPattern: 'daily',
        recurringEndDate: '',
        recurringDays: []
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            if (['availableFacilities', 'requiredDocuments', 'truckTypes', 'cargoTypes', 'recurringDays'].includes(name)) {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                        ? [...prev[name], value]
                        : prev[name].filter(item => item !== value)
                }))
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
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

    const handleRouteStopChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            routeStops: prev.routeStops.map((stop, i) =>
                i === index ? { ...stop, [field]: value } : stop
            )
        }))
    }

    const addRouteStop = () => {
        setFormData(prev => ({
            ...prev,
            routeStops: [...prev.routeStops, { location: '', estimatedTime: '', transferTime: '0' }]
        }))
    }

    const removeRouteStop = (index) => {
        if (formData.routeStops.length > 2) {
            setFormData(prev => ({
                ...prev,
                routeStops: prev.routeStops.filter((_, i) => i !== index)
            }))
        }
    }

    const calculateDuration = () => {
        if (formData.startTime && formData.endTime) {
            const start = new Date(`2000-01-01T${formData.startTime}`)
            const end = new Date(`2000-01-01T${formData.endTime}`)
            const diffMs = end - start
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

            if (diffHours > 0 || diffMinutes > 0) {
                const duration = `${diffHours}h ${diffMinutes}m`
                setFormData(prev => ({ ...prev, duration }))
            }
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.slotDate) newErrors.slotDate = 'Slot date is required'
        if (!formData.startTime) newErrors.startTime = 'Start time is required'
        if (!formData.endTime) newErrors.endTime = 'End time is required'
        if (!formData.totalSlots || formData.totalSlots < 1) newErrors.totalSlots = 'Total slots must be at least 1'
        if (!formData.basePrice || formData.basePrice < 0) newErrors.basePrice = 'Base price is required'
        if (!formData.operatorName.trim()) newErrors.operatorName = 'Operator name is required'
        if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required'

        // Time validation
        if (formData.startTime && formData.endTime) {
            const start = new Date(`2000-01-01T${formData.startTime}`)
            const end = new Date(`2000-01-01T${formData.endTime}`)
            if (end <= start) {
                newErrors.endTime = 'End time must be after start time'
            }
        }

        // Date validation
        if (formData.slotDate) {
            const slotDate = new Date(formData.slotDate)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (slotDate < today) {
                newErrors.slotDate = 'Slot date cannot be in the past'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        calculateDuration()

        if (validateForm()) {
            const slotData = {
                ...formData,
                id: `SLOT-${Date.now()}`,
                createdAt: new Date().toISOString(),
                createdBy: 'admin',
                availableSlots: formData.totalSlots - formData.reservedSlots
            }

            if (onSubmit) {
                onSubmit(slotData)
            } else {
                console.log('Admin slot creation data:', slotData)
                alert('Slot created successfully!')
            }
        }
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        } else {
            if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
                // Reset form to initial state
                setFormData({
                    slotDate: '',
                    startTime: '',
                    endTime: '',
                    duration: '',
                    originGate: 'Gate A1',
                    destinationTerminal: 'Terminal 3',
                    routeStops: [
                        { location: 'Gate A1', estimatedTime: '', transferTime: '15' },
                        { location: 'Weighbridge', estimatedTime: '', transferTime: '20' },
                        { location: 'Terminal 3', estimatedTime: '', transferTime: '0' }
                    ],
                    totalSlots: 20,
                    availableSlots: 20,
                    reservedSlots: 0,
                    basePrice: 45000,
                    currency: 'CFA',
                    priceFactors: {
                        priority: 0,
                        additionalServices: 0,
                        peakHours: 0
                    },
                    availableFacilities: [],
                    requiredDocuments: [],
                    truckTypes: [],
                    cargoTypes: [],
                    maxWeight: '',
                    maxDimensions: {
                        length: '',
                        width: '',
                        height: ''
                    },
                    operatorName: '',
                    contactPerson: '',
                    contactPhone: '',
                    specialInstructions: '',
                    status: 'active',
                    visibility: 'public',
                    autoConfirm: true,
                    isRecurring: false,
                    recurringPattern: 'daily',
                    recurringEndDate: '',
                    recurringDays: []
                })
                setErrors({})
            }
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>{FR.headerTitle}</h2>
                <p style={styles.subtitle}>{FR.headerSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{FR.basicInfo}</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="slotDate" style={styles.label}>{FR.slotDate}</label>
                            <input
                                type="date"
                                id="slotDate"
                                name="slotDate"
                                value={formData.slotDate}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.slotDate ? styles.inputError : {}) }}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.slotDate && <span style={styles.errorMessage}>{FR.errorSlotDate}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="startTime" style={styles.label}>{FR.startTime}</label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={(e) => {
                                    handleChange(e)
                                    setTimeout(calculateDuration, 100)
                                }}
                                style={{ ...styles.input, ...(errors.startTime ? styles.inputError : {}) }}
                            />
                            {errors.startTime && <span style={styles.errorMessage}>{FR.errorStartTime}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="endTime" style={styles.label}>{FR.endTime}</label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={(e) => {
                                    handleChange(e)
                                    setTimeout(calculateDuration, 100)
                                }}
                                style={{ ...styles.input, ...(errors.endTime ? styles.inputError : {}) }}
                            />
                            {errors.endTime && <span style={styles.errorMessage}>{FR.errorEndTime}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="duration" style={styles.label}>{FR.duration}</label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                readOnly
                                placeholder={FR.durationPlaceholder}
                                style={{ ...styles.input, backgroundColor: '#f9fafb', color: '#6b7280', cursor: 'not-allowed' }}
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{FR.routeConfig}</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="originGate" style={styles.label}>{FR.originGate}</label>
                            <select
                                id="originGate"
                                name="originGate"
                                value={formData.originGate}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="Gate A1">Porte A1</option>
                                <option value="Gate A2">Porte A2</option>
                                <option value="Gate B1">Porte B1</option>
                                <option value="Gate B2">Porte B2</option>
                                <option value="Gate C1">Porte C1</option>
                                <option value="Gate C2">Porte C2</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="destinationTerminal" style={styles.label}>{FR.destinationTerminal}</label>
                            <select
                                id="destinationTerminal"
                                name="destinationTerminal"
                                value={formData.destinationTerminal}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="Terminal 1">Terminal 1</option>
                                <option value="Terminal 2">Terminal 2</option>
                                <option value="Terminal 3">Terminal 3</option>
                                <option value="Container Yard">Parc à conteneurs</option>
                                <option value="Bulk Terminal">Terminal vrac</option>
                            </select>
                        </div>
                    </div>

                    <div style={styles.routeStops}>
                        <h4 style={styles.subsectionTitle}>{FR.routeStops}</h4>
                        {formData.routeStops.map((stop, index) => (
                            <div key={index} style={styles.routeStopConfig}>
                                <div style={styles.grid}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>{FR.location}</label>
                                        <input
                                            type="text"
                                            value={stop.location}
                                            onChange={(e) => handleRouteStopChange(index, 'location', e.target.value)}
                                            style={styles.input}
                                            placeholder={FR.location}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>{FR.estimatedTime}</label>
                                        <input
                                            type="time"
                                            value={stop.estimatedTime}
                                            onChange={(e) => handleRouteStopChange(index, 'estimatedTime', e.target.value)}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>{FR.transferTime}</label>
                                        <input
                                            type="number"
                                            value={stop.transferTime}
                                            onChange={(e) => handleRouteStopChange(index, 'transferTime', e.target.value)}
                                            style={styles.input}
                                            min="0"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        {formData.routeStops.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => removeRouteStop(index)}
                                                style={styles.removeButton}
                                            >
                                                {FR.remove}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addRouteStop} style={styles.addButton}>
                            {FR.addRouteStop}
                        </button>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{FR.capacityPricing}</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="totalSlots" style={styles.label}>{FR.totalSlots}</label>
                            <input
                                type="number"
                                id="totalSlots"
                                name="totalSlots"
                                value={formData.totalSlots}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.totalSlots ? styles.inputError : {}) }}
                                min="1"
                                max="100"
                            />
                            {errors.totalSlots && <span style={styles.errorMessage}>{FR.errorTotalSlots}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="reservedSlots" style={styles.label}>{FR.reservedSlots}</label>
                            <input
                                type="number"
                                id="reservedSlots"
                                name="reservedSlots"
                                value={formData.reservedSlots}
                                onChange={handleChange}
                                style={styles.input}
                                min="0"
                                max={formData.totalSlots}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="basePrice" style={styles.label}>{FR.basePrice}</label>
                            <input
                                type="number"
                                id="basePrice"
                                name="basePrice"
                                value={formData.basePrice}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.basePrice ? styles.inputError : {}) }}
                                min="0"
                                step="1000"
                            />
                            {errors.basePrice && <span style={styles.errorMessage}>{FR.errorBasePrice}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="currency" style={styles.label}>{FR.currency}</label>
                            <select
                                id="currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                {FR.currencyOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{FR.facilities}</h3>
                    <div style={styles.checkboxGrid}>
                        {FR.facilitiesList.map(facility => (
                            <label key={facility} style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="availableFacilities"
                                    value={facility}
                                    checked={formData.availableFacilities.includes(facility)}
                                    onChange={handleChange}
                                    style={styles.checkbox}
                                />
                                <span style={styles.checkboxText}>{facility}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{FR.restrictions}</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="maxWeight" style={styles.label}>{FR.maxWeight}</label>
                            <input
                                type="number"
                                id="maxWeight"
                                name="maxWeight"
                                value={formData.maxWeight}
                                onChange={handleChange}
                                style={styles.input}
                                min="1"
                                step="0.1"
                                placeholder="ex: 40"
                            />
                        </div>
                    </div>

                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>{FR.truckTypes}</h4>
                        <div style={styles.checkboxGrid}>
                            {FR.truckTypesList.map(type => (
                                <label key={type} style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="truckTypes"
                                        value={type}
                                        checked={formData.truckTypes.includes(type)}
                                        onChange={handleChange}
                                        style={styles.checkbox}
                                    />
                                    <span style={styles.checkboxText}>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>{FR.cargoTypes}</h4>
                        <div style={styles.checkboxGrid}>
                            {FR.cargoTypesList.map(type => (
                                <label key={type} style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="cargoTypes"
                                        value={type}
                                        checked={formData.cargoTypes.includes(type)}
                                        onChange={handleChange}
                                        style={styles.checkbox}
                                    />
                                    <span style={styles.checkboxText}>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{FR.operationalDetails}</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="operatorName" style={styles.label}>{FR.operatorName}</label>
                            <input
                                type="text"
                                id="operatorName"
                                name="operatorName"
                                value={formData.operatorName}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.operatorName ? styles.inputError : {}) }}
                                placeholder={FR.operatorName}
                            />
                            {errors.operatorName && <span style={styles.errorMessage}>{FR.errorOperatorName}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="contactPerson" style={styles.label}>{FR.contactPerson}</label>
                            <input
                                type="text"
                                id="contactPerson"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.contactPerson ? styles.inputError : {}) }}
                                placeholder={FR.contactPerson}
                            />
                            {errors.contactPerson && <span style={styles.errorMessage}>{FR.errorContactPerson}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="contactPhone" style={styles.label}>{FR.contactPhone}</label>
                            <input
                                type="tel"
                                id="contactPhone"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>
                    </div>

                    <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                        <label htmlFor="specialInstructions" style={styles.label}>{FR.specialInstructions}</label>
                        <textarea
                            id="specialInstructions"
                            name="specialInstructions"
                            value={formData.specialInstructions}
                            onChange={handleChange}
                            style={styles.textarea}
                            rows="4"
                            placeholder={FR.specialInstructions}
                        />
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{FR.statusSettings}</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="status" style={styles.label}>{FR.status}</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                {FR.statusOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="visibility" style={styles.label}>{FR.visibility}</label>
                            <select
                                id="visibility"
                                name="visibility"
                                value={formData.visibility}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                {FR.visibilityOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="autoConfirm"
                                    checked={formData.autoConfirm}
                                    onChange={handleChange}
                                    style={styles.checkbox}
                                />
                                <span style={styles.checkboxText}>{FR.autoConfirm}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div style={styles.actions}>
                    <button type="button" onClick={handleCancel} style={styles.cancelButton}>
                        {FR.cancel}
                    </button>
                    <button type="submit" style={styles.submitButton}>
                        {FR.createSlot}
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
    subsection: {
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb'
    },
    subsectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '12px'
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
    routeStops: {
        marginTop: '16px'
    },
    routeStopConfig: {
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        border: '1px solid #e5e7eb'
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
    addButton: {
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '1px solid #10b981',
        backgroundColor: '#10b981',
        color: '#ffffff'
    },
    removeButton: {
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '1px solid #ef4444',
        backgroundColor: '#ef4444',
        color: '#ffffff'
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

export default AdminSlotCreation