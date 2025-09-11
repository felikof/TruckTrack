

import { useState } from 'react'

const AdminSlotCreation = ({ onSubmit, onCancel }) => {
    const [currentStep, setCurrentStep] = useState(1)
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

    const steps = [
        { id: 1, title: 'Basic', icon: '📅' },
        { id: 2, title: 'Route', icon: '🛣️' },
        { id: 3, title: 'Settings', icon: '⚙️' },
        { id: 4, title: 'Complete', icon: '✓' }
    ]

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

    const validateStep = (step) => {
        const newErrors = {}

        switch (step) {
            case 1:
                if (!formData.slotDate) newErrors.slotDate = 'Slot date is required'
                if (!formData.startTime) newErrors.startTime = 'Start time is required'
                if (!formData.endTime) newErrors.endTime = 'End time is required'
                if (!formData.totalSlots || formData.totalSlots < 1) newErrors.totalSlots = 'Total slots must be at least 1'
                if (!formData.basePrice || formData.basePrice < 0) newErrors.basePrice = 'Base price is required'

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
                break
            case 2:
                // Route validation can be added here if needed
                break
            case 3:
                if (!formData.operatorName.trim()) newErrors.operatorName = 'Operator name is required'
                if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required'
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
        calculateDuration()

        if (validateStep(currentStep)) {
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
                setCurrentStep(1)
            }
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div style={styles.stepContent}>
                        <h3 style={styles.stepTitle}>Basic Slot Information</h3>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Slot Date *</label>
                                <input
                                    type="date"
                                    name="slotDate"
                                    value={formData.slotDate}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.slotDate ? styles.inputError : {}) }}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                {errors.slotDate && <span style={styles.errorMessage}>{errors.slotDate}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Start Time *</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setTimeout(calculateDuration, 100)
                                    }}
                                    style={{ ...styles.input, ...(errors.startTime ? styles.inputError : {}) }}
                                />
                                {errors.startTime && <span style={styles.errorMessage}>{errors.startTime}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>End Time *</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setTimeout(calculateDuration, 100)
                                    }}
                                    style={{ ...styles.input, ...(errors.endTime ? styles.inputError : {}) }}
                                />
                                {errors.endTime && <span style={styles.errorMessage}>{errors.endTime}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    readOnly
                                    placeholder="Auto-calculated"
                                    style={{ ...styles.input, backgroundColor: '#f9fafb', color: '#6b7280', cursor: 'not-allowed' }}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Total Slots *</label>
                                <input
                                    type="number"
                                    name="totalSlots"
                                    value={formData.totalSlots}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.totalSlots ? styles.inputError : {}) }}
                                    min="1"
                                    max="100"
                                />
                                {errors.totalSlots && <span style={styles.errorMessage}>{errors.totalSlots}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Pre-reserved Slots</label>
                                <input
                                    type="number"
                                    name="reservedSlots"
                                    value={formData.reservedSlots}
                                    onChange={handleChange}
                                    style={styles.input}
                                    min="0"
                                    max={formData.totalSlots}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Base Price *</label>
                                <input
                                    type="number"
                                    name="basePrice"
                                    value={formData.basePrice}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.basePrice ? styles.inputError : {}) }}
                                    min="0"
                                    step="1000"
                                />
                                {errors.basePrice && <span style={styles.errorMessage}>{errors.basePrice}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Currency</label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="CFA">CFA Franc</option>
                                    <option value="USD">US Dollar</option>
                                    <option value="EUR">Euro</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div style={styles.stepContent}>
                        <h3 style={styles.stepTitle}>Route Configuration</h3>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Origin Gate</label>
                                <select
                                    name="originGate"
                                    value={formData.originGate}
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
                                    name="destinationTerminal"
                                    value={formData.destinationTerminal}
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

                        <div style={styles.routeStops}>
                            <h4 style={styles.subsectionTitle}>Route Stops</h4>
                            {formData.routeStops.map((stop, index) => (
                                <div key={index} style={styles.routeStopConfig}>
                                    <div style={styles.formGrid}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Location</label>
                                            <input
                                                type="text"
                                                value={stop.location}
                                                onChange={(e) => handleRouteStopChange(index, 'location', e.target.value)}
                                                style={styles.input}
                                                placeholder="Stop location"
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Estimated Time</label>
                                            <input
                                                type="time"
                                                value={stop.estimatedTime}
                                                onChange={(e) => handleRouteStopChange(index, 'estimatedTime', e.target.value)}
                                                style={styles.input}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Transfer Time (min)</label>
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
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addRouteStop} style={styles.addButton}>
                                Add Route Stop
                            </button>
                        </div>

                        <div style={styles.facilitiesSection}>
                            <label style={styles.label}>Available Facilities</label>
                            <div style={styles.checkboxGrid}>
                                {[
                                    'Weighbridge',
                                    'Customs Inspection',
                                    'Security Check',
                                    'Parking Area',
                                    'Loading/Unloading',
                                    'Documentation Center'
                                ].map(facility => (
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
                    </div>
                )

            case 3:
                return (
                    <div style={styles.stepContent}>
                        <h3 style={styles.stepTitle}>Operational Settings</h3>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Operator Name *</label>
                                <input
                                    type="text"
                                    name="operatorName"
                                    value={formData.operatorName}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.operatorName ? styles.inputError : {}) }}
                                    placeholder="Responsible operator"
                                />
                                {errors.operatorName && <span style={styles.errorMessage}>{errors.operatorName}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Contact Person *</label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.contactPerson ? styles.inputError : {}) }}
                                    placeholder="Contact person name"
                                />
                                {errors.contactPerson && <span style={styles.errorMessage}>{errors.contactPerson}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Contact Phone</label>
                                <input
                                    type="tel"
                                    name="contactPhone"
                                    value={formData.contactPhone}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder="+228 XX XX XX XX"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Maximum Weight (tons)</label>
                                <input
                                    type="number"
                                    name="maxWeight"
                                    value={formData.maxWeight}
                                    onChange={handleChange}
                                    style={styles.input}
                                    min="1"
                                    step="0.1"
                                    placeholder="e.g., 40"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="maintenance">Under Maintenance</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Visibility</label>
                                <select
                                    name="visibility"
                                    value={formData.visibility}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="restricted">Restricted</option>
                                </select>
                            </div>
                        </div>

                        <div style={styles.settingsSection}>
                            <div style={styles.formGroup}>
                                <label style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="autoConfirm"
                                        checked={formData.autoConfirm}
                                        onChange={handleChange}
                                        style={styles.checkbox}
                                    />
                                    <span style={styles.checkboxText}>Auto-confirm reservations</span>
                                </label>
                            </div>
                        </div>

                        <div style={styles.trucksSection}>
                            <label style={styles.label}>Allowed Truck Types</label>
                            <div style={styles.checkboxGrid}>
                                {[
                                    'Standard Truck',
                                    'Heavy Duty',
                                    'Container Truck',
                                    'Flatbed',
                                    'Tanker',
                                    'Refrigerated'
                                ].map(type => (
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

                        <div style={styles.cargoSection}>
                            <label style={styles.label}>Allowed Cargo Types</label>
                            <div style={styles.checkboxGrid}>
                                {[
                                    'Container',
                                    'Bulk Cargo',
                                    'General Cargo',
                                    'Liquid',
                                    'Hazardous Materials',
                                    'Refrigerated Goods'
                                ].map(type => (
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

                        <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                            <label style={styles.label}>Special Instructions</label>
                            <textarea
                                name="specialInstructions"
                                value={formData.specialInstructions}
                                onChange={handleChange}
                                style={styles.textarea}
                                rows="4"
                                placeholder="Any special instructions or notes for this slot"
                            />
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div style={styles.stepContent}>
                        <div style={styles.completionContent}>
                            <div style={styles.completionIcon}>✅</div>
                            <h3 style={styles.completionTitle}>Review & Create Slot</h3>
                            <p style={styles.completionText}>Please review the slot configuration before creating</p>

                            <div style={styles.summaryGrid}>
                                <div style={styles.summarySection}>
                                    <h4 style={styles.summaryTitle}>Basic Info</h4>
                                    <p><strong>Date:</strong> {formData.slotDate}</p>
                                    <p><strong>Time:</strong> {formData.startTime} - {formData.endTime}</p>
                                    <p><strong>Duration:</strong> {formData.duration}</p>
                                    <p><strong>Capacity:</strong> {formData.totalSlots} slots</p>
                                </div>

                                <div style={styles.summarySection}>
                                    <h4 style={styles.summaryTitle}>Route</h4>
                                    <p><strong>From:</strong> {formData.originGate}</p>
                                    <p><strong>To:</strong> {formData.destinationTerminal}</p>
                                    <p><strong>Stops:</strong> {formData.routeStops.length} stops</p>
                                    <p><strong>Facilities:</strong> {formData.availableFacilities.length} available</p>
                                </div>

                                <div style={styles.summarySection}>
                                    <h4 style={styles.summaryTitle}>Operations</h4>
                                    <p><strong>Operator:</strong> {formData.operatorName}</p>
                                    <p><strong>Contact:</strong> {formData.contactPerson}</p>
                                    <p><strong>Status:</strong> {formData.status}</p>
                                    <p><strong>Auto-confirm:</strong> {formData.autoConfirm ? 'Yes' : 'No'}</p>
                                </div>

                                <div style={styles.summarySection}>
                                    <h4 style={styles.summaryTitle}>Pricing & Restrictions</h4>
                                    <p><strong>Base Price:</strong> {formData.currency} {formData.basePrice.toLocaleString()}</p>
                                    <p><strong>Max Weight:</strong> {formData.maxWeight || 'No limit'} tons</p>
                                    <p><strong>Truck Types:</strong> {formData.truckTypes.length} allowed</p>
                                    <p><strong>Cargo Types:</strong> {formData.cargoTypes.length} allowed</p>
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
                <h2 style={styles.title}>CREATE NEW SLOT</h2>
                <p style={styles.subtitle}>Create a new time slot for truck traffic management</p>
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
                                Create Slot
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
    // stepConnector: {
    //     position: 'absolute',
    //     top: '24px',
    //     left: '60%',
    //     right: '-40%',
    //     height: '2px',
    //     backgroundColor: '#e5e7eb',
    //     transition: 'all 0.3s ease'
    // },
    // stepConnectorActive: {
    //     backgroundColor: '#6366f1'
    // },
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
    subsectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '12px'
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
    routeStops: {
        marginTop: '24px'
    },
    routeStopConfig: {
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        border: '1px solid #e5e7eb'
    },
    facilitiesSection: {
        marginTop: '24px'
    },
    settingsSection: {
        marginTop: '24px'
    },
    trucksSection: {
        marginTop: '24px'
    },
    cargoSection: {
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

export default AdminSlotCreation