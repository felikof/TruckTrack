import Notifications from '../components/Notifications';
import ShipmentTracking from '../components/ShipmentTracking';
import UserProfile from '../components/UserProfile';

import React from 'react';

const UserDashboard = () => {
    // Données de l'utilisateur
    const user = {
        name: "Félix Agb",
        email: "agkofelix2022@gmail.com",
        membership: "Premium",
        joinDate: "15/03/2022",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    };

    // Colis en cours
    const shipments = [
        { id: "TRK-789456", status: "En transit", estimate: "20/05/2023", carrier: "FedEx" },
        { id: "TRK-123456", status: "Livré", estimate: "10/05/2023", carrier: "UPS" }
    ];

    // Notifications
    const notifications = [
        { id: 1, message: "Votre colis TRK-789456 est en route", time: "2h ago", read: false },
        { id: 2, message: "Livraison TRK-123456 complétée", time: "1j ago", read: true }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            fontFamily: 'Arial, sans-serif',
            width: '100%',
        }}>
            {/* Header */}
            <header style={{
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '1.5rem 0'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#111827'
                    }}>Mon Espace Client</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button style={{
                            color: '#6b7280',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <img
                            src={user.avatar}
                            alt="Profile"
                            style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* Contenu Principal */}
            <main style={{
                maxWidth: '1200px',
                margin: '2rem auto',
                padding: '0 1rem'
            }}>
                <div style={{
                    display: 'grid',
                    gap: '2rem',
                    gridTemplateColumns: '1fr',
                    marginBottom: '2rem'
                }}>
                    {/* Première Rangée */}
                    <div style={{
                        display: 'grid',
                        gap: '2rem',
                        gridTemplateColumns: '1fr'
                    }}>
                        {/* Profil Utilisateur */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            padding: '1.5rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <img
                                    src={user.avatar}
                                    alt="User"
                                    style={{
                                        width: '4rem',
                                        height: '4rem',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>{user.name}</h2>
                                    <p style={{ color: '#6b7280', margin: 0 }}>{user.email}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <p style={{ margin: 0 }}>
                                    <span style={{ fontWeight: '500' }}>Membre depuis:</span> {user.joinDate}
                                </p>
                                <p style={{ margin: 0 }}>
                                    <span style={{ fontWeight: '500' }}>Statut:</span>
                                    <span style={{
                                        backgroundColor: '#e9d5ff',
                                        color: '#7e22ce',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '9999px',
                                        marginLeft: '0.5rem'
                                    }}>
                                        {user.membership}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Statistiques */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            padding: '1.5rem'
                        }}>
                            <h2 style={{
                                fontSize: '1.125rem',
                                fontWeight: '500',
                                marginBottom: '1rem',
                                color: '#111827'
                            }}>Mes Statistiques</h2>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '1rem'
                            }}>
                                {/* Colis Envoyés */}
                                <div style={{
                                    backgroundColor: '#eff6ff',
                                    padding: '1rem',
                                    borderRadius: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#1d4ed8',
                                        marginBottom: '0.5rem'
                                    }}>Colis envoyés</p>
                                    <p style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        margin: 0
                                    }}>24</p>
                                </div>

                                {/* Livraisons Réussies */}
                                <div style={{
                                    backgroundColor: '#ecfdf5',
                                    padding: '1rem',
                                    borderRadius: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#047857',
                                        marginBottom: '0.5rem'
                                    }}>Livraisons réussies</p>
                                    <p style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        margin: 0
                                    }}>22</p>
                                </div>

                                {/* En Cours */}
                                <div style={{
                                    backgroundColor: '#fef3c7',
                                    padding: '1rem',
                                    borderRadius: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#b45309',
                                        marginBottom: '0.5rem'
                                    }}>En cours</p>
                                    <p style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        margin: 0
                                    }}>2</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deuxième Rangée */}
                    <div style={{
                        display: 'grid',
                        gap: '2rem',
                        gridTemplateColumns: '1fr'
                    }}>
                        {/* Suivi des Colis */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            padding: '1.5rem'
                        }}>
                            <h2 style={{
                                fontSize: '1.125rem',
                                fontWeight: '500',
                                marginBottom: '1rem',
                                color: '#111827'
                            }}>Suivi des Colis</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {shipments.map(shipment => (
                                    <div key={shipment.id} style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.5rem',
                                        padding: '1rem',
                                        ':hover': {
                                            backgroundColor: '#f9fafb'
                                        }
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <span style={{ fontWeight: '500' }}>{shipment.id}</span>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                backgroundColor: shipment.status === 'Livré' ? '#dcfce7' : '#dbeafe',
                                                color: shipment.status === 'Livré' ? '#166534' : '#1e40af'
                                            }}>
                                                {shipment.status}
                                            </span>
                                        </div>
                                        <p style={{
                                            fontSize: '0.875rem',
                                            color: '#6b7280',
                                            marginBottom: '0.5rem'
                                        }}>Transporteur: {shipment.carrier}</p>
                                        <p style={{
                                            fontSize: '0.875rem',
                                            color: '#6b7280'
                                        }}>Estimation: {shipment.estimate}</p>
                                        <button style={{
                                            marginTop: '0.5rem',
                                            color: '#3b82f6',
                                            fontSize: '0.875rem',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            padding: 0,
                                            ':hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}>
                                            Voir le détail →
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notifications */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            padding: '1.5rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem'
                            }}>
                                <h2 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: '500',
                                    color: '#111827',
                                    margin: 0
                                }}>Notifications</h2>
                                <span style={{
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '9999px'
                                }}>
                                    {notifications.filter(n => !n.read).length}
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {notifications.map(notification => (
                                    <div key={notification.id} style={{
                                        paddingBottom: '0.75rem',
                                        borderBottom: notification.id !== notifications[notifications.length - 1].id ? '1px solid #e5e7eb' : 'none'
                                    }}>
                                        <p style={{
                                            margin: 0,
                                            fontWeight: notification.read ? 'normal' : '500'
                                        }}>
                                            {notification.message}
                                        </p>
                                        <p style={{
                                            fontSize: '0.75rem',
                                            color: '#6b7280',
                                            margin: '0.25rem 0 0 0'
                                        }}>
                                            {notification.time}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Historique */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    padding: '1.5rem'
                }}>
                    <h2 style={{
                        fontSize: '1.125rem',
                        fontWeight: '500',
                        marginBottom: '1rem',
                        color: '#111827'
                    }}>Historique des Livraisons</h2>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse'
                        }}>
                            <thead style={{ backgroundColor: '#f9fafb' }}>
                                <tr>
                                    <th style={{
                                        padding: '0.75rem 1rem',
                                        textAlign: 'left',
                                        fontSize: '0.75rem',
                                        color: '#6b7280',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>N° de Suivi</th>
                                    <th style={{
                                        padding: '0.75rem 1rem',
                                        textAlign: 'left',
                                        fontSize: '0.75rem',
                                        color: '#6b7280',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>Statut</th>
                                    <th style={{
                                        padding: '0.75rem 1rem',
                                        textAlign: 'left',
                                        fontSize: '0.75rem',
                                        color: '#6b7280',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>Transporteur</th>
                                    <th style={{
                                        padding: '0.75rem 1rem',
                                        textAlign: 'left',
                                        fontSize: '0.75rem',
                                        color: '#6b7280',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>Date</th>
                                    <th style={{
                                        padding: '0.75rem 1rem',
                                        textAlign: 'left',
                                        fontSize: '0.75rem',
                                        color: '#6b7280',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shipments.map((shipment, index) => (
                                    <tr key={shipment.id} style={{
                                        borderBottom: index !== shipments.length - 1 ? '1px solid #e5e7eb' : 'none',
                                        ':hover': {
                                            backgroundColor: '#f9fafb'
                                        }
                                    }}>
                                        <td style={{
                                            padding: '1rem',
                                            fontSize: '0.875rem',
                                            color: '#111827',
                                            fontWeight: '500'
                                        }}>
                                            {shipment.id}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                borderRadius: '9999px',
                                                backgroundColor: shipment.status === 'Livré' ? '#dcfce7' : '#dbeafe',
                                                color: shipment.status === 'Livré' ? '#166534' : '#1e40af'
                                            }}>
                                                {shipment.status}
                                            </span>
                                        </td>
                                        <td style={{
                                            padding: '1rem',
                                            fontSize: '0.875rem',
                                            color: '#6b7280'
                                        }}>
                                            {shipment.carrier}
                                        </td>
                                        <td style={{
                                            padding: '1rem',
                                            fontSize: '0.875rem',
                                            color: '#6b7280'
                                        }}>
                                            {shipment.estimate}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <button style={{
                                                color: '#3b82f6',
                                                fontSize: '0.875rem',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: 0,
                                                ':hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}>
                                                Détails
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
