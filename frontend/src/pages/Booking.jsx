import { useState } from 'react'
import '/src/Booking.css'

function Booking() {
    const [activeTab, setActiveTab] = useState('browse-slots')
    const [searchForm, setSearchForm] = useState({
        origin: 'Gate A1',
        destination: 'Terminal 3',
        date: '2025-01-15',
        returnSlot: false,
        truckType: 'Standard',
        cargoType: 'Conteneur'
    })
    const [filters, setFilters] = useState({
        timeRange: { start: '07:00', end: '18:00' },
        selectedTime: '08:00',
        facilities: {
        bascule: true,
        inspection: false,
        douane: false,
        parking: true
        }
    })

    const [availableSlots] = useState([
        {
        id: 1,
        timeSlot: '08:00',
        duration: '2h 30m',
        gate: 'Gate A1',
        terminal: 'Terminal 3',
        price: 45000,
        currency: 'CFA',
        stops: [
            { time: '08:00', location: 'Gate A1', transfer: '15min temps de transfert' },
            { time: '08:15', location: 'Pont-bascule', transfer: '20min processus' },
            { time: '08:45', location: 'Terminal 3', transfer: 'Destination finale' }
        ],
        amenities: ['pont-bascule', 'parking', 'sécurité'],
        available: true,
        slotsLeft: 12
        },
        {
        id: 2,
        timeSlot: '10:30',
        duration: '3h 15m',
        gate: 'Gate B2',
        terminal: 'Terminal 3',
        price: 52000,
        currency: 'CFA',
        stops: [
            { time: '10:30', location: 'Gate B2', transfer: '20min temps de transfert' },
            { time: '11:00', location: 'Douanes', transfer: '45min inspection' },
            { time: '12:15', location: 'Pont-bascule', transfer: '15min processus' },
            { time: '12:45', location: 'Terminal 3', transfer: 'Destination finale' }
        ],
        amenities: ['pont-bascule', 'inspection', 'douanes', 'parking'],
        available: true,
        slotsLeft: 8
        },
        {
        id: 3,
        timeSlot: '14:20',
        duration: '2h 45m',
        gate: 'Gate C1',
        terminal: 'Terminal 3',
        price: 48000,
        currency: 'CFA',
        stops: [
            { time: '14:20', location: 'Gate C1', transfer: '10min temps de transfert' },
            { time: '14:45', location: 'Pont-bascule', transfer: '25min processus' },
            { time: '15:30', location: 'Terminal 3', transfer: 'Destination Finale' }
        ],
        amenities: ['pont-bascule', 'parking', 'sécurité', 'inspection'],
        available: true,
        slotsLeft: 15
        }
    ])

    const [myBookings] = useState([
        {
        id: 'BK001',
        bookingRef: 'TG-2025-001',
        status: 'confirmé',
        date: '2025-01-15',
        timeSlot: '08:00',
        duration: '2h 30m',
        gate: 'Gate A1',
        terminal: 'Terminal 3',
        truckPlate: 'TG-1234-AB',
        driverName: 'Kofi Mensah',
        price: 45000,
        currency: 'CFA',
        stops: [
            { time: '08:00', location: 'Gate A1', transfer: '15min temps de transfert' },
            { time: '08:15', location: 'Pont-bascule', transfer: '20min processus' },
            { time: '08:45', location: 'Terminal 3', transfer: 'Destination finale' }
        ],
        amenities: ['pont-bascule', 'parking', 'sécurité'],
        bookedAt: '2025-01-10T14:30:00Z'
        },
        {
        id: 'BK002',
        bookingRef: 'TG-2025-002',
        status: 'en attente',
        date: '2025-01-16',
        timeSlot: '10:30',
        duration: '3h 15m',
        gate: 'Gate B2',
        terminal: 'Terminal 2',
        truckPlate: 'TG-5678-CD',
        driverName: 'Ama Asante',
        price: 52000,
        currency: 'CFA',
        stops: [
            { time: '10:30', location: 'Gate B2', transfer: '20min temps de transfert' },
            { time: '11:00', location: 'Douanes', transfer: '45min inspection' },
            { time: '12:15', location: 'Pont-bascule', transfer: '15min processus' },
            { time: '12:45', location: 'Terminal 2', transfer: 'Destination finale' }
        ],
        amenities: ['pont-bascule', 'inspection', 'douanes', 'parking'],
        bookedAt: '2025-01-12T09:15:00Z'
        }
    ])

    const [scheduledSlots] = useState([
        {
        id: 'SC001',
        bookingRef: 'TG-2025-003',
        status: 'prévu',
        date: '2025-01-17',
        timeSlot: '09:15',
        duration: '2h 45m',
        gate: 'Gate A2',
        terminal: 'Terminal 1',
        truckPlate: 'TG-9012-EF',
        driverName: 'Kwame Nkrumah',
        price: 48000,
        currency: 'CFA',
        stops: [
            { time: '09:15', location: 'Gate A2', transfer: '10min temps de transfert' },
            { time: '09:30', location: 'Pont-bascule', transfer: '25min processus' },
            { time: '10:15', location: 'Terminal 1', transfer: 'Destination finale' }
        ],
        amenities: ['pont-bascule', 'parking', 'sécurité'],
        estimatedArrival: '10:15',
        currentStatus: 'En Transit - Gate A2'
        },
        {
        id: 'SC002',
        bookingRef: 'TG-2025-004',
        status: 'en cours',
        date: '2025-01-15',
        timeSlot: '14:00',
        duration: '3h 00m',
        gate: 'Gate C1',
        terminal: 'Terminal 3',
        truckPlate: 'TG-3456-GH',
        driverName: 'Akosua Osei',
        price: 55000,
        currency: 'CFA',
        stops: [
            { time: '14:00', location: 'Gate C1', transfer: '15min temps de transfert', completed: true },
            { time: '14:20', location: 'Douanes', transfer: '40min inspection', completed: true },
            { time: '15:15', location: 'Pont-bascule', transfer: '20min procesus', completed: false },
            { time: '15:45', location: 'Terminal 3', transfer: 'Destination finale', completed: false }
        ],
        amenities: ['pont-bascule', 'inspection', 'douanes', 'parking'],
        estimatedArrival: '15:45',
        currentStatus: 'À la douane - En cours de traitement'
        }
    ])

    const [bookingHistory] = useState([
        {
        id: 'HT001',
        bookingRef: 'TG-2024-156',
        status: 'completé',
        date: '2024-12-20',
        timeSlot: '11:30',
        duration: '2h 15m',
        gate: 'Gate A1',
        terminal: 'Terminal 2',
        truckPlate: 'TG-1234-AB',
        driverName: 'Kofi Mensah',
        price: 42000,
        currency: 'CFA',
        completedAt: '13:45',
        rating: 5
        },
        {
        id: 'HT002',
        bookingRef: 'TG-2024-145',
        status: 'completé',
        date: '2024-12-15',
        timeSlot: '08:00',
        duration: '3h 30m',
        gate: 'Gate B2',
        terminal: 'Terminal 1',
        truckPlate: 'TG-5678-CD',
        driverName: 'Ama Asante',
        price: 58000,
        currency: 'CFA',
        completedAt: '11:30',
        rating: 4
        },
        {
        id: 'HT003',
        bookingRef: 'TG-2024-132',
        status: 'annulé',
        date: '2024-12-10',
        timeSlot: '15:20',
        duration: '2h 45m',
        gate: 'Gate C1',
        terminal: 'Terminal 3',
        truckPlate: 'TG-9012-EF',
        driverName: 'Kwame Nkrumah',
        price: 48000,
        currency: 'CFA',
        cancelledAt: '2024-12-09T16:30:00Z',
        refundAmount: 48000
        }
    ])

    const handleSearch = (e) => {
        e.preventDefault()
        // Search logic would go here
        console.log('Searching with:', searchForm)
    }

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
        ...prev,
        [filterType]: value
        }))
    }

    const handleBookSlot = (slotId) => {
        console.log('Créneau de réservation:', slotId)
        // Booking logic would go here
    }

    const handleCancelBooking = (bookingId) => {
        console.log('Annulation de la réservation:', bookingId)
        // Cancel booking logic would go here
    }

    const handleModifyBooking = (bookingId) => {
        console.log('Modification de la réservation:', bookingId)
        // Modify booking logic would go here
    }

    const formatPrice = (price, currency) => {
        return `${currency} ${price.toLocaleString()}`
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
        })
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
        confirmed: { class: 'status-confirmed', text: 'Confirmé' },
        pending: { class: 'status-pending', text: 'En attente' },
        scheduled: { class: 'status-scheduled', text: 'Prévu ' },
        'in-progress': { class: 'status-in-progress', text: 'En cours' },
        completed: { class: 'status-completed', text: 'Completé' },
        cancelled: { class: 'status-cancelled', text: 'Annulé' }
        }
        return statusConfig[status] || { class: 'status-default', text: status }
    }

    const getAmenityIcon = (amenity) => {
        const icons = {
        bascule: '⚖️',
        inspection: '🔍',
        douane: '📋',
        parking: '🅿️',
        security: '🛡️'
        }
        return icons[amenity] || '✓'
    }

    const renderMyBookings = () => (
        <section className="results-section">
        <div className="section-header">
            <h2>Mes réservations</h2>
            <span className="results-count">{myBookings.length} Réservations actives</span>
        </div>
        
        <div className="slots-list">
            {myBookings.map((booking) => (
            <div key={booking.id} className="slot-card booking-card">
                <div className="slot-header">
                <div className="booking-info">
                    <div className="booking-ref">
                    <span className="ref-number">#{booking.bookingRef}</span>
                    <span className={`status-badge ${getStatusBadge(booking.status).class}`}>
                        {getStatusBadge(booking.status).text}
                    </span>
                    </div>
                    <div className="booking-date">
                    <span className="date">{formatDate(booking.date)}</span>
                    <span className="duration">Durée {booking.duration}</span>
                    </div>
                </div>
                <div className="booking-actions">
                    <button className="modify-btn" onClick={() => handleModifyBooking(booking.id)}>
                    Modifier
                    </button>
                    <button className="cancel-btn" onClick={() => handleCancelBooking(booking.id)}>
                    Annuler
                    </button>
                </div>
                </div>

                <div className="booking-details">
                <div className="truck-info">
                    <div className="info-item">
                    <span className="label">Immatriculation:</span>
                    <span className="value">{booking.truckPlate}</span>
                    </div>
                    <div className="info-item">
                    <span className="label">Chauffeur:</span>
                    <span className="value">{booking.driverName}</span>
                    </div>
                </div>
                </div>

                <div className="slot-details">
                <div className="time-info">
                    <div className="departure-time">
                    <span className="time">{booking.timeSlot}</span>
                    <span className="location">{booking.gate}</span>
                    </div>
                    
                    <div className="route-visualization">
                    {booking.stops.map((stop, index) => (
                        <div key={index} className="route-stop">
                        <div className="stop-time">{stop.time}</div>
                        <div className="stop-dot"></div>
                        <div className="stop-info">
                            <div className="stop-location">{stop.location}</div>
                            <div className="transfer-time">{stop.transfer}</div>
                        </div>
                        </div>
                    ))}
                    </div>

                    <div className="arrival-info">
                    <span className="location">{booking.terminal}</span>
                    </div>
                </div>

                <div className="slot-pricing">
                    <div className="price">
                    <span className="amount">{formatPrice(booking.price, booking.currency)}</span>
                    <span className="includes">/ Frais inclus</span>
                    </div>
                </div>
                </div>

                <div className="slot-amenities">
                {booking.amenities.map((amenity) => (
                    <span key={amenity} className="amenity" title={amenity}>
                    {getAmenityIcon(amenity)}
                    </span>
                ))}
                </div>
            </div>
            ))}
        </div>
        </section>
    )

    const renderScheduled = () => (
        <section className="results-section">
        <div className="section-header">
            <h2>Créneaux prévus</h2>
            <span className="results-count">{scheduledSlots.length} créneaux prévus</span>
        </div>
        
        <div className="slots-list">
            {scheduledSlots.map((slot) => (
            <div key={slot.id} className="slot-card scheduled-card">
                <div className="slot-header">
                <div className="booking-info">
                    <div className="booking-ref">
                    <span className="ref-number">#{slot.bookingRef}</span>
                    <span className={`status-badge ${getStatusBadge(slot.status).class}`}>
                        {getStatusBadge(slot.status).text}
                    </span>
                    </div>
                    <div className="current-status">
                    <span className="status-text">{slot.currentStatus}</span>
                    <span className="eta">ETA: {slot.estimatedArrival}</span>
                    </div>
                </div>
                <div className="live-indicator">
                    <div className="pulse-dot"></div>
                    <span>Live</span>
                </div>
                </div>

                <div className="booking-details">
                <div className="truck-info">
                    <div className="info-item">
                    <span className="label">Immatriculation:</span>
                    <span className="value">{slot.truckPlate}</span>
                    </div>
                    <div className="info-item">
                    <span className="label">Chauffeur:</span>
                    <span className="value">{slot.driverName}</span>
                    </div>
                </div>
                </div>

                <div className="slot-details">
                <div className="time-info">
                    <div className="departure-time">
                    <span className="time">{slot.timeSlot}</span>
                    <span className="location">{slot.gate}</span>
                    </div>
                    
                    <div className="route-visualization">
                    {slot.stops.map((stop, index) => (
                        <div key={index} className={`route-stop ${stop.completed ? 'completed' : ''}`}>
                        <div className="stop-time">{stop.time}</div>
                        <div className={`stop-dot ${stop.completed ? 'completed' : ''}`}></div>
                        <div className="stop-info">
                            <div className="stop-location">{stop.location}</div>
                            <div className="transfer-time">{stop.transfer}</div>
                            {stop.completed && <div className="completed-check">✓</div>}
                        </div>
                        </div>
                    ))}
                    </div>

                    <div className="arrival-info">
                    <span className="location">{slot.terminal}</span>
                    </div>
                </div>

                <div className="slot-pricing">
                    <div className="price">
                    <span className="amount">{formatPrice(slot.price, slot.currency)}</span>
                    <span className="includes">/ frais inclus</span>
                    </div>
                </div>
                </div>

                <div className="slot-amenities">
                {slot.amenities.map((amenity) => (
                    <span key={amenity} className="amenity" title={amenity}>
                    {getAmenityIcon(amenity)}
                    </span>
                ))}
                </div>
            </div>
            ))}
        </div>
        </section>
    )

    const renderHistory = () => (
        <section className="results-section">
        <div className="section-header">
            <h2>Historique des réservations</h2>
            <span className="results-count">{bookingHistory.length} réservations passées</span>
        </div>
        
        <div className="slots-list">
            {bookingHistory.map((booking) => (
            <div key={booking.id} className="slot-card history-card">
                <div className="slot-header">
                <div className="booking-info">
                    <div className="booking-ref">
                    <span className="ref-number">#{booking.bookingRef}</span>
                    <span className={`status-badge ${getStatusBadge(booking.status).class}`}>
                        {getStatusBadge(booking.status).text}
                    </span>
                    </div>
                    <div className="booking-date">
                    <span className="date">{formatDate(booking.date)}</span>
                    {booking.completedAt && (
                        <span className="completed-time">Terminé à {booking.completedAt}</span>
                    )}
                    </div>
                </div>
                {booking.rating && (
                    <div className="rating">
                    {'★'.repeat(booking.rating)}{'☆'.repeat(5 - booking.rating)}
                    </div>
                )}
                </div>

                <div className="booking-details">
                <div className="truck-info">
                    <div className="info-item">
                    <span className="label">Immatriculation:</span>
                    <span className="value">{booking.truckPlate}</span>
                    </div>
                    <div className="info-item">
                    <span className="label">Chauffeur:</span>
                    <span className="value">{booking.driverName}</span>
                    </div>
                </div>
                </div>

                <div className="history-summary">
                <div className="route-summary">
                    <span className="route">{booking.gate} → {booking.terminal}</span>
                    <span className="duration">{booking.duration}</span>
                </div>
                <div className="price-summary">
                    <span className="amount">{formatPrice(booking.price, booking.currency)}</span>
                    {booking.refundAmount && (
                    <span className="refund">Remboursé: {formatPrice(booking.refundAmount, booking.currency)}</span>
                    )}
                </div>
                </div>

                {booking.status === 'completed' && (
                <div className="history-actions">
                    <button className="rebook-btn">Réserver à nouveau</button>
                    <button className="receipt-btn">Télécharger le reçu</button>
                </div>
                )}
            </div>
            ))}
        </div>
        </section>
    )

    const renderContent = () => {
        switch (activeTab) {
        case 'my-booking':
            return renderMyBookings()
        case 'scheduled':
            return renderScheduled()
        case 'history':
            return renderHistory()
        default:
            return (
            <div className="content-area">
                <aside className="filters-sidebar">
                <div className="filters-header">
                    <h3>Filtres</h3>
                    <button className="reset-btn">Réinitialiser</button>
                    <div className="results-count">
                    <span className="available-badge">Disponible</span>
                    <span className="recommended-badge">Recommandé</span>
                    <span className="count">{availableSlots.length} places restantes</span>
                    </div>
                </div>

                <div className="filter-section">
                    <h4>Temps</h4>
                    <div className="time-inputs">
                    <input
                        type="time"
                        value={filters.timeRange.start}
                        onChange={(e) => handleFilterChange('timeRange', {...filters.timeRange, start: e.target.value})}
                    />
                    <span>→</span>
                    <input
                        type="time"
                        value={filters.timeRange.end}
                        onChange={(e) => handleFilterChange('timeRange', {...filters.timeRange, end: e.target.value})}
                    />
                    </div>

                    <div className="time-selector">
                    <label>Sélectionner l'heure souhaitée</label>
                    <div className="time-grid">
                        {['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                        <button
                            key={time}
                            className={`time-slot ${filters.selectedTime === time ? 'selected' : ''}`}
                            onClick={() => handleFilterChange('selectedTime', time)}
                        >
                            {time}
                        </button>
                        ))}
                    </div>
                    </div>

                    <div className="time-chart">
                    <div className="chart-bars">
                        {Array.from({length: 12}, (_, i) => (
                        <div key={i} className="bar" style={{height: `${Math.random() * 60 + 20}%`}}></div>
                        ))}
                    </div>
                    </div>
                </div>

                <div className="filter-section">
                    <h4>Installations</h4>
                    <div className="facilities-list">
                    {Object.entries(filters.facilities).map(([facility, checked]) => (
                        <label key={facility} className="facility-checkbox">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => handleFilterChange('facilities', {...filters.facilities, [facility]: e.target.checked})}
                        />
                        <span className="facility-name">
                            {facility.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                        </label>
                    ))}
                    </div>
                </div>

                <button className="apply-filters-btn">Appliquer les filtres</button>
                </aside>

                <section className="results-section">
                <div className="slots-list">
                    {availableSlots.map((slot) => (
                    <div key={slot.id} className="slot-card">
                        <div className="slot-header">
                        <div className="provider-info">
                            <div className="provider-icon">🏢</div>
                            <span className="provider-name">Autorité portuaire</span>
                        </div>
                        <div className="duration-info">
                            <span className="duration">Durée {slot.duration}</span>
                        </div>
                        </div>

                        <div className="slot-details">
                        <div className="time-info">
                            <div className="departure-time">
                            <span className="time">{slot.timeSlot}</span>
                            <span className="location">{slot.gate}</span>
                            </div>
                            
                            <div className="route-visualization">
                            {slot.stops.map((stop, index) => (
                                <div key={index} className="route-stop">
                                <div className="stop-time">{stop.time}</div>
                                <div className="stop-dot"></div>
                                <div className="stop-info">
                                    <div className="stop-location">{stop.location}</div>
                                    <div className="transfer-time">{stop.transfer}</div>
                                </div>
                                </div>
                            ))}
                            </div>

                            <div className="arrival-info">
                            <span className="location">{slot.terminal}</span>
                            </div>
                        </div>

                        <div className="slot-pricing">
                            <div className="price">
                            <span className="amount">{formatPrice(slot.price, slot.currency)}</span>
                            <span className="includes">/ frais inclus</span>
                            </div>
                        </div>
                        </div>

                        <div className="slot-amenities">
                        {slot.amenities.map((amenity) => (
                            <span key={amenity} className="amenity" title={amenity}>
                            {getAmenityIcon(amenity)}
                            </span>
                        ))}
                        </div>

                        <div className="slot-actions">
                        <span className="slots-left">{slot.slotsLeft} places restantes</span>
                        <button 
                            className="book-btn"
                            onClick={() => handleBookSlot(slot.id)}
                        >
                            Reserve
                        </button>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="popular-section">
                    <div className="popular-header">
                    <span className="popular-badge">Populaires</span>
                    <span className="slots-count">{availableSlots.length} places restantes</span>
                    </div>
                    
                    <div className="popular-slot">
                    <div className="provider-info">
                        <div className="provider-icon">🏢</div>
                        <span className="provider-name">Autorité portuaire</span>
                    </div>
                    <div className="popular-duration">Durée 2h 15m</div>
                    </div>
                </div>
                </section>
            </div>
            )
        }
    }

    return (
        <div className="app">
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

        <main className="main-content">
            {activeTab === 'browse-slots' && (
            <div className="search-section">
                <form onSubmit={handleSearch} className="search-form">
                <div className="search-row">
                    <div className="input-group">
                    <label>De</label>
                    <select
                        value={searchForm.origin}
                        onChange={(e) => setSearchForm(prev => ({...prev, origin: e.target.value}))}
                        className="location-input"
                    >
                        <option value="Gate A1">Gate A1</option>
                        <option value="Gate B2">Gate B2</option>
                        <option value="Gate C1">Gate C1</option>
                    </select>
                    </div>

                    <button type="button" className="swap-btn">⇄</button>

                    <div className="input-group">
                    <label>Á</label>
                    <select
                        value={searchForm.destination}
                        onChange={(e) => setSearchForm(prev => ({...prev, destination: e.target.value}))}
                        className="location-input"
                    >
                        <option value="Terminal 1">Terminal 1</option>
                        <option value="Terminal 2">Terminal 2</option>
                        <option value="Terminal 3">Terminal 3</option>
                    </select>
                    </div>

                    <div className="input-group">
                    <label>Date du créneau</label>
                    <input
                        type="date"
                        value={searchForm.date}
                        onChange={(e) => setSearchForm(prev => ({...prev, date: e.target.value}))}
                        className="date-input"
                    />
                    </div>

                    <div className="input-group">
                    <label>Créneau de retour</label>
                    <label className="toggle-switch">
                        <input
                        type="checkbox"
                        checked={searchForm.returnSlot}
                        onChange={(e) => setSearchForm(prev => ({...prev, returnSlot: e.target.checked}))}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                    </div>

                    <div className="input-group">
                    <label>Type de camion</label>
                    <select
                        value={searchForm.truckType}
                        onChange={(e) => setSearchForm(prev => ({...prev, truckType: e.target.value}))}
                        className="select-input"
                    >
                        <option value="Standard">Standard</option>
                        <option value="Heavy Duty">Poids lourd</option>
                        <option value="Conteneur">Conteneur</option>
                    </select>
                    </div>

                    <div className="input-group">
                    <label>Type de chargement</label>
                    <select
                        value={searchForm.cargoType}
                        onChange={(e) => setSearchForm(prev => ({...prev, cargoType: e.target.value}))}
                        className="select-input"
                    >
                        <option value="Conteneur">Conteneur</option>
                        <option value="Bulk">Marchandise</option>
                        <option value="General">General</option>
                    </select>
                    </div>
                </div>
                </form>
            </div>
            )}

            {renderContent()}
        </main>
        </div>
    )
}

export default Booking