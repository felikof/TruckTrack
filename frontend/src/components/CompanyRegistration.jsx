import { useState } from 'react';
import * as yup from 'yup';
import { registerCompany } from "../services/companyService";

const CompanyRegistration = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1)
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

  const steps = [
    { id: 1, title: 'Company', icon: '🏢' },
    { id: 2, title: 'Contact', icon: '📞' },
    { id: 3, title: 'Operations', icon: '🚛' },
    { id: 4, title: 'Complete', icon: '✓' }
  ]

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

  const validateStep = (step) => {
    const newErrors = {}
    const validationSchema = yup.object({
      email: yup
        .string()
        .email('Adresse email invalide')
        .required('Email obligatoire')
    });

    switch (step) {
      case 1:
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required'
        break
      case 2:
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!formData.contactPersonName.trim()) newErrors.contactPersonName = 'Contact person name is required'

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // if (formData.email && !emailRegex.test(formData.email)) {
        //   newErrors.email = 'Please enter a valid email address'
        // }

        // if (formData.contactPersonEmail && !emailRegex.test(formData.contactPersonEmail)) {
        //   newErrors.contactPersonEmail = 'Please enter a valid email address'
        // }

        // Utilisation
        if (formData.email) {
          try {
            validationSchema.validateSyncAt('email', { email: formData.email });
          } catch (err) {
            newErrors.email = err.message;
          }
        }

        if (formData.contactPersonEmail) {
          try {
            validationSchema.validateSyncAt('email', { email: formData.contactPersonEmail });
          } catch (err) {
            newErrors.contactPersonEmail = err.message;
          }
        }
        break
      case 3:
        if (!formData.operatingLicense.trim()) newErrors.operatingLicense = 'Operating license is required'
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
  //   e.preventDefault()
  //   if (validateStep(currentStep)) {
  //     if (onSubmit) {
  //       onSubmit(formData)
  //     } else {
  //       console.log('Company registration data:', formData)
  //       alert('Company registered successfully!')
  //     }
  //   }
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Submitting form data:", formData);
  //   try {
  //     const result = await registerCompany(formData);
  //     alert("Transporteur enregistré avec succès !");
  //     console.log(result);
  //     console.log("Données envoyées :", formData);
  //     onSubmit(result);
  //   } catch (error) {
  //     alert("Erreur lors de l'inscription : " + JSON.stringify(error));
  //   }
  // };

  const handleRegisterCompany = async () => {
    try {
      const result = await registerCompany(formData);
      alert("Company registered successfully!");
      if (onSubmit) onSubmit(result);
    } catch (error) {
      alert("Registration error: " + JSON.stringify(error));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      handleRegisterCompany();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
        setFormData({
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
            <h3 style={styles.stepTitle}>Company Information</h3>
            <div style={styles.formGrid}>
              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.companyName ? styles.inputError : {}) }}
                  placeholder="Enter company name"
                />
                {errors.companyName && <span style={styles.errorMessage}>{errors.companyName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Registration Number *</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.registrationNumber ? styles.inputError : {}) }}
                  placeholder="Company registration number"
                />
                {errors.registrationNumber && <span style={styles.errorMessage}>{errors.registrationNumber}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Tax ID</label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Tax identification number"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Company Type</label>
                <select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="Government">Government</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Established Year</label>
                <input
                  type="number"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleChange}
                  style={styles.input}
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="YYYY"
                />
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
                  placeholder="company@example.com"
                />
                {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
              </div>

              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="https://www.company.com"
                />
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
                <label style={styles.label}>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Postal code"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Person Name *</label>
                <input
                  type="text"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.contactPersonName ? styles.inputError : {}) }}
                  placeholder="Full name"
                />
                {errors.contactPersonName && <span style={styles.errorMessage}>{errors.contactPersonName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Person Title</label>
                <input
                  type="text"
                  name="contactPersonTitle"
                  value={formData.contactPersonTitle}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="e.g., General Manager"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Phone</label>
                <input
                  type="tel"
                  name="contactPersonPhone"
                  value={formData.contactPersonPhone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="+228 XX XX XX XX"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Email</label>
                <input
                  type="email"
                  name="contactPersonEmail"
                  value={formData.contactPersonEmail}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.contactPersonEmail ? styles.inputError : {}) }}
                  placeholder="contact@company.com"
                />
                {errors.contactPersonEmail && <span style={styles.errorMessage}>{errors.contactPersonEmail}</span>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Operations & Services</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Fleet Size</label>
                <input
                  name="fleetSize"
                  value={formData.fleetSize}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Operating License Number *</label>
                <input
                  type="text"
                  name="operatingLicense"
                  value={formData.operatingLicense}
                  onChange={handleChange}
                  style={{ ...styles.input, ...(errors.operatingLicense ? styles.inputError : {}) }}
                  placeholder="License number"
                />
                {errors.operatingLicense && <span style={styles.errorMessage}>{errors.operatingLicense}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>License Expiry Date</label>
                <input
                  type="date"
                  name="licenseExpiry"
                  value={formData.licenseExpiry}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Insurance Provider</label>
                <input
                  type="text"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Insurance company name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Policy Number</label>
                <input
                  type="text"
                  name="insurancePolicyNumber"
                  value={formData.insurancePolicyNumber}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Policy number"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Insurance Expiry</label>
                <input
                  type="date"
                  name="insuranceExpiry"
                  value={formData.insuranceExpiry}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.servicesSection}>
              <label style={styles.label}>Services Offered</label>
              <div style={styles.checkboxGrid}>
                {[
                  'Container Transport',
                  'Bulk Cargo',
                  'General Cargo',
                  'Hazardous Materials',
                  'Refrigerated Transport',
                  'Heavy Machinery'
                ].map(service => (
                  <label key={service} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="servicesOffered"
                      value={service}
                      checked={formData.servicesOffered.includes(service)}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span style={styles.checkboxText}>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.routesSection}>
              <label style={styles.label}>Operating Routes</label>
              <div style={styles.checkboxGrid}>
                {[
                  'Lomé Port - Burkina Faso',
                  'Lomé Port - Mali',
                  'Lomé Port - Niger',
                  'Lomé Port - Ghana',
                  'Domestic Routes',
                  'Regional West Africa'
                ].map(route => (
                  <label key={route} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="operatingRoutes"
                      value={route}
                      checked={formData.operatingRoutes.includes(route)}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span style={styles.checkboxText}>{route}</span>
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
                  <h4 style={styles.summaryTitle}>Company Info</h4>
                  <p><strong>Name:</strong> {formData.companyName}</p>
                  <p><strong>Registration:</strong> {formData.registrationNumber}</p>
                  <p><strong>Type:</strong> {formData.companyType}</p>
                  <p><strong>Established:</strong> {formData.establishedYear || 'Not provided'}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Contact</h4>
                  <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Contact Person:</strong> {formData.contactPersonName}</p>
                  <p><strong>City:</strong> {formData.city || 'Not provided'}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Operations</h4>
                  <p><strong>Fleet Size:</strong> {formData.fleetSize || 'Not specified'}</p>
                  <p><strong>License:</strong> {formData.operatingLicense}</p>
                  <p><strong>Insurance:</strong> {formData.insuranceProvider || 'Not provided'}</p>
                </div>

                <div style={styles.summarySection}>
                  <h4 style={styles.summaryTitle}>Services</h4>
                  <p><strong>Services:</strong> {formData.servicesOffered.length} selected</p>
                  <p><strong>Routes:</strong> {formData.operatingRoutes.length} selected</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return renderStepContent();
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>REGISTER NEW Company</h2>
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
  //   position: 'absolute',
  //   top: '24px',
  //   left: '60%',
  //   right: '-40%',
  //   height: '2px',
  //   backgroundColor: '#e5e7eb',
  //   transition: 'all 0.3s ease'
  // },
  // stepConnectorActive: {
  //   backgroundColor: '#6366f1'
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
  inputError: {
    borderColor: '#ef4444'
  },
  errorMessage: {
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '4px'
  },
  servicesSection: {
    marginTop: '24px'
  },
  routesSection: {
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

export default CompanyRegistration