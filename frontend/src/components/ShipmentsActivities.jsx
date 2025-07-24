import React from 'react';
import '/src/ShipmentsActivities.css';

const ShipmentsActivities = () => {
    // Données simulées
    const shipments = [
        {
            id: '#1799020-79-797hik',
            category: 'Électronique',
            company: 'Byveteon Inc',
            arrivalTime: '2023-05-15 14:30',
            route: 'New York → Paris',
            price: '$1,250',
            status: 'En transit'
        },
        {
            id: '#1799020-79-797hik',
            category: 'Électronique',
            company: 'Byveteon Inc',
            arrivalTime: '2023-05-15 14:30',
            route: 'New York → Paris',
            price: '$1,250',
            status: 'En transit'
        },
        {
            id: '#1799020-79-797hik',
            category: 'Électronique',
            company: 'Byveteon Inc',
            arrivalTime: '2023-05-15 14:30',
            route: 'New York → Paris',
            price: '$1,250',
            status: 'En transit'
        },
        {
            id: '#1799020-79-797hik',
            category: 'Électronique',
            company: 'Byveteon Inc',
            arrivalTime: '2023-05-15 14:30',
            route: 'New York → Paris',
            price: '$1,250',
            status: 'En transit'
        },
        // Ajoutez d'autres données ici...
    ];

    const statusFilters = ['All Shipments', 'Delivered', 'In transit', 'Pending', 'Processing'];

    return (
        <div className="shipments-activities">
            <div className="header">
                <h2>Shipments Activities</h2>
                <div className="controls">
                    <div className="status-filters">
                        {statusFilters.map((filter, index) => (
                            <button
                                key={index}
                                className={`filter-btn ${index === 0 ? 'active' : ''}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="pagination">
                        <button className="page-btn">〈</button>
                        <span>1-10</span>
                        <button className="page-btn">〉</button>
                    </div>
                </div>
            </div>

            <p className="subtitle">Keep track of recent shipping activity</p>

            <div className="shipments-table">
                <div className="table-header">
                    <div className="header-cell">Order ID</div>
                    <div className="header-cell">Category</div>
                    <div className="header-cell">Company</div>
                    <div className="header-cell">Arrival time</div>
                    <div className="header-cell">Route</div>
                    <div className="header-cell">Price</div>
                    <div className="header-cell">Status</div>
                </div>

                {shipments.map((shipment, index) => (
                    <div key={index} className="table-row">
                        <div className="table-cell">{shipment.id}</div>
                        <div className="table-cell">{shipment.category}</div>
                        <div className="table-cell">{shipment.company}</div>
                        <div className="table-cell">{shipment.arrivalTime}</div>
                        <div className="table-cell">{shipment.route}</div>
                        <div className="table-cell">{shipment.price}</div>
                        <div className="table-cell">
                            <span className={`status-badge ${shipment.status.toLowerCase().replace(' ', '-')}`}>
                                {shipment.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShipmentsActivities;
