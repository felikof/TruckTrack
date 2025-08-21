import { useState } from 'react'

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
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/
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
            onSubmit(reservationData)
        }
    }

    const formatPrice = (price, currency) => {
        return `${currency} ${price?.toLocaleString() || '0'}`
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Reserve Slot</h2>
                <p>Complete your slot reservation for {selectedSlot?.timeSlot} - {selectedSlot?.gate} to {selectedSlot?.terminal}</p>
                {selectedSlot && (
                    <div className="slot-summary">
                        <div className="summary-item">
                            <span className="label">Time Slot:</span>
                            <span className="value">{selectedSlot.timeSlot}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">Route:</span>
                            <span className="value">{selectedSlot.gate} → {selectedSlot.terminal}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">Duration:</span>
                            <span className="value">{selectedSlot.duration}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">Price:</span>
                            <span className="value price">{formatPrice(selectedSlot.price, selectedSlot.currency)}</span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-section">
                    <h3>Truck Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="truckPlateNumber">Truck Plate Number *</label>
                            <input
                                type="text"
                                id="truckPlateNumber"
                                name="truckPlateNumber"
                                value={formData.truckPlateNumber}
                                onChange={handleChange}
                                className={errors.truckPlateNumber ? 'error' : ''}
                                placeholder="TG-1234-AB"
                                style={{ textTransform: 'uppercase' }}
                            />
                            {errors.truckPlateNumber && <span className="error-message">{errors.truckPlateNumber}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="truckType">Truck Type</label>
                            <select
                                id="truckType"
                                name="truckType"
                                value={formData.truckType}
                                onChange={handleChange}
                            >
                                <option value="Standard">Standard Truck</option>
                                <option value="Heavy Duty">Heavy Duty</option>
                                <option value="Container">Container Truck</option>
                                <option value="Flatbed">Flatbed</option>
                                <option value="Tanker">Tanker</option>
                                <option value="Refrigerated">Refrigerated</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cargoType">Cargo Type</label>
                            <select
                                id="cargoType"
                                name="cargoType"
                                value={formData.cargoType}
                                onChange={handleChange}
                            >
                                <option value="Container">Container</option>
                                <option value="Bulk">Bulk Cargo</option>
                                <option value="General">General Cargo</option>
                                <option value="Liquid">Liquid</option>
                                <option value="Hazardous">Hazardous Materials</option>
                                <option value="Refrigerated">Refrigerated Goods</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cargoWeight">Cargo Weight (tons) *</label>
                            <input
                                type="number"
                                id="cargoWeight"
                                name="cargoWeight"
                                value={formData.cargoWeight}
                                onChange={handleChange}
                                className={errors.cargoWeight ? 'error' : ''}
                                min="0.1"
                                step="0.1"
                                placeholder="e.g., 25.5"
                            />
                            {errors.cargoWeight && <span className="error-message">{errors.cargoWeight}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="cargoDescription">Cargo Description</label>
                            <textarea
                                id="cargoDescription"
                                name="cargoDescription"
                                value={formData.cargoDescription}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Describe the cargo being transported"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="containerNumber">Container Number</label>
                            <input
                                type="text"
                                id="containerNumber"
                                name="containerNumber"
                                value={formData.containerNumber}
                                onChange={handleChange}
                                placeholder="Container ID (if applicable)"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sealNumber">Seal Number</label>
                            <input
                                type="text"
                                id="sealNumber"
                                name="sealNumber"
                                value={formData.sealNumber}
                                onChange={handleChange}
                                placeholder="Container seal number"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Driver Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="driverName">Driver Name *</label>
                            <input
                                type="text"
                                id="driverName"
                                name="driverName"
                                value={formData.driverName}
                                onChange={handleChange}
                                className={errors.driverName ? 'error' : ''}
                                placeholder="Full name of driver"
                            />
                            {errors.driverName && <span className="error-message">{errors.driverName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="driverLicense">Driver License Number *</label>
                            <input
                                type="text"
                                id="driverLicense"
                                name="driverLicense"
                                value={formData.driverLicense}
                                onChange={handleChange}
                                className={errors.driverLicense ? 'error' : ''}
                                placeholder="License number"
                            />
                            {errors.driverLicense && <span className="error-message">{errors.driverLicense}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="driverPhone">Driver Phone *</label>
                            <input
                                type="tel"
                                id="driverPhone"
                                name="driverPhone"
                                value={formData.driverPhone}
                                onChange={handleChange}
                                className={errors.driverPhone ? 'error' : ''}
                                placeholder="+228 XX XX XX XX"
                            />
                            {errors.driverPhone && <span className="error-message">{errors.driverPhone}</span>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Carrier Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="carrierName">Carrier/Company Name *</label>
                            <input
                                type="text"
                                id="carrierName"
                                name="carrierName"
                                value={formData.carrierName}
                                onChange={handleChange}
                                className={errors.carrierName ? 'error' : ''}
                                placeholder="Company or carrier name"
                            />
                            {errors.carrierName && <span className="error-message">{errors.carrierName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="carrierContact">Carrier Contact</label>
                            <input
                                type="tel"
                                id="carrierContact"
                                name="carrierContact"
                                value={formData.carrierContact}
                                onChange={handleChange}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Route & Timing</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="origin">Origin Gate</label>
                            <select
                                id="origin"
                                name="origin"
                                value={formData.origin}
                                onChange={handleChange}
                            >
                                <option value="Gate A1">Gate A1</option>
                                <option value="Gate A2">Gate A2</option>
                                <option value="Gate B1">Gate B1</option>
                                <option value="Gate B2">Gate B2</option>
                                <option value="Gate C1">Gate C1</option>
                                <option value="Gate C2">Gate C2</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="destination">Destination Terminal</label>
                            <select
                                id="destination"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                            >
                                <option value="Terminal 1">Terminal 1</option>
                                <option value="Terminal 2">Terminal 2</option>
                                <option value="Terminal 3">Terminal 3</option>
                                <option value="Container Yard">Container Yard</option>
                                <option value="Bulk Terminal">Bulk Terminal</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="estimatedArrival">Estimated Arrival Time *</label>
                            <input
                                type="time"
                                id="estimatedArrival"
                                name="estimatedArrival"
                                value={formData.estimatedArrival}
                                onChange={handleChange}
                                className={errors.estimatedArrival ? 'error' : ''}
                            />
                            {errors.estimatedArrival && <span className="error-message">{errors.estimatedArrival}</span>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Additional Services</h3>
                    <div className="checkbox-group">
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
                            <label key={service} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalServices"
                                    value={service}
                                    checked={formData.additionalServices.includes(service)}
                                    onChange={handleChange}
                                />
                                <span>{service}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Special Requirements</h3>
                    <div className="form-group full-width">
                        <label htmlFor="specialRequirements">Special Requirements or Notes</label>
                        <textarea
                            id="specialRequirements"
                            name="specialRequirements"
                            value={formData.specialRequirements}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Any special handling requirements, restrictions, or additional information"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Documentation</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="billOfLading">Bill of Lading Number</label>
                            <input
                                type="text"
                                id="billOfLading"
                                name="billOfLading"
                                value={formData.billOfLading}
                                onChange={handleChange}
                                placeholder="B/L number"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="customsDeclaration">Customs Declaration Number</label>
                            <input
                                type="text"
                                id="customsDeclaration"
                                name="customsDeclaration"
                                value={formData.customsDeclaration}
                                onChange={handleChange}
                                placeholder="Customs declaration number"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Emergency Contact</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="emergencyContactName">Emergency Contact Name</label>
                            <input
                                type="text"
                                id="emergencyContactName"
                                name="emergencyContactName"
                                value={formData.emergencyContactName}
                                onChange={handleChange}
                                placeholder="Emergency contact person"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="emergencyContactPhone">Emergency Contact Phone</label>
                            <input
                                type="tel"
                                id="emergencyContactPhone"
                                name="emergencyContactPhone"
                                value={formData.emergencyContactPhone}
                                onChange={handleChange}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Terms and Conditions</h3>
                    <div className="terms-section">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className={errors.acceptTerms ? 'error' : ''}
                            />
                            <span>I accept the terms and conditions for port operations *</span>
                        </label>
                        {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="acceptPricing"
                                checked={formData.acceptPricing}
                                onChange={handleChange}
                                className={errors.acceptPricing ? 'error' : ''}
                            />
                            <span>I accept the pricing terms and understand all fees *</span>
                        </label>
                        {errors.acceptPricing && <span className="error-message">{errors.acceptPricing}</span>}
                    </div>
                </div>

                <div className="reservation-summary">
                    <h3>Reservation Summary</h3>
                    <div className="summary-details">
                        <div className="summary-row">
                            <span>Slot Time:</span>
                            <span>{selectedSlot?.timeSlot}</span>
                        </div>
                        <div className="summary-row">
                            <span>Route:</span>
                            <span>{formData.origin} → {formData.destination}</span>
                        </div>
                        <div className="summary-row">
                            <span>Duration:</span>
                            <span>{selectedSlot?.duration}</span>
                        </div>
                        <div className="summary-row">
                            <span>Base Price:</span>
                            <span>{formatPrice(selectedSlot?.price, selectedSlot?.currency)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Additional Services:</span>
                            <span>{formData.additionalServices.length} selected</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total Price:</span>
                            <span>{formatPrice(selectedSlot?.price, selectedSlot?.currency)}</span>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Reserve Slot
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SlotReservation