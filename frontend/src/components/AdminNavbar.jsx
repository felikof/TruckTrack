import React from 'react';
import '/src/AdminNavbar.css';

const AdminNavbar = () => {
    return (
        <div className="admin-navbar">
            <div className="navbar-brand">
                <h1>Truck-Tracking</h1>
                <div className="admin-badge">Admin</div>
            </div>

            <nav className="navbar-nav">
                <ul>
                    <li className="active">Shipping</li>
                    <li>Tracking</li>
                    <li>Analytics</li>
                    <li>History</li>
                </ul>
            </nav>

            <div className="navbar-right">
                <div className="user-greeting">
                    <span className="greeting-text">Hello Lincoln,</span>
                    <span className="time-greeting">Good Morning</span>
                </div>

                <div className="navbar-actions">
                    <select className="timeframe-select">
                        <option>Timeframe</option>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                    </select>
                    <button className="export-btn">Export CSV</button>
                    <button className="new-shipment-btn">New Shipment</button>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;