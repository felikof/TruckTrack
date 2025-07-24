// import React from "react";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//     CartesianAxis,
// } from "recharts";
// import "/src/ShipmentStats.css";

// const data = [
//     { day: "Lun", camions: 200 },
//     { day: "Mar", camions: 250 },
//     { day: "Mer", camions: 220 },
//     { day: "Jeu", camions: 300 },
//     { day: "Ven", camions: 280 },
//     { day: "Sam", camions: 310 },
//     { day: "Dim", camions: 190 },
// ];

// const ShipmentStats = () => {
//     return (
//         <div className="shipment-stats">
//             <h2 className="stats-title">📊 Statistiques Logistiques Hebdo</h2>

//             <div className="stats-grid">
//                 <div className="stat-card">
//                     <div className="stat-value">1287</div>
//                     <div className="stat-label">Camions traités</div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-value">154</div>
//                     <div className="stat-label">En attente</div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-value">92%</div>
//                     <div className="stat-label">Taux d’efficacité</div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-value">37</div>
//                     <div className="stat-label">Temps moyen (min)</div>
//                 </div>
//             </div>

//             <div className="chart-container">
//                 <ResponsiveContainer width="85%" height={250}>
//                     <BarChart data={data}>
//                         {/* <CartesianGrid stroke="#ff0000ff" strokeDasharray="none"/> */}
//                         <XAxis dataKey="day" stroke="#171a1aff" />
//                         <YAxis stroke="#171a1aff" />
//                         <Tooltip
//                             contentStyle={{ backgroundColor: "#91a6eeff", border: "none", borderRadius: "8px", height: "auto" }}
//                             labelStyle={{ color: "#ffffff" }}
//                         />
//                         <Bar
//                             type="monotone"
//                             dataKey="camions"
//                             fill="#8cc9ffff"
//                             radius={[4, 4, 2, 2]}
//                             barSize={30}
//                             // dot={{ r: 4, fill: "#ff0000ff" }}
//                         />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default ShipmentStats;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '/src/ShipmentStats.css';

const ShipmentStats = () => {
    // Données simulées pour le graphique
    const chartData = [
        { name: 'Jan', value: 12 },
        { name: 'Feb', value: 15 },
        { name: 'Mar', value: 10 },
        { name: 'Apr', value: 18 },
        { name: 'May', value: 14 },
        { name: 'Jun', value: 16 },
        { name: 'Jul', value: 19 },
        { name: 'Aug', value: 11 },
        { name: 'Sep', value: 13 },
        { name: 'Oct', value: 17 },
    ];

    return (
        <div className="shipment-stats-container">
            <h2>Shipments Statistics</h2>

            <div className="total-deliveries">
                Total number of deliveries <span className="total-number">72.8K</span>
            </div>

            <div className="stats-tabs">
                <button className="stat-tab active">Shipment</button>
                <button className="stat-tab">Delivery</button>
                <button className="stat-tab">Daily</button>
            </div>

            <div className="divider"></div>

            <div className="chart-bars">
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#666', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[0, 20]}
                                tick={{ fill: '#666', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderRadius: '6px',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    border: 'none'
                                }}
                            />
                            <Bar
                                dataKey="value"
                                fill="#2a7be4"
                                radius={[4, 4, 0, 0]}
                                barSize={20}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ShipmentStats;