import { useState } from 'react'

const CarrierRegistration = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        registrationNumber: '',
        taxId: '',
        companyType: 'Private',
        establishedYear: '',
        phoneNumber: '',
        email: '',
        website: '',
        address: '',
        city: '',
        postalCode: '',
        contactPersonName: '',
        contactPersonTitle: '',
        contactPersonPhone: '',
        contactPersonEmail: '',
        fleetSize: '',
        operatingLicense: '',
        licenseExpiry: '',
        insuranceProvider: '',
        insurancePolicyNumber: '',
        insuranceExpiry: '',
        servicesOffered: [],
        operatingRoutes: [],
        certifications: []
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            if (['servicesOffered', 'operatingRoutes', 'certifications'].includes(name)) {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                        ? [...prev[name], value]
                        : prev[name].filter(item => item !== value)
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

        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required'
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!formData.contactPersonName.trim()) newErrors.contactPersonName = 'Contact person name is required'
        if (!formData.operatingLicense.trim()) newErrors.operatingLicense = 'Operating license is required'

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (formData.contactPersonEmail && !emailRegex.test(formData.contactPersonEmail)) {
            newErrors.contactPersonEmail = 'Please enter a valid email address'
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
                <h2>Carrier Registration</h2>
                <p>Register a new carrier company for port operations</p>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-section">
                    <h3>Company Information</h3>
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label htmlFor="companyName">Company Name *</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className={errors.companyName ? 'error' : ''}
                                placeholder="Enter company name"
                            />
                            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="registrationNumber">Registration Number *</label>
                            <input
                                type="text"
                                id="registrationNumber"
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                className={errors.registrationNumber ? 'error' : ''}
                                placeholder="Company registration number"
                            />
                            {errors.registrationNumber && <span className="error-message">{errors.registrationNumber}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="taxId">Tax ID</label>
                            <input
                                type="text"
                                id="taxId"
                                name="taxId"
                                value={formData.taxId}
                                onChange={handleChange}
                                placeholder="Tax identification number"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="companyType">Company Type</label>
                            <select
                                id="companyType"
                                name="companyType"
                                value={formData.companyType}
                                onChange={handleChange}
                            >
                                <option value="Private">Private Company</option>
                                <option value="Public">Public Company</option>
                                <option value="Partnership">Partnership</option>
                                <option value="Sole Proprietorship">Sole Proprietorship</option>
                                <option value="Cooperative">Cooperative</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="establishedYear">Established Year</label>
                            <input
                                type="number"
                                id="establishedYear"
                                name="establishedYear"
                                value={formData.establishedYear}
                                onChange={handleChange}
                                min="1900"
                                max={new Date().getFullYear()}
                                placeholder="YYYY"
                            />
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
                                placeholder="company@example.com"
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="website">Website</label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://www.company.com"
                            />
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

                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                placeholder="Postal code"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Primary Contact Person</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="contactPersonName">Contact Person Name *</label>
                            <input
                                type="text"
                                id="contactPersonName"
                                name="contactPersonName"
                                value={formData.contactPersonName}
                                onChange={handleChange}
                                className={errors.contactPersonName ? 'error' : ''}
                                placeholder="Full name"
                            />
                            {errors.contactPersonName && <span className="error-message">{errors.contactPersonName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactPersonTitle">Title/Position</label>
                            <input
                                type="text"
                                id="contactPersonTitle"
                                name="contactPersonTitle"
                                value={formData.contactPersonTitle}
                                onChange={handleChange}
                                placeholder="e.g., General Manager"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactPersonPhone">Contact Phone</label>
                            <input
                                type="tel"
                                id="contactPersonPhone"
                                name="contactPersonPhone"
                                value={formData.contactPersonPhone}
                                onChange={handleChange}
                                placeholder="+228 XX XX XX XX"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactPersonEmail">Contact Email</label>
                            <input
                                type="email"
                                id="contactPersonEmail"
                                name="contactPersonEmail"
                                value={formData.contactPersonEmail}
                                onChange={handleChange}
                                className={errors.contactPersonEmail ? 'error' : ''}
                                placeholder="contact@company.com"
                            />
                            {errors.contactPersonEmail && <span className="error-message">{errors.contactPersonEmail}</span>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Operations Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="fleetSize">Fleet Size</label>
                            <select
                                id="fleetSize"
                                name="fleetSize"
                                value={formData.fleetSize}
                                onChange={handleChange}
                            >
                                <option value="">Select fleet size</option>
                                <option value="1-5">1-5 vehicles</option>
                                <option value="6-10">6-10 vehicles</option>
                                <option value="11-25">11-25 vehicles</option>
                                <option value="26-50">26-50 vehicles</option>
                                <option value="51-100">51-100 vehicles</option>
                                <option value="100+">100+ vehicles</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="operatingLicense">Operating License Number *</label>
                            <input
                                type="text"
                                id="operatingLicense"
                                name="operatingLicense"
                                value={formData.operatingLicense}
                                onChange={handleChange}
                                className={errors.operatingLicense ? 'error' : ''}
                                placeholder="License number"
                            />
                            {errors.operatingLicense && <span className="error-message">{errors.operatingLicense}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="licenseExpiry">License Expiry Date</label>
                            <input
                                type="date"
                                id="licenseExpiry"
                                name="licenseExpiry"
                                value={formData.licenseExpiry}
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
                            <label htmlFor="insuranceExpiry">Insurance Expiry Date</label>
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
                    <h3>Services Offered</h3>
                    <div className="checkbox-group">
                        {[
                            'Container Transport',
                            'Bulk Cargo',
                            'General Cargo',
                            'Hazardous Materials',
                            'Refrigerated Transport',
                            'Heavy Machinery',
                            'Liquid Transport',
                            'Livestock Transport'
                        ].map(service => (
                            <label key={service} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="servicesOffered"
                                    value={service}
                                    checked={formData.servicesOffered.includes(service)}
                                    onChange={handleChange}
                                />
                                <span>{service}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Operating Routes</h3>
                    <div className="checkbox-group">
                        {[
                            'Lomé Port - Burkina Faso',
                            'Lomé Port - Mali',
                            'Lomé Port - Niger',
                            'Lomé Port - Ghana',
                            'Domestic Routes',
                            'Regional West Africa',
                            'International Routes'
                        ].map(route => (
                            <label key={route} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="operatingRoutes"
                                    value={route}
                                    checked={formData.operatingRoutes.includes(route)}
                                    onChange={handleChange}
                                />
                                <span>{route}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Register Carrier
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CarrierRegistration