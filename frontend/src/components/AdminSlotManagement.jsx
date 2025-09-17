import { useState } from 'react'
import AdminSlotCreation from './AdminSlotCreation'
import { useEffect } from "react";
import { getSlots, createSlot, updateSlot, deleteSlot } from "../api/slotService";
import { toast } from "react-hot-toast";


const AdminSlotManagement = ({ onSlotCreated, onSlotUpdated, onSlotDeleted }) => {
    const [currentView, setCurrentView] = useState('dashboard')
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterDate, setFilterDate] = useState('')


    // Sample slots data - in real app, this would come from API
    const [slots, setSlots] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
    // const handleCreateSlot = (slotData) => {
    //     const newSlot = {
    //         ...slotData,
    //         id: `SLOT-${Date.now()}`,
    //         createdAt: new Date().toISOString(),
    //         availableSlots: slotData.totalSlots - (slotData.reservedSlots || 0)
    //     }

    //     setSlots(prev => [...prev, newSlot])
    //     setCurrentView('dashboard')

    //     if (onSlotCreated) {
    //         onSlotCreated(newSlot)
    //     }
    // }
    const handleCreateSlot = async (slotData) => {
        const newSlot = await createSlot(slotData);
        setSlots(prev => [...prev, newSlot]);
        setCurrentView("dashboard");

        if (onSlotCreated) onSlotCreated(newSlot);
        toast.success("Slot created successfully");
    };


    const handleEditSlot = (slot) => {
        setSelectedSlot(slot)
        setCurrentView('edit')
    }

    // const handleUpdateSlot = (updatedSlot) => {
    //     setSlots(prev => prev.map(slot =>
    //         slot.id === updatedSlot.id ? updatedSlot : slot
    //     ))
    //     setCurrentView('dashboard')
    //     setSelectedSlot(null)

    //     if (onSlotUpdated) {
    //         onSlotUpdated(updatedSlot)
    //     }
    // }

    const handleUpdateSlot = async (updatedSlot) => {
        const savedSlot = await updateSlot(updatedSlot.id, updatedSlot);
        setSlots(prev => prev.map(slot => slot.id === savedSlot.id ? savedSlot : slot));
        setCurrentView("dashboard");
        setSelectedSlot(null);

        if (onSlotUpdated) onSlotUpdated(savedSlot);
        toast.success("Slot updated successfully");
    };


    // const handleDeleteSlot = (slotId) => {
    //     if (window.confirm('Are you sure you want to delete this slot? This action cannot be undone.')) {
    //         setSlots(prev => prev.filter(slot => slot.id !== slotId))

    //         if (onSlotDeleted) {
    //             onSlotDeleted(slotId)
    //         }
    //     }
    // }

    const handleDeleteSlot = async (slotId) => {
        if (window.confirm("Are you sure you want to delete this slot?")) {
            await deleteSlot(slotId);
            setSlots(prev => prev.filter(slot => slot.id !== slotId));

            if (onSlotDeleted) onSlotDeleted(slotId);
            toast.success("Slot deleted successfully");
        }
    };

    const handleToggleStatus = (slotId) => {
        setSlots(prev => prev.map(slot =>
            slot.id === slotId
                ? { ...slot, status: slot.status === 'active' ? 'inactive' : 'active' }
                : slot
        ))
    }

    const filteredSlots = slots.filter(slot => {
        const matchesSearch = slot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slot.originGate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slot.destinationTerminal.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slot.operatorName.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = filterStatus === 'all' || slot.status === filterStatus
        const matchesDate = !filterDate || slot.slotDate === filterDate

        return matchesSearch && matchesStatus && matchesDate
    })

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { class: 'status-active', text: 'Active' },
            inactive: { class: 'status-inactive', text: 'Inactive' },
            maintenance: { class: 'status-maintenance', text: 'Maintenance' },
            suspended: { class: 'status-suspended', text: 'Suspended' }
        }
        return statusConfig[status] || { class: 'status-default', text: status }
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

    const renderDashboard = () => (
        <div style={styles.dashboard}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <h1 style={styles.title}>Slot Management</h1>
                    <p style={styles.subtitle}>Manage time slots for truck traffic</p>
                </div>
                <button
                    style={styles.createButton}
                    onClick={() => setCurrentView('create')}
                >
                    ➕ Create New Slot
                </button>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>📊</div>
                    <div style={styles.statContent}>
                        <h3 style={styles.statNumber}>{slots.length}</h3>
                        <p style={styles.statLabel}>Total Slots</p>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>✅</div>
                    <div style={styles.statContent}>
                        <h3 style={styles.statNumber}>{slots.filter(s => s.status === 'active').length}</h3>
                        <p style={styles.statLabel}>Active Slots</p>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>🚛</div>
                    <div style={styles.statContent}>
                        <h3 style={styles.statNumber}>{slots.reduce((sum, s) => sum + s.reservedSlots, 0)}</h3>
                        <p style={styles.statLabel}>Reserved</p>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>💰</div>
                    <div style={styles.statContent}>
                        <h3 style={styles.statNumber}> {(slots.reduce((sum, s) => sum + (s.basePrice * s.reservedSlots), 0)).toLocaleString()}</h3>
                        <p style={styles.statLabel}>{slots.reservedSlots}Earning</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={styles.filtersSection}>
                <div style={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Search slots by ID, gate, terminal, or operator..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>
                <div style={styles.filterControls}>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={styles.filterSelect}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="suspended">Suspended</option>
                    </select>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        style={styles.filterDate}
                    />
                </div>
            </div>

            {/* Slots Table */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.th}>Slot ID</th>
                            <th style={styles.th}>Date & Time</th>
                            <th style={styles.th}>Route</th>
                            <th style={styles.th}>Capacity</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Operator</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSlots.map((slot) => (
                            <tr key={slot.id} style={styles.tableRow}>
                                <td style={styles.td}>
                                    <div style={styles.slotId}>{slot.slotId}</div>
                                    <div style={styles.slotDuration}>{slot.duration}</div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.slotDate}>{formatDate(slot.slotDate)}</div>
                                    <div style={styles.slotTime}>{slot.startTime} - {slot.endTime}</div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.route}>
                                        <span style={styles.routeFrom}>{slot.originGate}</span>
                                        <span style={styles.routeArrow}>→</span>
                                        <span style={styles.routeTo}>{slot.destinationTerminal}</span>
                                    </div>
                                    {/* <div style={styles.routeStops}>{slot.routeStops.length} stops</div> */}
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.capacity}>
                                        <span style={styles.available}>{slot.availableSlots}</span>
                                        <span style={styles.capacityDivider}>/</span>
                                        <span style={styles.total}>{slot.totalSlots}</span>
                                    </div>
                                    <div style={styles.reserved}>{slot.reservedSlots} reserved</div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.price}>{formatPrice(slot.basePrice, slot.currency)}</div>
                                </td>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.statusBadge,
                                        ...styles[getStatusBadge(slot.status).class]
                                    }}>
                                        {getStatusBadge(slot.status).text}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.operator}>
                                        <div style={styles.operatorName}>{slot.operatorName}</div>
                                        <div style={styles.contactPerson}>{slot.contactPerson}</div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        {slot.status !== 'completed' && (
                                            <button
                                                style={styles.actionButton}
                                                onClick={() => handleEditSlot(slot)}
                                                title="Edit Slot"
                                            >
                                                ✏️
                                            </button>
                                        )}

                                        {slot.status !== 'completed' && (
                                            <button
                                                style={{
                                                    ...styles.actionButton,
                                                    ...(slot.status === 'active' ? styles.deactivateButton : styles.activateButton)
                                                }}
                                                onClick={() => handleToggleStatus(slot.id)}
                                                title={slot.status === 'active' ? 'Deactivate' : 'Activate'}
                                            >
                                                {slot.status === 'active' ? '⏸️' : '▶️'}
                                            </button>
                                        )}

                                        {slot.status !== 'active' && (
                                            <button
                                                style={{ ...styles.actionButton, ...styles.deleteButton }}
                                                onClick={() => handleDeleteSlot(slot.id)}
                                                title="Delete Slot"
                                            >
                                                🗑️
                                            </button>
                                        )}

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredSlots.length === 0 && (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyIcon}>📭</div>
                        <h3 style={styles.emptyTitle}>No slots found</h3>
                        <p style={styles.emptyText}>
                            {searchTerm || filterStatus !== 'all' || filterDate
                                ? 'Try adjusting your search or filters'
                                : 'Create your first slot to get started'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )

    const renderCreateForm = () => (
        <div style={styles.formContainer}>
            <AdminSlotCreation
                onSubmit={handleCreateSlot}
                onCancel={() => setCurrentView('dashboard')}
            />
        </div>
    )

    const renderEditForm = () => (
        <div style={styles.formContainer}>
            <AdminSlotCreation
                initialData={selectedSlot}
                onSubmit={handleUpdateSlot}
                onCancel={() => {
                    setCurrentView('dashboard')
                    setSelectedSlot(null)
                }}
            />
        </div>
    )

    return (
        <div style={styles.container}>
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'create' && renderCreateForm()}
            {currentView === 'edit' && renderEditForm()}
        </div>
    )
}

