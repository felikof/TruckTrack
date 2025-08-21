import { useState } from 'react'

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
                createdBy: 'admin', // This would come from auth context
                availableSlots: formData.totalSlots - formData.reservedSlots
            }
            onSubmit(slotData)
        }
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Create New Slot</h2>
                <p>Create a new time slot for truck traffic management</p>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-section">
                    <h3>Basic Slot Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="slotDate">Slot Date *</label>
                            <input
                                type="date"
                                id="slotDate"
                                name="slotDate"
                                value={formData.slotDate}
                                onChange={handleChange}
                                className={errors.slotDate ? 'error' : ''}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.slotDate && <span className="error-message">{errors.slotDate}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="startTime">Start Time *</label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={(e) => {
                                    handleChange(e)
                                    setTimeout(calculateDuration, 100)
                                }}
                                className={errors.startTime ? 'error' : ''}
                            />
                            {errors.startTime && <span className="error-message">{errors.startTime}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="endTime">End Time *</label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={(e) => {
                                    handleChange(e)
                                    setTimeout(calculateDuration, 100)
                                }}
                                className={errors.endTime ? 'error' : ''}
                            />
                            {errors.endTime && <span className="error-message">{errors.endTime}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="duration">Duration</label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                readOnly
                                placeholder="Auto-calculated"
                                className="readonly"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Route Configuration</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="originGate">Origin Gate</label>
                            <select
                                id="originGate"
                                name="originGate"
                                value={formData.originGate}
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
                            <label htmlFor="destinationTerminal">Destination Terminal</label>
                            <select
                                id="destinationTerminal"
                                name="destinationTerminal"
                                value={formData.destinationTerminal}
                                onChange={handleChange}
                            >
                                <option value="Terminal 1">Terminal 1</option>
                                <option value="Terminal 2">Terminal 2</option>
                                <option value="Terminal 3">Terminal 3</option>
                                <option value="Container Yard">Container Yard</option>
                                <option value="Bulk Terminal">Bulk Terminal</option>
                            </select>
                        </div>
                    </div>

                    <div className="route-stops">
                        <h4>Route Stops</h4>
                        {formData.routeStops.map((stop, index) => (
                            <div key={index} className="route-stop-config">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input
                                            type="text"
                                            value={stop.location}
                                            onChange={(e) => handleRouteStopChange(index, 'location', e.target.value)}
                                            placeholder="Stop location"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Estimated Time</label>
                                        <input
                                            type="time"
                                            value={stop.estimatedTime}
                                            onChange={(e) => handleRouteStopChange(index, 'estimatedTime', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Transfer Time (min)</label>
                                        <input
                                            type="number"
                                            value={stop.transferTime}
                                            onChange={(e) => handleRouteStopChange(index, 'transferTime', e.target.value)}
                                            min="0"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {formData.routeStops.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => removeRouteStop(index)}
                                                className="btn-remove"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addRouteStop} className="btn-add">
                            Add Route Stop
                        </button>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Capacity and Availability</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="totalSlots">Total Slots *</label>
                            <input
                                type="number"
                                id="totalSlots"
                                name="totalSlots"
                                value={formData.totalSlots}
                                onChange={handleChange}
                                className={errors.totalSlots ? 'error' : ''}
                                min="1"
                                max="100"
                            />
                            {errors.totalSlots && <span className="error-message">{errors.totalSlots}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="reservedSlots">Pre-reserved Slots</label>
                            <input
                                type="number"
                                id="reservedSlots"
                                name="reservedSlots"
                                value={formData.reservedSlots}
                                onChange={handleChange}
                                min="0"
                                max={formData.totalSlots}
                            />
                        </div>

                        <div className="form-group">
                            <label>Available Slots</label>
                            <input
                                type="number"
                                value={formData.totalSlots - formData.reservedSlots}
                                readOnly
                                className="readonly"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Pricing</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="basePrice">Base Price *</label>
                            <input
                                type="number"
                                id="basePrice"
                                name="basePrice"
                                value={formData.basePrice}
                                onChange={handleChange}
                                className={errors.basePrice ? 'error' : ''}
                                min="0"
                                step="1000"
                            />
                            {errors.basePrice && <span className="error-message">{errors.basePrice}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="currency">Currency</label>
                            <select
                                id="currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                            >
                                <option value="CFA">CFA Franc</option>
                                <option value="USD">US Dollar</option>
                                <option value="EUR">Euro</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priceFactors.priority">Priority Surcharge (%)</label>
                            <input
                                type="number"
                                id="priceFactors.priority"
                                name="priceFactors.priority"
                                value={formData.priceFactors.priority}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                step="5"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="priceFactors.peakHours">Peak Hours Surcharge (%)</label>
                            <input
                                type="number"
                                id="priceFactors.peakHours"
                                name="priceFactors.peakHours"
                                value={formData.priceFactors.peakHours}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                step="5"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Available Facilities</h3>
                    <div className="checkbox-group">
                        {[
                            'Weighbridge',
                            'Customs Inspection',
                            'Security Check',
                            'Parking Area',
                            'Loading/Unloading',
                            'Documentation Center',
                            'Fuel Station',
                            'Maintenance Service'
                        ].map(facility => (
                            <label key={facility} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="availableFacilities"
                                    value={facility}
                                    checked={formData.availableFacilities.includes(facility)}
                                    onChange={handleChange}
                                />
                                <span>{facility}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Vehicle Restrictions</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="maxWeight">Maximum Weight (tons)</label>
                            <input
                                type="number"
                                id="maxWeight"
                                name="maxWeight"
                                value={formData.maxWeight}
                                onChange={handleChange}
                                min="1"
                                step="0.1"
                                placeholder="e.g., 40"
                            />
                        </div>
                    </div>

                    <div className="subsection">
                        <h4>Maximum Dimensions</h4>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="maxDimensions.length">Length (m)</label>
                                <input
                                    type="number"
                                    id="maxDimensions.length"
                                    name="maxDimensions.length"
                                    value={formData.maxDimensions.length}
                                    onChange={handleChange}
                                    step="0.1"
                                    placeholder="e.g., 18.5"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="maxDimensions.width">Width (m)</label>
                                <input
                                    type="number"
                                    id="maxDimensions.width"
                                    name="maxDimensions.width"
                                    value={formData.maxDimensions.width}
                                    onChange={handleChange}
                                    step="0.1"
                                    placeholder="e.g., 2.5"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="maxDimensions.height">Height (m)</label>
                                <input
                                    type="number"
                                    id="maxDimensions.height"
                                    name="maxDimensions.height"
                                    value={formData.maxDimensions.height}
                                    onChange={handleChange}
                                    step="0.1"
                                    placeholder="e.g., 4.2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="subsection">
                        <h4>Allowed Truck Types</h4>
                        <div className="checkbox-group">
                            {[
                                'Standard Truck',
                                'Heavy Duty',
                                'Container Truck',
                                'Flatbed',
                                'Tanker',
                                'Refrigerated',
                                'Dump Truck'
                            ].map(type => (
                                <label key={type} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="truckTypes"
                                        value={type}
                                        checked={formData.truckTypes.includes(type)}
                                        onChange={handleChange}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="subsection">
                        <h4>Allowed Cargo Types</h4>
                        <div className="checkbox-group">
                            {[
                                'Container',
                                'Bulk Cargo',
                                'General Cargo',
                                'Liquid',
                                'Hazardous Materials',
                                'Refrigerated Goods',
                                'Heavy Machinery'
                            ].map(type => (
                                <label key={type} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="cargoTypes"
                                        value={type}
                                        checked={formData.cargoTypes.includes(type)}
                                        onChange={handleChange}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Operational Details</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="operatorName">Operator Name *</label>
                            <input
                                type="text"
                                id="operatorName"
                                name="operatorName"
                                value={formData.operatorName}
                                onChange={handleChange}
                                className={errors.operatorName ? 'error' : ''}
                                placeholder="Responsible operator"
                            />
                            {errors.operatorName && <span className="error-message">{errors.operatorName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactPerson">Contact Person *</label>
                            <input
                                type="text"
                                id="contactPerson"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                className={errors.contactPerson ? 'error' : ''}
                                placeholder="Contact person name"
                            />
                            {errors.contactPerson && <span className="error-message">{errors.contactPerson}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactPhone">Contact Phone</label>
                            <input
                                type="tel"
                                id="contactPhone"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="specialInstructions">Special Instructions</label>
                        <textarea
                            id="specialInstructions"
                            name="specialInstructions"
                            value={formData.specialInstructions}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Any special instructions or notes for this slot"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Status and Settings</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="maintenance">Under Maintenance</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="visibility">Visibility</label>
                            <select
                                id="visibility"
                                name="visibility"
                                value={formData.visibility}
                                onChange={handleChange}
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="restricted">Restricted</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="autoConfirm"
                                    checked={formData.autoConfirm}
                                    onChange={handleChange}
                                />
                                <span>Auto-confirm reservations</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Recurring Settings</h3>
                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="isRecurring"
                                checked={formData.isRecurring}
                                onChange={handleChange}
                            />
                            <span>Create recurring slot</span>
                        </label>
                    </div>

                    {formData.isRecurring && (
                        <>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="recurringPattern">Recurring Pattern</label>
                                    <select
                                        id="recurringPattern"
                                        name="recurringPattern"
                                        value={formData.recurringPattern}
                                        onChange={handleChange}
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="custom">Custom Days</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="recurringEndDate">End Date</label>
                                    <input
                                        type="date"
                                        id="recurringEndDate"
                                        name="recurringEndDate"
                                        value={formData.recurringEndDate}
                                        onChange={handleChange}
                                        min={formData.slotDate}
                                    />
                                </div>
                            </div>

                            {formData.recurringPattern === 'custom' && (
                                <div className="subsection">
                                    <h4>Select Days</h4>
                                    <div className="checkbox-group">
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                            <label key={day} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    name="recurringDays"
                                                    value={day}
                                                    checked={formData.recurringDays.includes(day)}
                                                    onChange={handleChange}
                                                />
                                                <span>{day}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Create Slot
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminSlotCreation