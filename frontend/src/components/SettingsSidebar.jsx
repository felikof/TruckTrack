import { useState } from 'react'

function SettingsSidebar({ onClose }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    darkMode: false,
    autoRefresh: true,
    soundAlerts: true,
    language: 'en',
    timezone: 'Africa/Lome',
    currency: 'CFA'
  })

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleSelect = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  return (
    <div className="settings-sidebar">
      <div className="sidebar-header">
        <h3>Settings</h3>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h4>Notifications</h4>
          <div className="setting-item">
            <div className="setting-info">
              <h5>Email Notifications</h5>
              <p>Receive booking updates via email</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h5>SMS Notifications</h5>
              <p>Get text alerts for important updates</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={() => handleToggle('smsNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h5>Push Notifications</h5>
              <p>Browser notifications for real-time updates</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h5>Sound Alerts</h5>
              <p>Play sounds for notifications</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.soundAlerts}
                onChange={() => handleToggle('soundAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h4>Appearance</h4>
          <div className="setting-item">
            <div className="setting-info">
              <h5>Dark Mode</h5>
              <p>Use dark theme for the interface</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h5>Auto Refresh</h5>
              <p>Automatically refresh slot availability</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.autoRefresh}
                onChange={() => handleToggle('autoRefresh')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h4>Regional Settings</h4>
          <div className="setting-item">
            <div className="setting-info">
              <h5>Language</h5>
              <p>Choose your preferred language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSelect('language', e.target.value)}
              className="select-input"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h5>Timezone</h5>
              <p>Set your local timezone</p>
            </div>
            <select
              value={settings.timezone}
              onChange={(e) => handleSelect('timezone', e.target.value)}
              className="select-input"
            >
              <option value="Africa/Lome">Africa/Lome (GMT)</option>
              <option value="Africa/Accra">Africa/Accra (GMT)</option>
              <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h5>Currency</h5>
              <p>Display prices in your currency</p>
            </div>
            <select
              value={settings.currency}
              onChange={(e) => handleSelect('currency', e.target.value)}
              className="select-input"
            >
              <option value="CFA">XOF (CFA Franc)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="GHS">GHS (Ghana Cedi)</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h4>Account</h4>
          <button className="profile-btn" style={{ width: '100%', marginBottom: '0.75rem' }}>
            Change Password
          </button>
          <button className="profile-btn" style={{ width: '100%', marginBottom: '0.75rem' }}>
            Privacy Settings
          </button>
          <button className="profile-btn" style={{ width: '100%', marginBottom: '0.75rem' }}>
            Export Data
          </button>
          <button className="cancel-btn" style={{ width: '100%' }}>
            Delete Account
          </button>
        </div>
      </div>

      <div className="sidebar-actions">
        <button className="profile-btn" onClick={onClose}>
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default SettingsSidebar