const styles = {
    container: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        padding: '20px'
    },
    dashboard: {
        maxWidth: '1400px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    headerLeft: {
        flex: 1
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 8px 0'
    },
    subtitle: {
        fontSize: '16px',
        color: '#6b7280',
        margin: 0
    },
    createButton: {
        padding: '12px 24px',
        backgroundColor: '#6366f1',
        color: '#ffffff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
    },
    statCard: {
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    statIcon: {
        fontSize: '32px',
        padding: '12px',
        backgroundColor: '#f3f4f6',
        borderRadius: '12px'
    },
    statContent: {
        flex: 1
    },
    statNumber: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 4px 0'
    },
    statLabel: {
        fontSize: '14px',
        color: '#6b7280',
        margin: 0
    },
    filtersSection: {
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    searchBox: {
        flex: 1,
        minWidth: '300px'
    },
    searchInput: {
        width: '100%',
        padding: '12px 16px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.2s ease'
    },
    filterControls: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
    },
    filterSelect: {
        padding: '12px 16px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
        backgroundColor: '#ffffff',
        minWidth: '140px'
    },
    filterDate: {
        padding: '12px 16px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
        backgroundColor: '#ffffff'
    },
    tableContainer: {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    tableHeader: {
        backgroundColor: '#f9fafb'
    },
    th: {
        padding: '16px',
        textAlign: 'left',
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        borderBottom: '1px solid #e5e7eb'
    },
    tableRow: {
        borderBottom: '1px solid #f3f4f6',
        transition: 'background-color 0.2s ease'
    },
    td: {
        padding: '16px',
        fontSize: '14px',
        color: '#1f2937',
        verticalAlign: 'top'
    },
    slotId: {
        fontWeight: '600',
        color: '#1f2937'
    },
    slotDuration: {
        fontSize: '12px',
        color: '#6b7280',
        marginTop: '2px'
    },
    slotDate: {
        fontWeight: '500',
        color: '#1f2937'
    },
    slotTime: {
        fontSize: '12px',
        color: '#6b7280',
        marginTop: '2px'
    },
    route: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    routeFrom: {
        fontWeight: '500',
        color: '#1f2937'
    },
    routeArrow: {
        color: '#6b7280'
    },
    routeTo: {
        fontWeight: '500',
        color: '#1f2937'
    },
    routeStops: {
        fontSize: '12px',
        color: '#6b7280',
        marginTop: '2px'
    },
    capacity: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    available: {
        fontWeight: '600',
        color: '#10b981'
    },
    capacityDivider: {
        color: '#6b7280'
    },
    total: {
        fontWeight: '500',
        color: '#1f2937'
    },
    reserved: {
        fontSize: '12px',
        color: '#6b7280',
        marginTop: '2px'
    },
    price: {
        fontWeight: '600',
        color: '#3b82f6',
        fontSize: '16px'
    },
    statusBadge: {
        padding: '4px 12px',
        borderRadius: '16px',
        fontSize: '12px',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    'status-active': {
        backgroundColor: '#10b981',
        color: '#ffffff'
    },
    'status-inactive': {
        backgroundColor: '#6b7280',
        color: '#ffffff'
    },
    'status-maintenance': {
        backgroundColor: '#f59e0b',
        color: '#ffffff'
    },
    'status-suspended': {
        backgroundColor: '#ef4444',
        color: '#ffffff'
    },
    operator: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    operatorName: {
        fontWeight: '500',
        color: '#1f2937'
    },
    contactPerson: {
        fontSize: '12px',
        color: '#6b7280'
    },
    actions: {
        display: 'flex',
        gap: '8px'
    },
    actionButton: {
        width: '32px',
        height: '32px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        backgroundColor: '#f3f4f6'
    },
    activateButton: {
        backgroundColor: '#dcfce7',
        color: '#16a34a'
    },
    deactivateButton: {
        backgroundColor: '#fef3c7',
        color: '#d97706'
    },
    deleteButton: {
        backgroundColor: '#fee2e2',
        color: '#dc2626'
    },
    emptyState: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#6b7280'
    },
    emptyIcon: {
        fontSize: '48px',
        marginBottom: '16px'
    },
    emptyTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '8px'
    },
    emptyText: {
        fontSize: '14px',
        color: '#6b7280'
    },
    formContainer: {
        maxWidth: '800px',
        margin: '0 auto'
    }
}

export default AdminSlotManagement