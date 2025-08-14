// Header.jsx
export default function Header({ activeTab, setActiveTab }) {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <span className="logo-text">Truck-Tracking</span>
                </div>
                
                <nav className="navigation">
                    <button
                        className={`nav-tab ${activeTab === 'browse-slots' ? 'active' : ''}`}
                        onClick={() => setActiveTab('browse-slots')}
                    >
                        Parcourir les créneaux
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'my-booking' ? 'active' : ''}`}
                        onClick={() => setActiveTab('my-booking')}
                    >
                        Mes réservations
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'scheduled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('scheduled')}
                    >
                        Programmé
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        Historiques
                    </button>
                </nav>

                <div className="header-actions">
                    <button className="settings-btn">⚙️</button>
                    <button className="notifications-btn">🔔</button>
                    <div className="user-avatar">👤</div>
                </div>
            </div>
        </header>
    );
}