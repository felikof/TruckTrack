import React from 'react';
import '/src/DeliveryVehicles.css';

const DeliveryVehicles = () => {
    return (
        <div className="delivery-vehicles-card">
            <div className="header">
                <h3>Delivery Vehicles</h3>
                <p className="subtitle">Vehicles operating on the road</p>
            </div>

            <div className="metrics">
                <div className="main-metric">
                    <span className="value">89</span>
                    <span className="trend positive">+2,29%</span>
                </div>
                <p className="comparison">than last week</p>
            </div>

            <div className="status">
                <span className="status-badge on-route">On-Route</span>
            </div>
        </div>
    );
};

export default DeliveryVehicles;