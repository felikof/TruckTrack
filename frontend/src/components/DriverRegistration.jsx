import { useState, useEffect } from 'react'
import { parsePhoneNumberFromString } from "libphonenumber-js"

const DriverRegistration = ({ onCancel }) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [languages, setLanguages] = useState([])
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

    useEffect(() => {
        fetch("http://localhost:8000/languages/")
            .then((res) => res.json())
            .then((data) => setLanguages(data));
    }, []);

    const [errors, setErrors] = useState({})

    const steps = [
        { id: 1, title: 'Personal', icon: '👤' },
        { id: 2, title: 'Contact', icon: '📞' },
        { id: 3, title: 'License', icon: '🪪' },
        { id: 4, title: 'Complete', icon: '✓' }
    ]

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

    //     const handleChange = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value });
    //   };

    const handleLanguageChange = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => parseInt(option.value)
        );
        setFormData(prev => ({ ...prev, languages: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/drivers/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Driver créé :", data);
            });
    };

    const validateStep = (step) => {
        const newErrors = {}

        switch (step) {
            case 1:
                if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
                if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
                if (!formData.nationalId.trim()) newErrors.nationalId = 'National ID is required'
                break
            case 2:
                if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
                if (!formData.email.trim()) newErrors.email = 'Email is required'

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (formData.email && !emailRegex.test(formData.email)) {
                    newErrors.email = 'Please enter a valid email address'
                }

                // const phoneRegex = parsePhoneNumberFromString(phone)
                // if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
                //     newErrors.phoneNumber = 'Please enter a valid phone number'
                // }

                if (formData.phoneNumber) {
                    const phoneNumber = parsePhoneNumberFromString(formData.phoneNumber, "TG") // "TG" = pays par défaut
                    if (!phoneNumber || !phoneNumber.isValid()) {
                        newErrors.phoneNumber = "Please enter a valid phone number"
                    }
                }

                break
            case 3:
                if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required'
                if (!formData.licenseExpiry) newErrors.licenseExpiry = 'License expiry date is required'
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

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     if (validateStep(currentStep)) {
    //         if (onSubmit) {
    //             onSubmit(formData)
    //         } else {
    //             console.log('Driver registration data:', formData)
    //             alert('Driver registered successfully!')
    //         }
    //     }
    // }

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        } else {
            if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
                setFormData({
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
                        <h3 style={styles.stepTitle}>Personal Information</h3>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.firstName ? styles.inputError : {}) }}
                                    placeholder="Enter first name"
                                />
                                {errors.firstName && <span style={styles.errorMessage}>{errors.firstName}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.lastName ? styles.inputError : {}) }}
                                    placeholder="Enter last name"
                                />
                                {errors.lastName && <span style={styles.errorMessage}>{errors.lastName}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>National ID *</label>
                                <input
                                    type="text"
                                    name="nationalId"
                                    value={formData.nationalId}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.nationalId ? styles.inputError : {}) }}
                                    placeholder="Enter national ID number"
                                />
                                {errors.nationalId && <span style={styles.errorMessage}>{errors.nationalId}</span>}
                            </div>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div style={styles.stepContent}>
                        <h3 style={styles.stepTitle}>Contact Information</h3>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.phoneNumber ? styles.inputError : {}) }}
                                    placeholder="+228 XX XX XX XX"
                                />
                                {errors.phoneNumber && <span style={styles.errorMessage}>{errors.phoneNumber}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                                    placeholder="driver@example.com"
                                />
                                {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
                            </div>

                            <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                                <label style={styles.label}>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder="Street address"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>City</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="">Select city</option>
                                    <option value="Lomé">Lomé</option>
                                    <option value="Kara">Kara</option>
                                    <option value="Sokodé">Sokodé</option>
                                    <option value="Kpalimé">Kpalimé</option>
                                    <option value="Atakpamé">Atakpamé</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Emergency Contact</label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder="Emergency contact name"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Emergency Phone</label>
                                <input
                                    type="tel"
                                    name="emergencyPhone"
                                    value={formData.emergencyPhone}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder="+228 XX XX XX XX"
                                />
                            </div>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div style={styles.stepContent}>
                        <h3 style={styles.stepTitle}>License & Experience</h3>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>License Number *</label>
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.licenseNumber ? styles.inputError : {}) }}
                                    placeholder="Enter license number"
                                />
                                {errors.licenseNumber && <span style={styles.errorMessage}>{errors.licenseNumber}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>License Type</label>
                                <select
                                    name="licenseType"
                                    value={formData.licenseType}
                                    onChange={handleChange}
                                    style={styles.select}
                                >
                                    <option value="Class C">Class C - Standard Vehicle</option>
                                    <option value="Class B">Class B - Heavy Vehicle</option>
                                    <option value="Class A">Class A - Commercial Vehicle</option>
                                    <option value="CDL">CDL - Commercial Driver's License</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>License Expiry Date *</label>
                                <input
                                    type="date"
                                    name="licenseExpiry"
                                    value={formData.licenseExpiry}
                                    onChange={handleChange}
                                    style={{ ...styles.input, ...(errors.licenseExpiry ? styles.inputError : {}) }}
                                />
                                {errors.licenseExpiry && <span style={styles.errorMessage}>{errors.licenseExpiry}</span>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Years of Experience</label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    style={styles.select}
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

                        <div style={styles.languageSection}>
                            <select multiple onChange={handleLanguageChange} style={styles.select}>
                                {languages.map((lang) => (
                                    <option key={lang.id} value={lang.id}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                            <label style={styles.label}>Languages Spoken</label>
                            <div style={styles.checkboxGrid}>
                                {['French', 'English', 'Ewe', 'Kabye', 'Tem'].map(language => (
                                    <label key={language} style={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            name="languages"
                                            value={language}
                                            checked={formData.languages.includes(language)}
                                            onChange={handleChange}
                                            style={styles.checkbox}
                                        />
                                        <span style={styles.checkboxText}>{language}</span>
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
                                    <h4 style={styles.summaryTitle}>Personal Info</h4>
                                    <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                                    <p><strong>National ID:</strong> {formData.nationalId}</p>
                                    <p><strong>Date of Birth:</strong> {formData.dateOfBirth || 'Not provided'}</p>
                                </div>

                                <div style={styles.summarySection}>
                                    <h4 style={styles.summaryTitle}>Contact</h4>
                                    <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                                    <p><strong>Email:</strong> {formData.email}</p>
                                    <p><strong>City:</strong> {formData.city || 'Not provided'}</p>
                                </div>

                                <div style={styles.summarySection}>
                                    <h4 style={styles.summaryTitle}>License</h4>
                                    <p><strong>License #:</strong> {formData.licenseNumber}</p>
                                    <p><strong>Type:</strong> {formData.licenseType}</p>
                                    <p><strong>Expires:</strong> {formData.licenseExpiry}</p>
                                </div>

                                <div style={styles.summarySection}>
                                    <h4 style={styles.summaryTitle}>Languages</h4>
                                    <p>{formData.languages.length > 0 ? formData.languages.join(', ') : 'None selected'}</p>
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
                <h2 style={styles.title}>REGISTER NEW DRIVER</h2>
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
        backgroundColor: '#ffffffff',
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
    input: {
        padding: '12px 16px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: '#ffffff'
    },
    select: {
        width: '100%',
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
    languageSection: {
        marginTop: '24px'
    },
    checkboxGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
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

export default DriverRegistration