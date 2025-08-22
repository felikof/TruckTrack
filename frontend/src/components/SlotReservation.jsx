import { useState } from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const SlotReservation = ({ selectedSlot, onSubmit, onCancel }) => {
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

    function isValidPhone(phone) {
        const phoneNumber = parsePhoneNumberFromString(phone);
        return phoneNumber?.isValid() || false;
    }

    const validateForm = () => {
        const newErrors = {}

        // Required fields validation
        if (!formData.truckPlateNumber.trim()) newErrors.truckPlateNumber = 'Truck plate number is required'
        if (!formData.driverName.trim()) newErrors.driverName = 'Driver name is required'
        if (!formData.driverLicense.trim()) newErrors.driverLicense = 'Driver license is required'
        if (!formData.driverPhone.trim()) newErrors.driverPhone = 'Driver phone is required'
        if (!formData.carrierName.trim()) newErrors.carrierName = 'Carrier name is required'
        if (!formData.cargoWeight) newErrors.cargoWeight = 'Cargo weight is required'
        if (!formData.estimatedArrival) newErrors.estimatedArrival = 'Estimated arrival time is required'
        if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions'
        if (!formData.acceptPricing) newErrors.acceptPricing = 'You must accept the pricing terms'

        // Plate number format validation
        const plateRegex = /^[A-Z]{2}-\d{4}-[A-Z]{2}$/
        if (formData.truckPlateNumber && !plateRegex.test(formData.truckPlateNumber)) {
            newErrors.truckPlateNumber = 'Plate number format should be XX-0000-XX'
        }

        // Phone validation
        const phoneRegex = /^[+]?[0-9\s\-\d()]{8,20}$/
        if (formData.driverPhone && !phoneRegex.test(formData.driverPhone)) {
            newErrors.driverPhone = 'Please enter a valid phone number'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            const reservationData = {
                ...formData,
                slotId: selectedSlot?.id,
                slotTime: selectedSlot?.timeSlot,
                slotDate: new Date().toISOString().split('T')[0],
                totalPrice: selectedSlot?.price,
                currency: selectedSlot?.currency || 'CFA',
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
        const phone = "+228 23456789";
        console.log(isValidPhone(phone));
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
                    origin: selectedSlot?.gate || 'Gate A1',
                    destination: selectedSlot?.terminal || 'Terminal 3',
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
            }
        }
    }

    const formatPrice = (price, currency) => {
        return `${currency} ${price?.toLocaleString() || '0'}`
    }

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

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Réserver un créneau</h2>
                <p style={styles.subtitle}>Complétez votre réservation pour {slot.timeSlot} - {slot.gate} vers {slot.terminal}</p>
                <div style={styles.slotSummary}>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>Créneau horaire :</span>
                        <span style={styles.summaryValue}>{slot.timeSlot}</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>Itinéraire :</span>
                        <span style={styles.summaryValue}>{slot.gate} → {slot.terminal}</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>Durée :</span>
                        <span style={styles.summaryValue}>{slot.duration}</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>Prix :</span>
                        <span style={{ ...styles.summaryValue, color: '#3b82f6', fontSize: '18px' }}>{formatPrice(slot.price, slot.currency)}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations sur le camion</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="truckPlateNumber" style={styles.label}>Immatriculation du camion *</label>
                            <input
                                type="text"
                                id="truckPlateNumber"
                                name="truckPlateNumber"
                                value={formData.truckPlateNumber}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.truckPlateNumber ? styles.inputError : {}), textTransform: 'uppercase' }}
                                placeholder="TG-1234-AB"
                            />
                            {errors.truckPlateNumber && <span style={styles.errorMessage}>{errors.truckPlateNumber}</span>}
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
                                <option value="Container">Camion porte-conteneur</option>
                                <option value="Flatbed">Plateau</option>
                                <option value="Tanker">Citerne</option>
                                <option value="Refrigerated">Frigorifique</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="cargoType" style={styles.label}>Type de cargaison</label>
                            <select
                                id="cargoType"
                                name="cargoType"
                                value={formData.cargoType}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="Container">Conteneur</option>
                                <option value="Bulk">Marchandise en vrac</option>
                                <option value="General">Marchandise générale</option>
                                <option value="Liquid">Liquide</option>
                                <option value="Hazardous">Matières dangereuses</option>
                                <option value="Refrigerated">Produits réfrigérés</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="cargoWeight" style={styles.label}>Poids de la cargaison (tonnes) *</label>
                            <input
                                type="number"
                                id="cargoWeight"
                                name="cargoWeight"
                                value={formData.cargoWeight}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.cargoWeight ? styles.inputError : {}) }}
                                min="0.1"
                                step="0.1"
                                placeholder="ex : 25.5"
                            />
                            {errors.cargoWeight && <span style={styles.errorMessage}>{errors.cargoWeight}</span>}
                        </div>

                        <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                            <label htmlFor="cargoDescription" style={styles.label}>Description de la cargaison</label>
                            <textarea
                                id="cargoDescription"
                                name="cargoDescription"
                                value={formData.cargoDescription}
                                onChange={handleChange}
                                style={styles.textarea}
                                rows="3"
                                placeholder="Décrivez la cargaison transportée"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="containerNumber" style={styles.label}>Numéro du conteneur</label>
                            <input
                                type="text"
                                id="containerNumber"
                                name="containerNumber"
                                value={formData.containerNumber}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="ID du conteneur (si applicable)"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="sealNumber" style={styles.label}>Numéro du plomb</label>
                            <input
                                type="text"
                                id="sealNumber"
                                name="sealNumber"
                                value={formData.sealNumber}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Numéro du plomb du conteneur"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations sur le conducteur</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="driverName" style={styles.label}>Nom du conducteur *</label>
                            <input
                                type="text"
                                id="driverName"
                                name="driverName"
                                value={formData.driverName}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.driverName ? styles.inputError : {}) }}
                                placeholder="Nom complet du conducteur"
                            />
                            {errors.driverName && <span style={styles.errorMessage}>{errors.driverName}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="driverLicense" style={styles.label}>Numéro du permis *</label>
                            <input
                                type="text"
                                id="driverLicense"
                                name="driverLicense"
                                value={formData.driverLicense}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.driverLicense ? styles.inputError : {}) }}
                                placeholder="Numéro du permis"
                            />
                            {errors.driverLicense && <span style={styles.errorMessage}>{errors.driverLicense}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="driverPhone" style={styles.label}>Téléphone du conducteur *</label>
                            <input
                                type="tel"
                                id="driverPhone"
                                name="driverPhone"
                                value={formData.driverPhone}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.driverPhone ? styles.inputError : {}) }}
                                placeholder="+228 XX XX XX XX"
                            />
                            {errors.driverPhone && <span style={styles.errorMessage}>{errors.driverPhone}</span>}
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Informations sur le transporteur</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="carrierName" style={styles.label}>Nom du transporteur / entreprise *</label>
                            <input
                                type="text"
                                id="carrierName"
                                name="carrierName"
                                value={formData.carrierName}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.carrierName ? styles.inputError : {}) }}
                                placeholder="Nom de l'entreprise ou du transporteur"
                            />
                            {errors.carrierName && <span style={styles.errorMessage}>{errors.carrierName}</span>}
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="carrierContact" style={styles.label}>Contact du transporteur</label>
                            <input
                                type="tel"
                                id="carrierContact"
                                name="carrierContact"
                                value={formData.carrierContact}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Itinéraire & horaire</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="origin" style={styles.label}>Porte d'origine</label>
                            <select
                                id="origin"
                                name="origin"
                                value={formData.origin}
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
                            <label htmlFor="destination" style={styles.label}>Terminal de destination</label>
                            <select
                                id="destination"
                                name="destination"
                                value={formData.destination}
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

                        <div style={styles.formGroup}>
                            <label htmlFor="estimatedArrival" style={styles.label}>Heure d'arrivée estimée *</label>
                            <input
                                type="time"
                                id="estimatedArrival"
                                name="estimatedArrival"
                                value={formData.estimatedArrival}
                                onChange={handleChange}
                                style={{ ...styles.input, ...(errors.estimatedArrival ? styles.inputError : {}) }}
                            />
                            {errors.estimatedArrival && <span style={styles.errorMessage}>{errors.estimatedArrival}</span>}
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Services additionnels</h3>
                    <div style={styles.checkboxGrid}>
                        {[
                            'Traitement prioritaire',
                            'Service d\'escorte',
                            'Dédouanement',
                            'Service de pesage',
                            'Inspection de sécurité',
                            'Assistance documentaire',
                            'Aide au chargement/déchargement',
                            'Stockage temporaire'
                        ].map((service) => (
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

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Exigences particulières</h3>
                    <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                        <label htmlFor="specialRequirements" style={styles.label}>Exigences ou remarques particulières</label>
                        <textarea
                            id="specialRequirements"
                            name="specialRequirements"
                            value={formData.specialRequirements}
                            onChange={handleChange}
                            style={styles.textarea}
                            rows="4"
                            placeholder="Exigences spécifiques, restrictions ou informations complémentaires"
                        />
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Documents</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="billOfLading" style={styles.label}>Numéro du connaissement</label>
                            <input
                                type="text"
                                id="billOfLading"
                                name="billOfLading"
                                value={formData.billOfLading}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Numéro du connaissement"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="customsDeclaration" style={styles.label}>Numéro de déclaration douanière</label>
                            <input
                                type="text"
                                id="customsDeclaration"
                                name="customsDeclaration"
                                value={formData.customsDeclaration}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Numéro de déclaration douanière"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Contact d'urgence</h3>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="emergencyContactName" style={styles.label}>Nom du contact d'urgence</label>
                            <input
                                type="text"
                                id="emergencyContactName"
                                name="emergencyContactName"
                                value={formData.emergencyContactName}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Personne à contacter en urgence"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="emergencyContactPhone" style={styles.label}>Téléphone d'urgence</label>
                            <input
                                type="tel"
                                id="emergencyContactPhone"
                                name="emergencyContactPhone"
                                value={formData.emergencyContactPhone}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Conditions générales</h3>
                    <div style={styles.termsSection}>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                style={{ ...styles.checkbox, ...(errors.acceptTerms ? styles.inputError : {}) }}
                            />
                            <span style={styles.checkboxText}>J'accepte les conditions générales des opérations portuaires *</span>
                        </label>
                        {errors.acceptTerms && <span style={styles.errorMessage}>{errors.acceptTerms}</span>}

                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="acceptPricing"
                                checked={formData.acceptPricing}
                                onChange={handleChange}
                                style={{ ...styles.checkbox, ...(errors.acceptPricing ? styles.inputError : {}) }}
                            />
                            <span style={styles.checkboxText}>J'accepte les conditions tarifaires et comprends tous les frais *</span>
                        </label>
                        {errors.acceptPricing && <span style={styles.errorMessage}>{errors.acceptPricing}</span>}
                    </div>
                </div>

                <div style={styles.reservationSummary}>
                    <h3 style={styles.sectionTitle}>Résumé de la réservation</h3>
                    <div style={styles.summaryDetails}>
                        <div style={styles.summaryRow}>
                            <span>Créneau horaire :</span>
                            <span>{slot.timeSlot}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Itinéraire :</span>
                            <span>{formData.origin} → {formData.destination}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Durée :</span>
                            <span>{slot.duration}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Prix de base :</span>
                            <span>{formatPrice(slot.price, slot.currency)}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Services additionnels :</span>
                            <span>{formData.additionalServices.length} sélectionné(s)</span>
                        </div>
                        <div style={{ ...styles.summaryRow, ...styles.summaryTotal }}>
                            <span>Prix total :</span>
                            <span>{formatPrice(slot.price, slot.currency)}</span>
                        </div>
                    </div>
                </div>

                <div style={styles.actions}>
                    <button type="button" onClick={handleCancel} style={styles.cancelButton}>
                        Annuler
                    </button>
                    <button type="submit" style={styles.submitButton}>
                        Réserver le créneau
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
        backgroundColor: '#ffffffff',
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
    termsSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
    },
    reservationSummary: {
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '24px'
    },
    summaryDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        borderBottom: '1px solid #e5e7eb'
    },
    summaryTotal: {
        fontWeight: '700',
        fontSize: '18px',
        color: '#3b82f6',
        borderTop: '2px solid #3b82f6',
        paddingTop: '12px',
        marginTop: '8px',
        borderBottom: 'none'
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

export default SlotReservation