import { useState } from 'react'

function NotificationsSidebar({ onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 'N001',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your slot reservation #TG-2025-001 has been confirmed for tomorrow at 08:00.',
      time: '2 hours ago',
      unread: true,
      actionable: true
    },
    // {
    //   id: 'N002',
    //   type: 'update',
    //   title: 'Slot Status Update',
    //   message: 'Your truck TG-3456-GH has reached the weighbridge checkpoint. ETA to terminal: 20 minutes.',
    //   time: '5 hours ago',
    //   unread: true,
    //   actionable: false
    // },
    // {
    //   id: 'N003',
    //   type: 'alert',
    //   title: 'Gate Delay Alert',
    //   message: 'Gate A1 is experiencing delays. Average wait time increased to 25 minutes.',
    //   time: '1 day ago',
    //   unread: false,
    //   actionable: false
    // },
    // {
    //   id: 'N004',
    //   type: 'booking',
    //   title: 'Booking Completed',
    //   message: 'Slot #TG-2024-156 completed successfully. Rate your experience to help us improve.',
    //   time: '2 days ago',
    //   unread: false,
    //   actionable: true
    // },
    // {
    //   id: 'N005',
    //   type: 'system',
    //   title: 'System Maintenance',
    //   message: 'Scheduled maintenance on January 20, 2025, from 02:00 to 04:00. Services may be temporarily unavailable.',
    //   time: '3 days ago',
    //   unread: false,
    //   actionable: false
    // },
    // {
    //   id: 'N006',
    //   type: 'update',
    //   title: 'New Terminal Available',
    //   message: 'Terminal 4 is now open for bookings. Check out the new routes and facilities.',
    //   time: '4 days ago',
    //   unread: false,
    //   actionable: true
    // },
    // {
    //   id: 'N007',
    //   type: 'alert',
    //   title: 'Weather Advisory',
    //   message: 'Heavy rain expected tomorrow. Consider rescheduling non-urgent shipments.',
    //   time: '5 days ago',
    //   unread: false,
    //   actionable: false
    // },
    // {
    //   id: 'N008',
    //   type: 'booking',
    //   title: 'Payment Received',
    //   message: 'Payment of CFA 45,000 received for booking #TG-2025-001.',
    //   time: '1 week ago',
    //   unread: false,
    //   actionable: false
    // }
  ])

  const [filter, setFilter] = useState('all')

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, unread: false }))
    )
  }

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
        return '📅'
      case 'update':
        return '🔄'
      case 'alert':
        return '⚠️'
      case 'system':
        return '🔧'
      default:
        return '📬'
    }
  }

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => n.unread)
    : notifications

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="notifications-sidebar">
      <div className="sidebar-header">
        <div>
          <h3>Notifications</h3>
          {unreadCount > 0 && (
            <span style={{
              display: 'inline-block',
              marginLeft: '0.75rem',
              padding: '0.25rem 0.75rem',
              background: '#2563eb',
              color: 'white',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}>
              {unreadCount} new
            </span>
          )}
        </div>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid #e1e8ed',
        display: 'flex',
        gap: '0.75rem'
      }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #e1e8ed',
            background: filter === 'all' ? '#2563eb' : 'white',
            color: filter === 'all' ? 'white' : '#64748b',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #e1e8ed',
            background: filter === 'unread' ? '#2563eb' : 'white',
            color: filter === 'unread' ? 'white' : '#64748b',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
        >
          Unread ({unreadCount})
        </button>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #e1e8ed',
              background: 'white',
              color: '#64748b',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            title="Mark all as read"
          >
            ✓
          </button>
        )}
      </div>

      <div className="notifications-content">
        {filteredNotifications.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#94a3b8'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <p>No notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.unread ? 'unread' : ''}`}
            >
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="notification-header">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                  <div className="notification-message">{notification.message}</div>
                  {notification.actionable && (
                    <div className="notification-actions">
                      <button className="notification-btn primary">
                        View Details
                      </button>
                      {notification.unread && (
                        <button
                          className="notification-btn"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  )}
                  {!notification.actionable && notification.unread && (
                    <div className="notification-actions">
                      <button
                        className="notification-btn"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        Mark as Read
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(notification.id)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#fee2e2',
                    color: '#dc2626',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    flexShrink: 0,
                    transition: 'all 0.2s'
                  }}
                  title="Delete notification"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredNotifications.length > 0 && (
        <div className="sidebar-actions">
          <button
            className="profile-btn"
            onClick={() => setNotifications([])}
            style={{ width: '100%' }}
          >
            Clear All Notifications
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationsSidebar
