import React from 'react';
import '/src/TrackingDelivery.css';

const TrackingDelivery = () => {
    // Données de suivi
    const trackingData = [
        { date: '1 Dec 2023', status: 'Checking', time: '10:23 AM' },
        { date: '12 Dec 2023', status: 'In transit', time: '10:23 AM' },
        { date: '13 Dec 2023', status: 'Delivered', time: '10:23 AM' }
    ];

    return (
        <div className="tracking-delivery">
            <h2>Tracking Delivery</h2>
            <p className="subtitle">Last viewed delivery history</p>

            <div className="tracking-id">
                <span>Tracking ID</span>
                <div className="id-value">#172989-72-727bjk</div>
            </div>

            <div className="timeline">
                {trackingData.map((item, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-marker">
                            <div className={`status-dot ${item.status.toLowerCase().replace(' ', '-')}`}></div>
                            {index < trackingData.length - 1 && <div className="timeline-line"></div>}
                        </div>
                        <div className="timeline-content">
                            <div className="timeline-date">{item.date}</div>
                            <div className={`timeline-status ${item.status.toLowerCase().replace(' ', '-')}`}>
                                {item.status}
                            </div>
                            <div className="timeline-time">{item.time}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="courier-info">
                <div className="courier-label">Courier</div>
                <div className="courier-name">Adam Schleifer</div>
                <div className="current-status">
                    <span className="status-badge in-transit">In transit</span>
                    <span className="status-time">10:23 AM</span>
                </div>
            </div>
        </div>
    );
};

export default TrackingDelivery;