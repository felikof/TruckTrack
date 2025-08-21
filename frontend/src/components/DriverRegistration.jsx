import { useState } from 'react'

const DriverRegistration = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationalId: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        licenseNumber: '',
        licenseType: 'Class C',
        licenseExpiry: '',
        emergencyContact: '',
        emergencyPhone: '',
        experience: '',
        languages: []
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            if (name === 'languages') {
                setFormData(prev => ({
                    ...prev,
                    languages: checked
                        ? [...prev.languages, value]
                        : prev.languages.filter(lang => lang !== value)
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

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.nationalId.trim()) newErrors.nationalId = 'National ID is required'
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required'
        if (!formData.licenseExpiry) newErrors.licenseExpiry = 'License expiry date is required'

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Phone validation (basic)
        const phoneRegex = /^[\\+]?[0-9\s\-\\(\\)]{8,}$/
        if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number'
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
                <h2>Driver Registration</h2>
                <p>Register a new driver for port operations</p>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={errors.firstName ? 'error' : ''}
                                placeholder="Enter first name"
                            />
                            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={errors.lastName ? 'error' : ''}
                                placeholder="Enter last name"
                            />
                            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nationalId">National ID *</label>
                            <input
                                type="text"
                                id="nationalId"
                                name="nationalId"
                                value={formData.nationalId}
                                onChange={handleChange}
                                className={errors.nationalId ? 'error' : ''}
                                placeholder="Enter national ID number"
                            />
                            {errors.nationalId && <span className="error-message">{errors.nationalId}</span>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Contact Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number *</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={errors.phoneNumber ? 'error' : ''}
                                placeholder="+228 XX XX XX XX"
                            />
                            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'error' : ''}
                                placeholder="driver@example.com"
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Street address"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <select
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            >
                                <option value="">Select city</option>
                                <option value="Lomé">Lomé</option>
                                <option value="Kara">Kara</option>
                                <option value="Sokodé">Sokodé</option>
                                <option value="Kpalimé">Kpalimé</option>
                                <option value="Atakpamé">Atakpamé</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>License Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="licenseNumber">License Number *</label>
                            <input
                                type="text"
                                id="licenseNumber"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                className={errors.licenseNumber ? 'error' : ''}
                                placeholder="Enter license number"
                            />
                            {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="licenseType">License Type</label>
                            <select
                                id="licenseType"
                                name="licenseType"
                                value={formData.licenseType}
                                onChange={handleChange}
                            >
                                <option value="Class C">Class C - Standard Vehicle</option>
                                <option value="Class B">Class B - Heavy Vehicle</option>
                                <option value="Class A">Class A - Commercial Vehicle</option>
                                <option value="CDL">CDL - Commercial Driver's License</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="licenseExpiry">License Expiry Date *</label>
                            <input
                                type="date"
                                id="licenseExpiry"
                                name="licenseExpiry"
                                value={formData.licenseExpiry}
                                onChange={handleChange}
                                className={errors.licenseExpiry ? 'error' : ''}
                            />
                            {errors.licenseExpiry && <span className="error-message">{errors.licenseExpiry}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="experience">Years of Experience</label>
                            <select
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                            >
                                <option value="">Select experience</option>
                                <option value="0-1">0-1 years</option>
                                <option value="2-5">2-5 years</option>
                                <option value="6-10">6-10 years</option>
                                <option value="11-15">11-15 years</option>
                                <option value="15+">15+ years</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Emergency Contact</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="emergencyContact">Emergency Contact Name</label>
                            <input
                                type="text"
                                id="emergencyContact"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                placeholder="Full name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="emergencyPhone">Emergency Contact Phone</label>
                            <input
                                type="tel"
                                id="emergencyPhone"
                                name="emergencyPhone"
                                value={formData.emergencyPhone}
                                onChange={handleChange}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Languages</h3>
                    <div className="checkbox-group">
                        {['French', 'English', 'Ewe', 'Kabye', 'Tem'].map(language => (
                            <label key={language} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="languages"
                                    value={language}
                                    checked={formData.languages.includes(language)}
                                    onChange={handleChange}
                                />
                                <span>{language}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Register Driver
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DriverRegistration