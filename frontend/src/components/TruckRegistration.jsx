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
            onSubmit(formData)
        }
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Truck Registration</h2>
                <p>Register a new truck for port operations</p>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-section">
                    <h3>Vehicle Identification</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="plateNumber">Plate Number *</label>
                            <input
                                type="text"
                                id="plateNumber"
                                name="plateNumber"
                                value={formData.plateNumber}
                                onChange={handleChange}
                                className={errors.plateNumber ? 'error' : ''}
                                placeholder="TG-1234-AB"
                                style={{ textTransform: 'uppercase' }}
                            />
                            {errors.plateNumber && <span className="error-message">{errors.plateNumber}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="chassisNumber">Chassis Number *</label>
                            <input
                                type="text"
                                id="chassisNumber"
                                name="chassisNumber"
                                value={formData.chassisNumber}
                                onChange={handleChange}
                                className={errors.chassisNumber ? 'error' : ''}
                                placeholder="Enter chassis number"
                            />
                            {errors.chassisNumber && <span className="error-message">{errors.chassisNumber}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="engineNumber">Engine Number</label>
                            <input
                                type="text"
                                id="engineNumber"
                                name="engineNumber"
                                value={formData.engineNumber}
                                onChange={handleChange}
                                placeholder="Enter engine number"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Vehicle Details</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="make">Make *</label>
                            <select
                                id="make"
                                name="make"
                                value={formData.make}
                                onChange={handleChange}
                                className={errors.make ? 'error' : ''}
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
                            {errors.make && <span className="error-message">{errors.make}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="model">Model *</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className={errors.model ? 'error' : ''}
                                placeholder="Enter model"
                            />
                            {errors.model && <span className="error-message">{errors.model}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="year">Year *</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className={errors.year ? 'error' : ''}
                                min="1990"
                                max={new Date().getFullYear() + 1}
                                placeholder="YYYY"
                            />
                            {errors.year && <span className="error-message">{errors.year}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                placeholder="Vehicle color"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fuelType">Fuel Type</label>
                            <select
                                id="fuelType"
                                name="fuelType"
                                value={formData.fuelType}
                                onChange={handleChange}
                            >
                                <option value="Diesel">Diesel</option>
                                <option value="Gasoline">Gasoline</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="CNG">CNG (Compressed Natural Gas)</option>
                            </select>
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
                                <option value="Dump Truck">Dump Truck</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cargoType">Primary Cargo Type</label>
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
                                <option value="Heavy Machinery">Heavy Machinery</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="maxWeight">Maximum Weight (tons) *</label>
                            <input
                                type="number"
                                id="maxWeight"
                                name="maxWeight"
                                value={formData.maxWeight}
                                onChange={handleChange}
                                className={errors.maxWeight ? 'error' : ''}
                                min="1"
                                max="100"
                                step="0.1"
                                placeholder="e.g., 25.5"
                            />
                            {errors.maxWeight && <span className="error-message">{errors.maxWeight}</span>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Dimensions</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="dimensions.length">Length (m)</label>
                            <input
                                type="number"
                                id="dimensions.length"
                                name="dimensions.length"
                                value={formData.dimensions.length}
                                onChange={handleChange}
                                step="0.1"
                                placeholder="e.g., 12.5"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dimensions.width">Width (m)</label>
                            <input
                                type="number"
                                id="dimensions.width"
                                name="dimensions.width"
                                value={formData.dimensions.width}
                                onChange={handleChange}
                                step="0.1"
                                placeholder="e.g., 2.5"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dimensions.height">Height (m)</label>
                            <input
                                type="number"
                                id="dimensions.height"
                                name="dimensions.height"
                                value={formData.dimensions.height}
                                onChange={handleChange}
                                step="0.1"
                                placeholder="e.g., 4.0"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Registration & Documentation</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="registrationDate">Registration Date</label>
                            <input
                                type="date"
                                id="registrationDate"
                                name="registrationDate"
                                value={formData.registrationDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="registrationExpiry">Registration Expiry</label>
                            <input
                                type="date"
                                id="registrationExpiry"
                                name="registrationExpiry"
                                value={formData.registrationExpiry}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inspectionDate">Last Inspection Date</label>
                            <input
                                type="date"
                                id="inspectionDate"
                                name="inspectionDate"
                                value={formData.inspectionDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inspectionExpiry">Inspection Expiry</label>
                            <input
                                type="date"
                                id="inspectionExpiry"
                                name="inspectionExpiry"
                                value={formData.inspectionExpiry}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Insurance Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="insuranceProvider">Insurance Provider</label>
                            <input
                                type="text"
                                id="insuranceProvider"
                                name="insuranceProvider"
                                value={formData.insuranceProvider}
                                onChange={handleChange}
                                placeholder="Insurance company name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="insurancePolicyNumber">Policy Number</label>
                            <input
                                type="text"
                                id="insurancePolicyNumber"
                                name="insurancePolicyNumber"
                                value={formData.insurancePolicyNumber}
                                onChange={handleChange}
                                placeholder="Policy number"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="insuranceExpiry">Insurance Expiry</label>
                            <input
                                type="date"
                                id="insuranceExpiry"
                                name="insuranceExpiry"
                                value={formData.insuranceExpiry}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Ownership Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="ownerType">Owner Type</label>
                            <select
                                id="ownerType"
                                name="ownerType"
                                value={formData.ownerType}
                                onChange={handleChange}
                            >
                                <option value="Company">Company</option>
                                <option value="Individual">Individual</option>
                                <option value="Cooperative">Cooperative</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ownerName">Owner Name *</label>
                            <input
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleChange}
                                className={errors.ownerName ? 'error' : ''}
                                placeholder="Owner/Company name"
                            />
                            {errors.ownerName && <span className="error-message">{errors.ownerName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="ownerContact">Owner Contact</label>
                            <input
                                type="tel"
                                id="ownerContact"
                                name="ownerContact"
                                value={formData.ownerContact}
                                onChange={handleChange}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="driverAssigned">Assigned Driver</label>
                            <input
                                type="text"
                                id="driverAssigned"
                                name="driverAssigned"
                                value={formData.driverAssigned}
                                onChange={handleChange}
                                placeholder="Primary driver name"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Tracking & Equipment</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="gpsInstalled"
                                    checked={formData.gpsInstalled}
                                    onChange={handleChange}
                                />
                                <span>GPS Tracking Installed</span>
                            </label>
                        </div>

                        {formData.gpsInstalled && (
                            <div className="form-group">
                                <label htmlFor="trackingDeviceId">Tracking Device ID</label>
                                <input
                                    type="text"
                                    id="trackingDeviceId"
                                    name="trackingDeviceId"
                                    value={formData.trackingDeviceId}
                                    onChange={handleChange}
                                    placeholder="Device ID or IMEI"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Special Equipment</h3>
                    <div className="checkbox-group">
                        {[
                            'Crane',
                            'Hydraulic Lift',
                            'Refrigeration Unit',
                            'Tank System',
                            'Hazmat Equipment',
                            'Loading Ramps',
                            'Tie-down Points',
                            'Tarpaulin System'
                        ].map(equipment => (
                            <label key={equipment} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="specialEquipment"
                                    value={equipment}
                                    checked={formData.specialEquipment.includes(equipment)}
                                    onChange={handleChange}
                                />
                                <span>{equipment}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Operating Permits</h3>
                    <div className="checkbox-group">
                        {[
                            'Port Access Permit',
                            'Hazardous Materials Permit',
                            'Oversize Load Permit',
                            'International Transport Permit',
                            'Container Transport License',
                            'Bulk Cargo License'
                        ].map(permit => (
                            <label key={permit} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="operatingPermits"
                                    value={permit}
                                    checked={formData.operatingPermits.includes(permit)}
                                    onChange={handleChange}
                                />
                                <span>{permit}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Register Truck
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TruckRegistration