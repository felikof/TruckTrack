import { useEffect, useState } from 'react'
import "/src/Booking.css"
import { data, useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
import DriverRegistration from '/src/components/DriverRegistration'
import CompanyRegistration from '/src/components/CompanyRegistration'
import TruckRegistration from '/src/components/TruckRegistration'
import SlotReservation from '/src/components/SlotReservation'
import { Settings, Bell } from 'lucide-react'
import SettingsSidebar from '/src/components/SettingsSidebar'
import NotificationsSidebar from '/src/components/NotificationsSidebar'
import { getSlots } from "../services/slotService";
import userService from "../services/userService";
import { createTruck } from "../services/truckService";
import { getBookingsByUser } from '../services/bookingService'

function Booking({ onLogout }) {
    const [activeTab, setActiveTab] = useState('browse-slots')
    const [currentForm, setCurrentForm] = useState(null)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [slots, setSlots] = useState([])
    const [user, setUsers] = useState([null])
    const [loading, setLoading] = useState(true)
    const [showUserSidebar, setShowUserSidebar] = useState(false)
    const [error, setError] = useState(null)
    const [showSettingsSidebar, setShowSettingsSidebar] = useState(false)
    const [showNotificationsSidebar, setShowNotificationsSidebar] = useState(false)

    // const [searchForm, setSearchForm] = useState({
    //     origin: 'Gate A1',
    //     destination: 'Terminal 3',
    //     date: '2025-01-15',
    //     truckType: 'Standard',
    //     cargoType: 'Container'
    // })
    const [filters, setFilters] = useState({
        timeRange: { start: '07:00', end: '18:00' },
        selectedTime: '',
    })

    useEffect(() => {
        getSlots()
            .then(data => {
                setSlots(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Erreur API:", err)
                setError("Impossible de charger les slots")
                setLoading(false)
            })
    }, [])

    // User data - in real app this would come from authentication
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const email = localStorage.getItem("email");
        console.log("Token :", token);
        if (!token) {
            toast.error("User not authenticated")
        } else {
            toast.success("User authentificated")
        }

        userService.getUser(token, email)
            .then(userData => setUsers(userData))
            .catch(err => console.error("Erreur 400:", err.response.data))
    }, [])
    
    const userData = user && user.length > 0 ? user[0] : null;
    console.log("User:", JSON.stringify(userData, null, 2));

    // const [user1] = useState({
    //     name: 'Dodji Koffi',
    //     email: 'dodji12@gmail.com',
    //     phone: '',
    //     company: '',
    //     role: '',
    //     avatar: '👤',
    //     isLoggedIn: true,
    //     totalBookings: 1,
    //     activeBookings: 0
    // })

    // console.log("Slots :", slots)
    // const availableSlots = Array.isArray(slots) ? slots : [];
    // console.log(availableSlots.get(1))

    const [availableSlots] = useState([
        {
            id: '3751de8b-4414-466d-9dd0-e129ac2107b6',
            timeSlot: '08:00',
            duration: '2h 30m',
            gate: 'Gate A1',
            terminal: 'Terminal 3',
            price: 45000,
            currency: 'CFA',
            stops: [
                { time: '08:00', location: 'Gate A1', transfer: '15min transfer time' },
                { time: '08:15', location: 'Weighbridge', transfer: '20min process' },
                { time: '08:45', location: 'Terminal 3', transfer: 'Final destination' }
            ],
            amenities: ['weighBridge', 'parking', 'security'],
            available: true,
            slotsLeft: 12
        },
        {
            id: 2,
            timeSlot: '10:00',
            duration: '3h 15m',
            gate: 'Gate B2',
            terminal: 'Terminal 3',
            price: 52000,
            currency: 'CFA',
            stops: [
                { time: '10:30', location: 'Gate B2', transfer: '20min transfer time' },
                { time: '11:00', location: 'Customs', transfer: '45min inspection' },
                { time: '12:15', location: 'Weighbridge', transfer: '15min process' },
                { time: '12:45', location: 'Terminal 3', transfer: 'Final destination' }
            ],
            amenities: ['weighBridge', 'inspection', 'customs', 'parking'],
            available: true,
            slotsLeft: 8
        },
        {
            id: 3,
            timeSlot: '14:00',
            duration: '2h 45m',
            gate: 'Gate C1',
            terminal: 'Terminal 3',
            price: 48000,
            currency: 'CFA',
            stops: [
                { time: '14:20', location: 'Gate C1', transfer: '10min transfer time' },
                { time: '14:45', location: 'Weighbridge', transfer: '25min process' },
                { time: '15:30', location: 'Terminal 3', transfer: 'Final destination' }
            ],
            amenities: ['weighBridge', 'parking', 'security', 'inspection'],
            available: true,
            slotsLeft: 15
        }
    ])

    // const userId = localStorage.getItem("id"); // stocké au login
    // const [myBookings, setMyBookings] = useState([]);

    // useEffect(() => {
    //     async function fetchBookings() {
    //         if (userId) {
    //             try {
    //                 const bookings = await getBookingsByUser(userId);
    //                 setMyBookings(bookings);
    //             } catch (err) {
    //                 console.error("Erreur lors du chargement des réservations:", err);
    //             }
    //         }
    //     }
    //     fetchBookings();
    // }, [userId]);

    // console.log("Bookings:", JSON.stringify(myBookings, null, 2));

    const [myBookings] = useState([
        {
            id: 'BK001',
            bookingRef: '',
            status: 'pending',
            date: '2025-01-15',
            timeSlot: '08:00',
            duration: '2h 30m',
            gate: 'Gate A1',
            terminal: 'Terminal 3',
            truckPlate: 'TG-1234-AB',
            driverName: '',
            price: 45000,
            currency: 'CFA',
            stops: [
                { time: '08:00', location: 'Gate A1', transfer: '15min transfer time' },
                { time: '08:15', location: 'Weighbridge', transfer: '20min process' },
                { time: '08:45', location: 'Terminal 3', transfer: 'Final destination' }
            ],
            amenities: ['weighBridge', 'parking', 'security'],
            bookedAt: '2025-01-10T14:30:00Z'
        },
        // {
        //     id: 'BK002',
        //     bookingRef: 'TG-2025-002',
        //     status: 'pending',
        //     date: '2025-01-16',
        //     timeSlot: '10:30',
        //     duration: '3h 15m',
        //     gate: 'Gate B2',
        //     terminal: 'Terminal 2',
        //     truckPlate: 'TG-5678-CD',
        //     driverName: 'Ama Asante',
        //     price: 52000,
        //     currency: 'CFA',
        //     stops: [
        //         { time: '10:30', location: 'Gate B2', transfer: '20min transfer time' },
        //         { time: '11:00', location: 'Customs', transfer: '45min inspection' },
        //         { time: '12:15', location: 'Weighbridge', transfer: '15min process' },
        //         { time: '12:45', location: 'Terminal 2', transfer: 'Final destination' }
        //     ],
        //     amenities: ['weighBridge', 'inspection', 'customs', 'parking'],
        //     bookedAt: '2025-01-12T09:15:00Z'
        // }
    ])

    const [scheduledSlots] = useState([
        // {
        //     id: 'SC001',
        //     bookingRef: 'TG-2025-003',
        //     status: 'scheduled',
        //     date: '2025-01-17',
        //     timeSlot: '09:15',
        //     duration: '2h 45m',
        //     gate: 'Gate A2',
        //     terminal: 'Terminal 1',
        //     truckPlate: 'TG-9012-EF',
        //     driverName: 'Kwame Nkrumah',
        //     price: 48000,
        //     currency: 'CFA',
        //     stops: [
        //         { time: '09:15', location: 'Gate A2', transfer: '10min transfer time' },
        //         { time: '09:30', location: 'Weighbridge', transfer: '25min process' },
        //         { time: '10:15', location: 'Terminal 1', transfer: 'Final destination' }
        //     ],
        //     amenities: ['weighBridge', 'parking', 'security'],
        //     estimatedArrival: '10:15',
        //     currentStatus: 'In Transit - Gate A2'
        // },
        // {
        //     id: 'SC002',
        //     bookingRef: 'TG-2025-004',
        //     status: 'in-progress',
        //     date: '2025-01-15',
        //     timeSlot: '14:00',
        //     duration: '3h 00m',
        //     gate: 'Gate C1',
        //     terminal: 'Terminal 3',
        //     truckPlate: 'TG-3456-GH',
        //     driverName: 'Akosua Osei',
        //     price: 55000,
        //     currency: 'CFA',
        //     stops: [
        //         { time: '14:00', location: 'Gate C1', transfer: '15min transfer time', completed: true },
        //         { time: '14:20', location: 'Customs', transfer: '40min inspection', completed: true },
        //         { time: '15:15', location: 'Weighbridge', transfer: '20min process', completed: false },
        //         { time: '15:45', location: 'Terminal 3', transfer: 'Final destination', completed: false }
        //     ],
        //     amenities: ['weighBridge', 'inspection', 'customs', 'parking'],
        //     estimatedArrival: '15:45',
        //     currentStatus: 'At Customs - Processing'
        // }
    ])

    const [bookingHistory] = useState([
        // {
        //     id: 'HT001',
        //     bookingRef: 'TG-2024-156',
        //     status: 'completed',
        //     date: '2024-12-20',
        //     timeSlot: '11:30',
        //     duration: '2h 15m',
        //     gate: 'Gate A1',
        //     terminal: 'Terminal 2',
        //     truckPlate: 'TG-1234-AB',
        //     driverName: 'Kofi Mensah',
        //     price: 42000,
        //     currency: 'CFA',
        //     completedAt: '13:45',
        //     rating: 5
        // },
        // {
        //     id: 'HT002',
        //     bookingRef: 'TG-2024-145',
        //     status: 'completed',
        //     date: '2024-12-15',
        //     timeSlot: '08:00',
        //     duration: '3h 30m',
        //     gate: 'Gate B2',
        //     terminal: 'Terminal 1',
        //     truckPlate: 'TG-5678-CD',
        //     driverName: 'Ama Asante',
        //     price: 58000,
        //     currency: 'CFA',
        //     completedAt: '11:30',
        //     rating: 4
        // },
        // {
        //     id: 'HT003',
        //     bookingRef: 'TG-2024-132',
        //     status: 'cancelled',
        //     date: '2024-12-10',
        //     timeSlot: '15:20',
        //     duration: '2h 45m',
        //     gate: 'Gate C1',
        //     terminal: 'Terminal 3',
        //     truckPlate: 'TG-9012-EF',
        //     driverName: 'Kwame Nkrumah',
        //     price: 48000,
        //     currency: 'CFA',
        //     cancelledAt: '2024-12-09T16:30:00Z',
        //     refundAmount: 48000
        // }
    ])

    // const handleSearch = (e) => {
    //     e.preventDefault()
    //     // Search logic would go here
    //     console.log('Searching with:', searchForm)
    // }

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    const resetFilters = () => {
        setFilters({
            timeRange: { start: '07:00', end: '18:00' },
            selectedTime: ''
        })
    }

    // Filter slots based on current filters
    const filteredSlots = availableSlots.filter(slot => {
        // Time range filter
        const slotTime = slot.timeSlot
        const startTime = filters.timeRange.start
        const endTime = filters.timeRange.end

        if (startTime && endTime) {
            if (slotTime < startTime || slotTime > endTime) {
                return false
            }
        }

        // Selected time filter
        if (filters.selectedTime && slot.timeSlot !== filters.selectedTime) {
            return false
        }

        return true
    })

    const handleBookSlot = (slotId) => {
        const slot = availableSlots.find(s => s.id === slotId)
        setSelectedSlot(slot)
        setCurrentForm('slot-reservation')
        console.log('Booking slot:', slotId)
    }

    const handleCancelBooking = (bookingId) => {
        console.log('Cancelling booking:', bookingId)
        // Cancel booking logic would go here
    }

    const handleModifyBooking = (bookingId) => {
        console.log('Modifying booking:', bookingId)
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
            confirmed: { class: 'status-confirmed', text: 'Confirmed' },
            pending: { class: 'status-pending', text: 'Pending' },
            scheduled: { class: 'status-scheduled', text: 'Scheduled' },
            'in-progress': { class: 'status-in-progress', text: 'In Progress' },
            completed: { class: 'status-completed', text: 'Completed' },
            cancelled: { class: 'status-cancelled', text: 'Cancelled' }
        }
        return statusConfig[status] || { class: 'status-default', text: status }
    }

    const getAmenityIcon = (amenity) => {
        const icons = {
            weighBridge: '⚖️',
            inspection: '🔍',
            customs: '📋',
            parking: '🅿️',
            security: '🛡️'
        }
        return icons[amenity] || '✓'
    }

    const navigateOut = useNavigate();
    const navigateIn = useNavigate();

    const handleLogout = () => {
        if (onLogout) {
            onLogout()
        }
        navigateOut("/");
        // In real app, this would handle logout logic
        toast.success('Logging out...')
        setShowUserSidebar(false);
    }

    const handleLogin = () => {
        // In real app, this would handle login logic
        toast.success('Opening logging...')
        navigateIn("/SignIn/");
        setShowUserSidebar(false)
    }

    const handleFormSubmit = (formType, data) => {
        console.log(`${formType} submitted:`, data)
        // Here you would typically send the data to your backend
        setCurrentForm(null)
        setSelectedSlot(null)
        // Show success message or redirect
    }

    const handleTruckSubmit = async (formType, data) => {
        console.log(`${formType} submitted:`, data)
        // Here you would typically send the data to your backend

        setCurrentForm(null)
        setSelectedSlot(null)
    }

    const handleFormCancel = () => {
        setCurrentForm(null)
        setSelectedSlot(null)
    }

    // Form rendering functions
    const renderCurrentForm = () => {
        switch (currentForm) {
            case 'driver-registration':
                return (
                    <DriverRegistration
                        onSubmit={(data) => handleFormSubmit('driver-registration', data)}
                        onCancel={handleFormCancel}
                    />
                )
            case 'Company-registration':
                return (
                    <CompanyRegistration
                        onSubmit={(data) => handleFormSubmit('Company-registration', data)}
                        onCancel={handleFormCancel}
                    />
                )
            case 'truck-registration':
                return (
                    <TruckRegistration
                        onSubmit={(data) => handleTruckSubmit('truck-registration', data)}
                        onCancel={handleFormCancel}
                    />
                )
            case 'slot-reservation':
                return (
                    <SlotReservation
                        selectedSlot={selectedSlot}
                        onSubmit={(data) => handleFormSubmit('slot-reservation', data)}
                        onCancel={handleFormCancel}
                    />
                )
            // case 'admin-slot-creation':
            //     return (
            //         <AdminSlotCreation
            //             onSubmit={(data) => handleFormSubmit('admin-slot-creation', data)}
            //             onCancel={handleFormCancel}
            //         />
            //     )
            default:
                return null
        }
    }

    const renderMyBookings = () => (
        <section className="results-section">
            <div className="section-header">
                <h2>My Bookings</h2>
                <span className="results-count">{myBookings.length} active bookings</span>
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
                                    <span className="duration">Duration {booking.duration}</span>
                                </div>
                            </div>
                            <div className="booking-actions">
                                <button className="modify-btn" onClick={() => handleModifyBooking(booking.id)}>
                                    Modify
                                </button>
                                <button className="cancel-btn" onClick={() => handleCancelBooking(booking.id)}>
                                    Cancel
                                </button>
                            </div>
                        </div>

                        <div className="booking-details">
                            <div className="truck-info">
                                <div className="info-item">
                                    <span className="label">Truck Plate:</span>
                                    <span className="value">{booking.truckPlate}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Driver:</span>
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
                                    <span className="includes">/ includes fees</span>
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
                <h2>Scheduled Slots</h2>
                <span className="results-count">{scheduledSlots.length} scheduled slots</span>
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
                                    <span className="label">Truck Plate:</span>
                                    <span className="value">{slot.truckPlate}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Driver:</span>
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
                                    <span className="includes">/ includes fees</span>
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
                <h2>Booking History</h2>
                <span className="results-count">{bookingHistory.length} past bookings</span>
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
                                        <span className="completed-time">Completed at {booking.completedAt}</span>
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
                                    <span className="label">Truck Plate:</span>
                                    <span className="value">{booking.truckPlate}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Driver:</span>
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
                                    <span className="refund">Refunded: {formatPrice(booking.refundAmount, booking.currency)}</span>
                                )}
                            </div>
                        </div>

                        {booking.status === 'completed' && (
                            <div className="history-actions">
                                <button className="rebook-btn">Book Again</button>
                                <button className="receipt-btn">Download Receipt</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )

    const renderContent = () => {
        // If a form is active, render it instead of the main content
        if (currentForm) {
            return renderCurrentForm()
        }

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
                                <h3>Filters</h3>
                                <button className="reset-btn" onClick={resetFilters}>Reset</button>
                                <div className="results-count">
                                    <span className="available-badge">Available</span>
                                    <span className="recommended-badge">Recommended</span>
                                    <span className="count">{filteredSlots.length} slots left</span>
                                </div>
                            </div>

                            <div className="filter-section">
                                <h4>Time</h4>
                                <div className="time-inputs">
                                    <input
                                        type="time"
                                        value={filters.timeRange.start}
                                        onChange={(e) => handleFilterChange('timeRange', { ...filters.timeRange, start: e.target.value })}
                                    />
                                    <span>→</span>
                                    <input
                                        type="time"
                                        value={filters.timeRange.end}
                                        onChange={(e) => handleFilterChange('timeRange', { ...filters.timeRange, end: e.target.value })}
                                    />
                                </div>

                                <div className="time-selector">
                                    <label>Select preferred time</label>
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
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <div key={i} className="bar" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button className="apply-filters-btn">Apply Filters</button>
                        </aside>

                        <section className="results-section">
                            <div className="slots-list">
                                {filteredSlots.map((slot) => (
                                    <div key={slot.id} className="slot-card">
                                        <div className="slot-header">
                                            <div className="provider-info">
                                                <div className="provider-icon">🏢</div>
                                                <span className="provider-name">Port Authority</span>
                                            </div>
                                            <div className="duration-info">
                                                <span className="duration">Duration {slot.duration}</span>
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
                                                    <span className="includes">/ includes fees</span>
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
                                            <span className="slots-left">{slot.slotsLeft} slots left</span>
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
                                    <span className="popular-badge">Popular</span>
                                    <span className="slots-count">{filteredSlots.length} slots left</span>
                                </div>

                                <div className="popular-slot">
                                    <div className="provider-info">
                                        <div className="provider-icon">🏢</div>
                                        <span className="provider-name">Port Authority</span>
                                    </div>
                                    <div className="popular-duration">Duration 2h 15m</div>
                                </div>
                            </div>
                        </section>
                    </div>
                )
        }
    }

    const isAnyModalOpen = showUserSidebar || showSettingsSidebar || showNotificationsSidebar || currentForm !== null

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <div className="logo-icon">🚛</div>
                        <span className="logo-text">Truck Tracking</span>
                    </div>

                    <nav className="navigation">
                        <button
                            className={`nav-tab ${activeTab === 'browse-slots' ? 'active' : ''}`}
                            onClick={() => setActiveTab('browse-slots')}
                        >
                            Browse slots
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'my-booking' ? 'active' : ''}`}
                            onClick={() => setActiveTab('my-booking')}
                        >
                            My booking
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'scheduled' ? 'active' : ''}`}
                            onClick={() => setActiveTab('scheduled')}
                        >
                            Scheduled
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            History
                        </button>
                    </nav>

                    <div className="header-actions">
                        {/* <div className="admin-actions">
                            <button
                                className="admin-btn"
                                onClick={() => setCurrentForm('admin-slot-creation')}
                                title="Create New Slot"
                            >
                                ➕
                            </button>
                        </div> */}
                        <div className="registration-actions">
                            <button
                                className="register-btn"
                                onClick={() => setCurrentForm('driver-registration')}
                                title="Register Driver"
                            >
                                👤
                            </button>
                            <button
                                className="register-btn"
                                onClick={() => setCurrentForm('Company-registration')}
                                title="Register Company"
                            >
                                🏢
                            </button>
                            <button
                                className="register-btn"
                                onClick={() => setCurrentForm('truck-registration')}
                                title="Register Truck"
                            >
                                🚛
                            </button>
                        </div>
                        <button
                            className="settings-btn"
                            onClick={() => setShowSettingsSidebar(true)}
                            title="Settings"
                        >
                            <Settings size={20} />
                        </button>
                        <button
                            className="notifications-btn"
                            onClick={() => setShowNotificationsSidebar(true)}
                            title="Notifications"
                        >
                            <Bell size={20} />
                        </button>
                        <button
                            className="user-avatar"
                            onClick={() => setShowUserSidebar(true)}
                        >
                            {'👤'}
                        </button>
                    </div>
                </div>
            </header>

            {showUserSidebar && (
                <>
                    <div
                        className="sidebar-overlay"
                        onClick={() => setShowUserSidebar(false)}
                    ></div>
                    <div className="user-sidebar">
                        {/* <div className="sidebar-header">
                            <h3>User Profile</h3>
                            
                        </div> */}

                        <div className="user-info">
                            <button
                                className="close-btn"
                                onClick={() => setShowUserSidebar(false)}
                            >
                                ✕
                            </button>
                            <div className="user-avatar-large">
                                {'👤'}
                            </div>
                            <div className="user-details">
                                <h4>{user.name}</h4>
                                <p className="user-role">{user.role}</p>
                                <p className="user-company">{user.company}</p>
                            </div>
                        </div>

                        <div className="user-stats">
                            <div className="stat-item">
                                <span className="stat-number">{user.totalBookings}</span>
                                <span className="stat-label">Total Bookings</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{user.activeBookings}</span>
                                <span className="stat-label">Active Bookings</span>
                            </div>
                        </div>

                        <div className="user-contact">
                            <div className="contact-item">
                                <span className="contact-icon">📧</span>
                                <span className="contact-text">{user.email}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📱</span>
                                <span className="contact-text">{user.phone}</span>
                            </div>
                        </div>

                        <div className="sidebar-actions">
                            {user.isLoggedIn ? (
                                <button className="logout-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            ) : (
                                <button className="login-btn" onClick={handleLogin}>
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}

            {showSettingsSidebar && (
                <>
                    <div
                        className="sidebar-overlay"
                        onClick={() => setShowSettingsSidebar(false)}
                    ></div>
                    <SettingsSidebar onClose={() => setShowSettingsSidebar(false)} />
                </>
            )}

            {showNotificationsSidebar && (
                <>
                    <div
                        className="sidebar-overlay"
                        onClick={() => setShowNotificationsSidebar(false)}
                    ></div>
                    <NotificationsSidebar onClose={() => setShowNotificationsSidebar(false)} />
                </>
            )}

            <main className="main-content">
                {activeTab === 'browse-slots' && (
                    <div className={`search-section ${isAnyModalOpen ? 'hidden' : ''}`}>
                        {/* <form onSubmit={handleSearch} className="search-form">
                            <div className="search-row">
                                <div className="input-group">
                                    <label>From</label>
                                    <select
                                        value={searchForm.origin}
                                        onChange={(e) => setSearchForm(prev => ({ ...prev, origin: e.target.value }))}
                                        className="location-input"
                                    >
                                        <option value="Gate A1">Gate A1</option>
                                        <option value="Gate B2">Gate B2</option>
                                        <option value="Gate C1">Gate C1</option>
                                    </select>
                                </div>

                                <button type="button" className="swap-btn">⇄</button>

                                <div className="input-group">
                                    <label>To</label>
                                    <select
                                        value={searchForm.destination}
                                        onChange={(e) => setSearchForm(prev => ({ ...prev, destination: e.target.value }))}
                                        className="location-input"
                                    >
                                        <option value="Terminal 1">Terminal 1</option>
                                        <option value="Terminal 2">Terminal 2</option>
                                        <option value="Terminal 3">Terminal 3</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>Slot Date</label>
                                    <input
                                        type="date"
                                        value={searchForm.date}
                                        onChange={(e) => setSearchForm(prev => ({ ...prev, date: e.target.value }))}
                                        className="date-input"
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Truck Type</label>
                                    <select
                                        value={searchForm.truckType}
                                        onChange={(e) => setSearchForm(prev => ({ ...prev, truckType: e.target.value }))}
                                        className="select-input"
                                    >
                                        <option value="Standard">Standard</option>
                                        <option value="Heavy Duty">Heavy Duty</option>
                                        <option value="Container">Container</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>Cargo Type</label>
                                    <select
                                        value={searchForm.cargoType}
                                        onChange={(e) => setSearchForm(prev => ({ ...prev, cargoType: e.target.value }))}
                                        className="select-input"
                                    >
                                        <option value="Container">Container</option>
                                        <option value="Bulk">Bulk</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>

                                <button type="submit" className="book-btn">
                                    Search
                                </button>
                            </div>
                        </form> */}
                    </div>
                )}

                {renderContent()}
            </main>
        </div>
    )
}
export default Booking

// import { useEffect, useState } from 'react'
// import '/src/Bookingg.css'
// import { Settings, Bell } from 'lucide-react'
// import SettingsSidebar from '/src/components/SettingsSidebar'
// import NotificationsSidebar from '/src/components/NotificationsSidebar'

// function Booking({ onLogout }) {
//     const [activeTab, setActiveTab] = useState('browse-slots')
//     const [currentForm, setCurrentForm] = useState(null)
//     const [selectedSlot, setSelectedSlot] = useState(null)
//     const [slots, setSlots] = useState([])
//     const [user, setUser] = useState({
//         name: 'Jean Kouassi',
//         email: 'jean.kouassi@example.com',
//         phone: '+228 90 12 34 56',
//         company: 'Transport Logistics Togo',
//         role: 'Fleet Manager',
//         avatar: '👤',
//         isLoggedIn: true,
//         memberSince: '2023',
//         totalBookings: 47,
//         activeBookings: 3
//     })
//     const [loading, setLoading] = useState(true)
//     const [showUserSidebar, setShowUserSidebar] = useState(false)
//     const [showSettingsSidebar, setShowSettingsSidebar] = useState(false)
//     const [showNotificationsSidebar, setShowNotificationsSidebar] = useState(false)
//     const [error, setError] = useState(null)

//     const [searchForm, setSearchForm] = useState({
//         origin: 'Gate A1',
//         destination: 'Terminal 3',
//         date: new Date().toISOString().split('T')[0],
//         truckType: 'Standard',
//         cargoType: 'Container'
//     })

//     const [filters, setFilters] = useState({
//         timeRange: { start: '07:00', end: '18:00' },
//         selectedTime: '',
//     })

//     const [availableSlots] = useState([
//         {
//             id: 1,
//             timeSlot: '08:00',
//             duration: '2h 30m',
//             gate: 'Gate A1',
//             terminal: 'Terminal 3',
//             price: 45000,
//             currency: 'CFA',
//             stops: [
//                 { time: '08:00', location: 'Gate A1', transfer: '15min transfer time' },
//                 { time: '08:15', location: 'Weighbridge', transfer: '20min process' },
//                 { time: '08:45', location: 'Terminal 3', transfer: 'Final destination' }
//             ],
//             amenities: ['weighBridge', 'parking', 'security'],
//             available: true,
//             slotsLeft: 12
//         },
//         {
//             id: 2,
//             timeSlot: '10:00',
//             duration: '3h 15m',
//             gate: 'Gate B2',
//             terminal: 'Terminal 3',
//             price: 52000,
//             currency: 'CFA',
//             stops: [
//                 { time: '10:30', location: 'Gate B2', transfer: '20min transfer time' },
//                 { time: '11:00', location: 'Customs', transfer: '45min inspection' },
//                 { time: '12:15', location: 'Weighbridge', transfer: '15min process' },
//                 { time: '12:45', location: 'Terminal 3', transfer: 'Final destination' }
//             ],
//             amenities: ['weighBridge', 'inspection', 'customs', 'parking'],
//             available: true,
//             slotsLeft: 8
//         },
//         {
//             id: 3,
//             timeSlot: '14:00',
//             duration: '2h 45m',
//             gate: 'Gate C1',
//             terminal: 'Terminal 3',
//             price: 48000,
//             currency: 'CFA',
//             stops: [
//                 { time: '14:20', location: 'Gate C1', transfer: '10min transfer time' },
//                 { time: '14:45', location: 'Weighbridge', transfer: '25min process' },
//                 { time: '15:30', location: 'Terminal 3', transfer: 'Final destination' }
//             ],
//             amenities: ['weighBridge', 'parking', 'security', 'inspection'],
//             available: true,
//             slotsLeft: 15
//         }
//     ])

//     const [myBookings] = useState([
//         {
//             id: 'BK001',
//             bookingRef: 'TG-2025-001',
//             status: 'confirmed',
//             date: '2025-01-15',
//             timeSlot: '08:00',
//             duration: '2h 30m',
//             gate: 'Gate A1',
//             terminal: 'Terminal 3',
//             truckPlate: 'TG-1234-AB',
//             driverName: 'Kofi Mensah',
//             price: 45000,
//             currency: 'CFA',
//             stops: [
//                 { time: '08:00', location: 'Gate A1', transfer: '15min transfer time' },
//                 { time: '08:15', location: 'Weighbridge', transfer: '20min process' },
//                 { time: '08:45', location: 'Terminal 3', transfer: 'Final destination' }
//             ],
//             amenities: ['weighBridge', 'parking', 'security'],
//             bookedAt: '2025-01-10T14:30:00Z'
//         },
//         {
//             id: 'BK002',
//             bookingRef: 'TG-2025-002',
//             status: 'pending',
//             date: '2025-01-16',
//             timeSlot: '10:30',
//             duration: '3h 15m',
//             gate: 'Gate B2',
//             terminal: 'Terminal 2',
//             truckPlate: 'TG-5678-CD',
//             driverName: 'Ama Asante',
//             price: 52000,
//             currency: 'CFA',
//             stops: [
//                 { time: '10:30', location: 'Gate B2', transfer: '20min transfer time' },
//                 { time: '11:00', location: 'Customs', transfer: '45min inspection' },
//                 { time: '12:15', location: 'Weighbridge', transfer: '15min process' },
//                 { time: '12:45', location: 'Terminal 2', transfer: 'Final destination' }
//             ],
//             amenities: ['weighBridge', 'inspection', 'customs', 'parking'],
//             bookedAt: '2025-01-12T09:15:00Z'
//         }
//     ])

//     const [scheduledSlots] = useState([
//         {
//             id: 'SC001',
//             bookingRef: 'TG-2025-003',
//             status: 'scheduled',
//             date: '2025-01-17',
//             timeSlot: '09:15',
//             duration: '2h 45m',
//             gate: 'Gate A2',
//             terminal: 'Terminal 1',
//             truckPlate: 'TG-9012-EF',
//             driverName: 'Kwame Nkrumah',
//             price: 48000,
//             currency: 'CFA',
//             stops: [
//                 { time: '09:15', location: 'Gate A2', transfer: '10min transfer time' },
//                 { time: '09:30', location: 'Weighbridge', transfer: '25min process' },
//                 { time: '10:15', location: 'Terminal 1', transfer: 'Final destination' }
//             ],
//             amenities: ['weighBridge', 'parking', 'security'],
//             estimatedArrival: '10:15',
//             currentStatus: 'In Transit - Gate A2'
//         },
//         {
//             id: 'SC002',
//             bookingRef: 'TG-2025-004',
//             status: 'in-progress',
//             date: '2025-01-15',
//             timeSlot: '14:00',
//             duration: '3h 00m',
//             gate: 'Gate C1',
//             terminal: 'Terminal 3',
//             truckPlate: 'TG-3456-GH',
//             driverName: 'Akosua Osei',
//             price: 55000,
//             currency: 'CFA',
//             stops: [
//                 { time: '14:00', location: 'Gate C1', transfer: '15min transfer time', completed: true },
//                 { time: '14:20', location: 'Customs', transfer: '40min inspection', completed: true },
//                 { time: '15:15', location: 'Weighbridge', transfer: '20min process', completed: false },
//                 { time: '15:45', location: 'Terminal 3', transfer: 'Final destination', completed: false }
//             ],
//             amenities: ['weighBridge', 'inspection', 'customs', 'parking'],
//             estimatedArrival: '15:45',
//             currentStatus: 'At Customs - Processing'
//         }
//     ])

//     const [bookingHistory] = useState([
//         {
//             id: 'HT001',
//             bookingRef: 'TG-2024-156',
//             status: 'completed',
//             date: '2024-12-20',
//             timeSlot: '11:30',
//             duration: '2h 15m',
//             gate: 'Gate A1',
//             terminal: 'Terminal 2',
//             truckPlate: 'TG-1234-AB',
//             driverName: 'Kofi Mensah',
//             price: 42000,
//             currency: 'CFA',
//             completedAt: '13:45',
//             rating: 5
//         },
//         {
//             id: 'HT002',
//             bookingRef: 'TG-2024-145',
//             status: 'completed',
//             date: '2024-12-15',
//             timeSlot: '08:00',
//             duration: '3h 30m',
//             gate: 'Gate B2',
//             terminal: 'Terminal 1',
//             truckPlate: 'TG-5678-CD',
//             driverName: 'Ama Asante',
//             price: 58000,
//             currency: 'CFA',
//             completedAt: '11:30',
//             rating: 4
//         },
//         {
//             id: 'HT003',
//             bookingRef: 'TG-2024-132',
//             status: 'cancelled',
//             date: '2024-12-10',
//             timeSlot: '15:20',
//             duration: '2h 45m',
//             gate: 'Gate C1',
//             terminal: 'Terminal 3',
//             truckPlate: 'TG-9012-EF',
//             driverName: 'Kwame Nkrumah',
//             price: 48000,
//             currency: 'CFA',
//             cancelledAt: '2024-12-09T16:30:00Z',
//             refundAmount: 48000
//         }
//     ])

//     const handleSearch = (e) => {
//         e.preventDefault()
//         console.log('Searching with:', searchForm)

//         const filtered = availableSlots.filter(slot => {
//             const matchesOrigin = slot.gate === searchForm.origin
//             const matchesDestination = slot.terminal === searchForm.destination
//             return matchesOrigin && matchesDestination
//         })

//         setSlots(filtered)
//     }

//     const handleFilterChange = (filterType, value) => {
//         setFilters(prev => ({
//             ...prev,
//             [filterType]: value
//         }))
//     }

//     const resetFilters = () => {
//         setFilters({
//             timeRange: { start: '07:00', end: '18:00' },
//             selectedTime: ''
//         })
//     }

//     const filteredSlots = availableSlots.filter(slot => {
//         const slotTime = slot.timeSlot
//         const startTime = filters.timeRange.start
//         const endTime = filters.timeRange.end

//         if (startTime && endTime) {
//             if (slotTime < startTime || slotTime > endTime) {
//                 return false
//             }
//         }

//         if (filters.selectedTime && slot.timeSlot !== filters.selectedTime) {
//             return false
//         }

//         return true
//     })

//     const handleBookSlot = (slotId) => {
//         const slot = availableSlots.find(s => s.id === slotId)
//         setSelectedSlot(slot)
//         setCurrentForm('slot-reservation')
//         console.log('Booking slot:', slotId)
//     }

//     const handleCancelBooking = (bookingId) => {
//         console.log('Cancelling booking:', bookingId)
//     }

//     const handleModifyBooking = (bookingId) => {
//         console.log('Modifying booking:', bookingId)
//     }

//     const formatPrice = (price, currency) => {
//         return `${currency} ${price.toLocaleString()}`
//     }

//     const formatDate = (dateString) => {
//         const date = new Date(dateString)
//         return date.toLocaleDateString('en-GB', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric'
//         })
//     }

//     const getStatusBadge = (status) => {
//         const statusConfig = {
//             confirmed: { class: 'status-confirmed', text: 'Confirmed' },
//             pending: { class: 'status-pending', text: 'Pending' },
//             scheduled: { class: 'status-scheduled', text: 'Scheduled' },
//             'in-progress': { class: 'status-in-progress', text: 'In Progress' },
//             completed: { class: 'status-completed', text: 'Completed' },
//             cancelled: { class: 'status-cancelled', text: 'Cancelled' }
//         }
//         return statusConfig[status] || { class: 'status-default', text: status }
//     }

//     const getAmenityIcon = (amenity) => {
//         const icons = {
//             weighBridge: '⚖️',
//             inspection: '🔍',
//             customs: '📋',
//             parking: '🅿️',
//             security: '🛡️'
//         }
//         return icons[amenity] || '✓'
//     }

//     const handleLogout = () => {
//         if (onLogout) {
//             onLogout()
//         }
//         setShowUserSidebar(false)
//     }

//     const handleLogin = () => {
//         console.log('Opening login...')
//         setShowUserSidebar(false)
//     }

//     const handleFormSubmit = (formType, data) => {
//         console.log(`${formType} submitted:`, data)
//         setCurrentForm(null)
//         setSelectedSlot(null)
//     }

//     const handleFormCancel = () => {
//         setCurrentForm(null)
//         setSelectedSlot(null)
//     }

//     const renderCurrentForm = () => {
//         return (
//             <div className="form-container">
//                 <h2>Form: {currentForm}</h2>
//                 <p>Form components will be implemented here</p>
//                 <button onClick={handleFormCancel}>Cancel</button>
//             </div>
//         )
//     }

//     const renderMyBookings = () => (
//         <section className="results-section">
//             <div className="section-header">
//                 <h2>My Bookings</h2>
//                 <span className="results-count">{myBookings.length} active bookings</span>
//             </div>

//             <div className="slots-list">
//                 {myBookings.map((booking) => (
//                     <div key={booking.id} className="slot-card booking-card">
//                         <div className="slot-header">
//                             <div className="booking-info">
//                                 <div className="booking-ref">
//                                     <span className="ref-number">#{booking.bookingRef}</span>
//                                     <span className={`status-badge ${getStatusBadge(booking.status).class}`}>
//                                         {getStatusBadge(booking.status).text}
//                                     </span>
//                                 </div>
//                                 <div className="booking-date">
//                                     <span className="date">{formatDate(booking.date)}</span>
//                                     <span className="duration">Duration {booking.duration}</span>
//                                 </div>
//                             </div>
//                             <div className="booking-actions">
//                                 <button className="modify-btn" onClick={() => handleModifyBooking(booking.id)}>
//                                     Modify
//                                 </button>
//                                 <button className="cancel-btn" onClick={() => handleCancelBooking(booking.id)}>
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="booking-details">
//                             <div className="truck-info">
//                                 <div className="info-item">
//                                     <span className="label">Truck Plate:</span>
//                                     <span className="value">{booking.truckPlate}</span>
//                                 </div>
//                                 <div className="info-item">
//                                     <span className="label">Driver:</span>
//                                     <span className="value">{booking.driverName}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="slot-details">
//                             <div className="time-info">
//                                 <div className="departure-time">
//                                     <span className="time">{booking.timeSlot}</span>
//                                     <span className="location">{booking.gate}</span>
//                                 </div>

//                                 <div className="route-visualization">
//                                     {booking.stops.map((stop, index) => (
//                                         <div key={index} className="route-stop">
//                                             <div className="stop-time">{stop.time}</div>
//                                             <div className="stop-dot"></div>
//                                             <div className="stop-info">
//                                                 <div className="stop-location">{stop.location}</div>
//                                                 <div className="transfer-time">{stop.transfer}</div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="arrival-info">
//                                     <span className="location">{booking.terminal}</span>
//                                 </div>
//                             </div>

//                             <div className="slot-pricing">
//                                 <div className="price">
//                                     <span className="amount">{formatPrice(booking.price, booking.currency)}</span>
//                                     <span className="includes">/ includes fees</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="slot-amenities">
//                             {booking.amenities.map((amenity) => (
//                                 <span key={amenity} className="amenity" title={amenity}>
//                                     {getAmenityIcon(amenity)}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )

//     const renderScheduled = () => (
//         <section className="results-section">
//             <div className="section-header">
//                 <h2>Scheduled Slots</h2>
//                 <span className="results-count">{scheduledSlots.length} scheduled slots</span>
//             </div>

//             <div className="slots-list">
//                 {scheduledSlots.map((slot) => (
//                     <div key={slot.id} className="slot-card scheduled-card">
//                         <div className="slot-header">
//                             <div className="booking-info">
//                                 <div className="booking-ref">
//                                     <span className="ref-number">#{slot.bookingRef}</span>
//                                     <span className={`status-badge ${getStatusBadge(slot.status).class}`}>
//                                         {getStatusBadge(slot.status).text}
//                                     </span>
//                                 </div>
//                                 <div className="current-status">
//                                     <span className="status-text">{slot.currentStatus}</span>
//                                     <span className="eta">ETA: {slot.estimatedArrival}</span>
//                                 </div>
//                             </div>
//                             <div className="live-indicator">
//                                 <div className="pulse-dot"></div>
//                                 <span>Live</span>
//                             </div>
//                         </div>

//                         <div className="booking-details">
//                             <div className="truck-info">
//                                 <div className="info-item">
//                                     <span className="label">Truck Plate:</span>
//                                     <span className="value">{slot.truckPlate}</span>
//                                 </div>
//                                 <div className="info-item">
//                                     <span className="label">Driver:</span>
//                                     <span className="value">{slot.driverName}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="slot-details">
//                             <div className="time-info">
//                                 <div className="departure-time">
//                                     <span className="time">{slot.timeSlot}</span>
//                                     <span className="location">{slot.gate}</span>
//                                 </div>

//                                 <div className="route-visualization">
//                                     {slot.stops.map((stop, index) => (
//                                         <div key={index} className={`route-stop ${stop.completed ? 'completed' : ''}`}>
//                                             <div className="stop-time">{stop.time}</div>
//                                             <div className={`stop-dot ${stop.completed ? 'completed' : ''}`}></div>
//                                             <div className="stop-info">
//                                                 <div className="stop-location">{stop.location}</div>
//                                                 <div className="transfer-time">{stop.transfer}</div>
//                                                 {stop.completed && <div className="completed-check">✓</div>}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="arrival-info">
//                                     <span className="location">{slot.terminal}</span>
//                                 </div>
//                             </div>

//                             <div className="slot-pricing">
//                                 <div className="price">
//                                     <span className="amount">{formatPrice(slot.price, slot.currency)}</span>
//                                     <span className="includes">/ includes fees</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="slot-amenities">
//                             {slot.amenities.map((amenity) => (
//                                 <span key={amenity} className="amenity" title={amenity}>
//                                     {getAmenityIcon(amenity)}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )

//     const renderHistory = () => (
//         <section className="results-section">
//             <div className="section-header">
//                 <h2>Booking History</h2>
//                 <span className="results-count">{bookingHistory.length} past bookings</span>
//             </div>

//             <div className="slots-list">
//                 {bookingHistory.map((booking) => (
//                     <div key={booking.id} className="slot-card history-card">
//                         <div className="slot-header">
//                             <div className="booking-info">
//                                 <div className="booking-ref">
//                                     <span className="ref-number">#{booking.bookingRef}</span>
//                                     <span className={`status-badge ${getStatusBadge(booking.status).class}`}>
//                                         {getStatusBadge(booking.status).text}
//                                     </span>
//                                 </div>
//                                 <div className="booking-date">
//                                     <span className="date">{formatDate(booking.date)}</span>
//                                     {booking.completedAt && (
//                                         <span className="completed-time">Completed at {booking.completedAt}</span>
//                                     )}
//                                 </div>
//                             </div>
//                             {booking.rating && (
//                                 <div className="rating">
//                                     {'★'.repeat(booking.rating)}{'☆'.repeat(5 - booking.rating)}
//                                 </div>
//                             )}
//                         </div>

//                         <div className="booking-details">
//                             <div className="truck-info">
//                                 <div className="info-item">
//                                     <span className="label">Truck Plate:</span>
//                                     <span className="value">{booking.truckPlate}</span>
//                                 </div>
//                                 <div className="info-item">
//                                     <span className="label">Driver:</span>
//                                     <span className="value">{booking.driverName}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="history-summary">
//                             <div className="route-summary">
//                                 <span className="route">{booking.gate} → {booking.terminal}</span>
//                                 <span className="duration">{booking.duration}</span>
//                             </div>
//                             <div className="price-summary">
//                                 <span className="amount">{formatPrice(booking.price, booking.currency)}</span>
//                                 {booking.refundAmount && (
//                                     <span className="refund">Refunded: {formatPrice(booking.refundAmount, booking.currency)}</span>
//                                 )}
//                             </div>
//                         </div>

//                         {booking.status === 'completed' && (
//                             <div className="history-actions">
//                                 <button className="rebook-btn">Book Again</button>
//                                 <button className="receipt-btn">Download Receipt</button>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )

//     const renderBrowseSlots = () => (
//         <div className="content-area">
//             <aside className="filters-sidebar">
//                 <div className="filters-header">
//                     <h3>Filters</h3>
//                     <button className="reset-btn" onClick={resetFilters}>Reset</button>
//                     <div className="results-count">
//                         <span className="available-badge">Available</span>
//                         <span className="recommended-badge">Recommended</span>
//                         <span className="count">{filteredSlots.length} slots left</span>
//                     </div>
//                 </div>

//                 <div className="filter-section">
//                     <h4>Time</h4>
//                     <div className="time-inputs">
//                         <input
//                             type="time"
//                             value={filters.timeRange.start}
//                             onChange={(e) => handleFilterChange('timeRange', { ...filters.timeRange, start: e.target.value })}
//                         />
//                         <span>→</span>
//                         <input
//                             type="time"
//                             value={filters.timeRange.end}
//                             onChange={(e) => handleFilterChange('timeRange', { ...filters.timeRange, end: e.target.value })}
//                         />
//                     </div>

//                     <div className="time-selector">
//                         <label>Select preferred time</label>
//                         <div className="time-grid">
//                             {['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
//                                 <button
//                                     key={time}
//                                     className={`time-slot ${filters.selectedTime === time ? 'selected' : ''}`}
//                                     onClick={() => handleFilterChange('selectedTime', time)}
//                                 >
//                                     {time}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="time-chart">
//                         <div className="chart-bars">
//                             {Array.from({ length: 12 }, (_, i) => (
//                                 <div key={i} className="bar" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <button className="apply-filters-btn">Apply Filters</button>
//             </aside>

//             <section className="results-section">
//                 <div className="slots-list">
//                     {filteredSlots.map((slot) => (
//                         <div key={slot.id} className="slot-card">
//                             <div className="slot-header">
//                                 <div className="provider-info">
//                                     <div className="provider-icon">🏢</div>
//                                     <span className="provider-name">Port Authority</span>
//                                 </div>
//                                 <div className="duration-info">
//                                     <span className="duration">Duration {slot.duration}</span>
//                                 </div>
//                             </div>

//                             <div className="slot-details">
//                                 <div className="time-info">
//                                     <div className="departure-time">
//                                         <span className="time">{slot.timeSlot}</span>
//                                         <span className="location">{slot.gate}</span>
//                                     </div>

//                                     <div className="route-visualization">
//                                         {slot.stops.map((stop, index) => (
//                                             <div key={index} className="route-stop">
//                                                 <div className="stop-time">{stop.time}</div>
//                                                 <div className="stop-dot"></div>
//                                                 <div className="stop-info">
//                                                     <div className="stop-location">{stop.location}</div>
//                                                     <div className="transfer-time">{stop.transfer}</div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     <div className="arrival-info">
//                                         <span className="location">{slot.terminal}</span>
//                                     </div>
//                                 </div>

//                                 <div className="slot-pricing">
//                                     <div className="price">
//                                         <span className="amount">{formatPrice(slot.price, slot.currency)}</span>
//                                         <span className="includes">/ includes fees</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="slot-amenities">
//                                 {slot.amenities.map((amenity) => (
//                                     <span key={amenity} className="amenity" title={amenity}>
//                                         {getAmenityIcon(amenity)}
//                                     </span>
//                                 ))}
//                             </div>

//                             <div className="slot-actions">
//                                 <span className="slots-left">{slot.slotsLeft} slots left</span>
//                                 <button
//                                     className="book-btn"
//                                     onClick={() => handleBookSlot(slot.id)}
//                                 >
//                                     Reserve
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="popular-section">
//                     <div className="popular-header">
//                         <span className="popular-badge">Popular</span>
//                         <span className="slots-count">{filteredSlots.length} slots left</span>
//                     </div>

//                     <div className="popular-slot">
//                         <div className="provider-info">
//                             <div className="provider-icon">🏢</div>
//                             <span className="provider-name">Port Authority</span>
//                         </div>
//                         <div className="popular-duration">Duration 2h 15m</div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )

//     const renderContent = () => {
//         if (currentForm) {
//             return renderCurrentForm()
//         }

//         switch (activeTab) {
//             case 'my-booking':
//                 return renderMyBookings()
//             case 'scheduled':
//                 return renderScheduled()
//             case 'history':
//                 return renderHistory()
//             default:
//                 return renderBrowseSlots()
//         }
//     }

//     const isAnyModalOpen = showUserSidebar || showSettingsSidebar || showNotificationsSidebar || currentForm !== null

//     return (
//         <div className="app">
//             <header className="header">
//                 <div className="header-content">
//                     <div className="logo">
//                         <div className="logo-icon">🚛</div>
//                         <span className="logo-text">Truck Tracking</span>
//                     </div>

//                     <nav className="navigation">
//                         <button
//                             className={`nav-tab ${activeTab === 'browse-slots' ? 'active' : ''}`}
//                             onClick={() => setActiveTab('browse-slots')}
//                         >
//                             Browse slots
//                         </button>
//                         <button
//                             className={`nav-tab ${activeTab === 'my-booking' ? 'active' : ''}`}
//                             onClick={() => setActiveTab('my-booking')}
//                         >
//                             My booking
//                         </button>
//                         <button
//                             className={`nav-tab ${activeTab === 'scheduled' ? 'active' : ''}`}
//                             onClick={() => setActiveTab('scheduled')}
//                         >
//                             Scheduled
//                         </button>
//                         <button
//                             className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
//                             onClick={() => setActiveTab('history')}
//                         >
//                             History
//                         </button>
//                     </nav>

//                     <div className="header-actions">
//                         <div className="registration-actions">
//                             <button
//                                 className="register-btn"
//                                 onClick={() => setCurrentForm('driver-registration')}
//                                 title="Register Driver"
//                             >
//                                 👤
//                             </button>
//                             <button
//                                 className="register-btn"
//                                 onClick={() => setCurrentForm('Company-registration')}
//                                 title="Register Company"
//                             >
//                                 🏢
//                             </button>
//                             <button
//                                 className="register-btn"
//                                 onClick={() => setCurrentForm('truck-registration')}
//                                 title="Register Truck"
//                             >
//                                 🚛
//                             </button>
//                         </div>
//                         <button
//                             className="settings-btn"
//                             onClick={() => setShowSettingsSidebar(true)}
//                             title="Settings"
//                         >
//                             <Settings size={20} />
//                         </button>
//                         <button
//                             className="notifications-btn"
//                             onClick={() => setShowNotificationsSidebar(true)}
//                             title="Notifications"
//                         >
//                             <Bell size={20} />
//                         </button>
//                         <button
//                             className="user-avatar"
//                             onClick={() => setShowUserSidebar(true)}
//                         >
//                             {user.avatar}
//                         </button>
//                     </div>
//                 </div>
//             </header>

//             {showUserSidebar && (
//                 <>
//                     <div
//                         className="sidebar-overlay"
//                         onClick={() => setShowUserSidebar(false)}
//                     ></div>
//                     <div className="user-sidebar">
//                         <div className="sidebar-header">
//                             <h3>User Profile</h3>
//                             <button
//                                 className="close-btn"
//                                 onClick={() => setShowUserSidebar(false)}
//                             >
//                                 ✕
//                             </button>
//                         </div>

//                         <div className="user-info">
//                             <div className="user-avatar-large">
//                                 {user.avatar}
//                             </div>
//                             <div className="user-details">
//                                 <h4>{user.name}</h4>
//                                 <p className="user-role">{user.role}</p>
//                                 <p className="user-company">{user.company}</p>
//                             </div>
//                         </div>

//                         <div className="user-stats">
//                             <div className="stat-item">
//                                 <span className="stat-number">{user.totalBookings}</span>
//                                 <span className="stat-label">Total Bookings</span>
//                             </div>
//                             <div className="stat-item">
//                                 <span className="stat-number">{user.activeBookings}</span>
//                                 <span className="stat-label">Active Bookings</span>
//                             </div>
//                             <div className="stat-item">
//                                 <span className="stat-number">{user.memberSince}</span>
//                                 <span className="stat-label">Member Since</span>
//                             </div>
//                         </div>

//                         <div className="user-contact">
//                             <div className="contact-item">
//                                 <span className="contact-icon">📧</span>
//                                 <span className="contact-text">{user.email}</span>
//                             </div>
//                             <div className="contact-item">
//                                 <span className="contact-icon">📱</span>
//                                 <span className="contact-text">{user.phone}</span>
//                             </div>
//                         </div>

//                         <div className="sidebar-actions">
//                             <button className="profile-btn">Edit Profile</button>
//                             <button className="settings-btn-sidebar">Settings</button>
//                             {user.isLoggedIn ? (
//                                 <button className="logout-btn" onClick={handleLogout}>
//                                     Logout
//                                 </button>
//                             ) : (
//                                 <button className="login-btn" onClick={handleLogin}>
//                                     Login
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </>
//             )}

//             {showSettingsSidebar && (
//                 <>
//                     <div
//                         className="sidebar-overlay"
//                         onClick={() => setShowSettingsSidebar(false)}
//                     ></div>
//                     <SettingsSidebar onClose={() => setShowSettingsSidebar(false)} />
//                 </>
//             )}

//             {showNotificationsSidebar && (
//                 <>
//                     <div
//                         className="sidebar-overlay"
//                         onClick={() => setShowNotificationsSidebar(false)}
//                     ></div>
//                     <NotificationsSidebar onClose={() => setShowNotificationsSidebar(false)} />
//                 </>
//             )}

//             <main className="main-content">
//                 {activeTab === 'browse-slots' && (
//                     <div className={`search-section ${isAnyModalOpen ? 'hidden' : ''}`}>
//                         <form onSubmit={handleSearch} className="search-form">
//                             <div className="search-row">
//                                 <div className="input-group">
//                                     <label>From</label>
//                                     <select
//                                         value={searchForm.origin}
//                                         onChange={(e) => setSearchForm(prev => ({ ...prev, origin: e.target.value }))}
//                                         className="location-input"
//                                     >
//                                         <option value="Gate A1">Gate A1</option>
//                                         <option value="Gate B2">Gate B2</option>
//                                         <option value="Gate C1">Gate C1</option>
//                                     </select>
//                                 </div>

//                                 <button type="button" className="swap-btn">⇄</button>

//                                 <div className="input-group">
//                                     <label>To</label>
//                                     <select
//                                         value={searchForm.destination}
//                                         onChange={(e) => setSearchForm(prev => ({ ...prev, destination: e.target.value }))}
//                                         className="location-input"
//                                     >
//                                         <option value="Terminal 1">Terminal 1</option>
//                                         <option value="Terminal 2">Terminal 2</option>
//                                         <option value="Terminal 3">Terminal 3</option>
//                                     </select>
//                                 </div>

//                                 <div className="input-group">
//                                     <label>Slot Date</label>
//                                     <input
//                                         type="date"
//                                         value={searchForm.date}
//                                         onChange={(e) => setSearchForm(prev => ({ ...prev, date: e.target.value }))}
//                                         className="date-input"
//                                     />
//                                 </div>

//                                 <div className="input-group">
//                                     <label>Truck Type</label>
//                                     <select
//                                         value={searchForm.truckType}
//                                         onChange={(e) => setSearchForm(prev => ({ ...prev, truckType: e.target.value }))}
//                                         className="select-input"
//                                     >
//                                         <option value="Standard">Standard</option>
//                                         <option value="Heavy Duty">Heavy Duty</option>
//                                         <option value="Container">Container</option>
//                                     </select>
//                                 </div>

//                                 <div className="input-group">
//                                     <label>Cargo Type</label>
//                                     <select
//                                         value={searchForm.cargoType}
//                                         onChange={(e) => setSearchForm(prev => ({ ...prev, cargoType: e.target.value }))}
//                                         className="select-input"
//                                     >
//                                         <option value="Container">Container</option>
//                                         <option value="Bulk">Bulk</option>
//                                         <option value="General">General</option>
//                                     </select>
//                                 </div>

//                                 <button type="submit" className="book-btn">
//                                     Search
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}

//                 {renderContent()}
//             </main>
//         </div>
//     )
// }

// export default Booking
