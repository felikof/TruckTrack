import React, { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
//import "/src/AnalyticView.css";

const rawData = [
    { name: "Mon", alertes: 3, zone: "Nord" },
    { name: "Tue", alertes: 7, zone: "Sud" },
    { name: "Wed", alertes: 2, zone: "Est" },
    { name: "Thu", alertes: 5, zone: "Ouest" },
    { name: "Fri", alertes: 4, zone: "Nord" },
    { name: "Sat", alertes: 6, zone: "Sud" },
    { name: "Sun", alertes: 1, zone: "Est" },
];

// Exemple de jours (date simple sous forme de string, ici noms de jours)
const jours = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Zones disponibles
const zones = ["All", "North", "South", "East", "West"];

const AnalyticView = () => {
    const [dateStart, setDateStart] = useState("Mon");
    const [dateEnd, setDateEnd] = useState("Fri");
    const [zoneFilter, setZoneFilter] = useState("All");

    // Filtrage des données selon les filtres sélectionnés
    const filteredData = rawData.filter(item => {
        // Filtre date : inclure uniquement entre dateStart et dateEnd (inclus)
        const index = jours.indexOf(item.name);
        const startIndex = jours.indexOf(dateStart);
        const endIndex = jours.indexOf(dateEnd);
        const inDateRange = index >= startIndex && index <= endIndex;

        // Filtre zone : soit "Tous", soit correspondance exacte
        const inZone = zoneFilter === "All" || item.zone === zoneFilter;

        return inDateRange && inZone;
    });

    return (
        <div className="analytic-view-container" style={{ height: "100%", width: "40%", backgroundColor: "#ffffffff", borderRadius: "1.5rem", padding: "1rem", position: "relative", marginTop: "-450px", marginLeft: "750px", marginBottom: "20px" }}>
            <h2 className="analytic-title">Weekly Statistics</h2>

            <div className="filters-container" style={{ marginBottom: 20 }}>
                <label>
                    From :{" "}
                    <select value={dateStart} onChange={e => setDateStart(e.target.value)}>
                        {jours.map(j => <option key={j} value={j}>{j}</option>)}
                    </select>
                </label>

                <label style={{ marginLeft: 20 }}>
                    To :{" "}
                    <select value={dateEnd} onChange={e => setDateEnd(e.target.value)}>
                        {jours.map(j => <option key={j} value={j}>{j}</option>)}
                    </select>
                </label>

                <label style={{ marginLeft: 20 }}>
                    Zone :{" "}
                    <select value={zoneFilter} onChange={e => setZoneFilter(e.target.value)}>
                        {zones.map(z => <option key={z} value={z}>{z}</option>)}
                    </select>
                </label>
            </div>

            <div className="chart-wrapper">
                <ResponsiveContainer width="85%" height={280}>
                    <BarChart data={filteredData}>
                        {/* <CartesianGrid strokeDasharray="3 3" stroke="#ff0040ff" /> */}
                        <XAxis dataKey="name" stroke="#3b464aff" />
                        <YAxis stroke="#3b464aff" />
                        <Tooltip contentStyle={{ backgroundColor: "#e07171ff", borderColor: "#0ff" }} />
                        <Bar dataKey="alertes" fill="#8cc9ffff" barSize={30} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
};

export default AnalyticView;


// import React, { useState } from 'react';
// import '/src/AnalyticView.css';
// import {
//     BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from "recharts";

// const rawData = [
//     { name: "Mon", alertes: 3, zone: "Nord" },
//     { name: "Tue", alertes: 7, zone: "Sud" },
//     { name: "Wed", alertes: 2, zone: "Est" },
//     { name: "Thu", alertes: 5, zone: "Ouest" },
//     { name: "Fri", alertes: 4, zone: "Nord" },
//     { name: "Sat", alertes: 6, zone: "Sud" },
//     { name: "Sun", alertes: 1, zone: "Est" },
// ];

// // Exemple de jours (date simple sous forme de string, ici noms de jours)
// const jours = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // Zones disponibles
// const zones = ["All", "North", "South", "East", "West"];


// const AnalyticView = () => {
//     const [dateStart, setDateStart] = useState("Mon");
//     const [dateEnd, setDateEnd] = useState("Fri");
//     const [zoneFilter, setZoneFilter] = useState("All");

//     // Filtrage des données selon les filtres sélectionnés
//     const filteredData = rawData.filter(item => {
//         // Filtre date : inclure uniquement entre dateStart et dateEnd (inclus)
//         const index = jours.indexOf(item.name);
//         const startIndex = jours.indexOf(dateStart);
//         const endIndex = jours.indexOf(dateEnd);
//         const inDateRange = index >= startIndex && index <= endIndex;

//         // Filtre zone : soit "Tous", soit correspondance exacte
//         const inZone = zoneFilter === "All" || item.zone === zoneFilter;

//         return inDateRange && inZone;
//     });

//     const trackingData = [
//         { date: '1 Dec 2023', status: 'Checking', time: '10:23 AM' },
//         { date: '12 Dec 2023', status: 'In transit', time: '10:23 AM' },
//         { date: '13 Dec 2023', status: 'Delivered', time: '10:23 AM' }
//     ];

//     return (
//         <div className="analytics-container" style={{ height: "100%", width: "40%", backgroundColor: "#ffffffff", borderRadius: "1.5rem", padding: "1rem", position: "relative", marginTop: "-450px", marginLeft: "750px", marginBottom: "20px" }}>
//             {/* Première ligne - Revenue Overview */}
//             <div className="analytic-view-container">
//                 <h2 className="analytic-title">Weekly Statistics</h2>

//                 <div className="filters-container" style={{ marginBottom: 20 }}>
//                     <label>
//                         From :{" "}
//                         <select value={dateStart} onChange={e => setDateStart(e.target.value)}>
//                             {jours.map(j => <option key={j} value={j}>{j}</option>)}
//                         </select>
//                     </label>

//                     <label style={{ marginLeft: 20 }}>
//                         To :{" "}
//                         <select value={dateEnd} onChange={e => setDateEnd(e.target.value)}>
//                             {jours.map(j => <option key={j} value={j}>{j}</option>)}
//                         </select>
//                     </label>

//                     <label style={{ marginLeft: 20 }}>
//                         Zone :{" "}
//                         <select value={zoneFilter} onChange={e => setZoneFilter(e.target.value)}>
//                             {zones.map(z => <option key={z} value={z}>{z}</option>)}
//                         </select>
//                     </label>
//                 </div>
//             </div>
//             <div className="chart-wrapper">
//                 <ResponsiveContainer width="85%" height={280}>
//                     <BarChart data={filteredData}>
//                         {/* <CartesianGrid strokeDasharray="3 3" stroke="#ff0040ff" /> */}
//                         <XAxis dataKey="name" stroke="#3b464aff" />
//                         <YAxis stroke="#3b464aff" />
//                         <Tooltip contentStyle={{ backgroundColor: "#e07171ff", borderColor: "#0ff" }} />
//                         <Bar dataKey="alertes" fill="#8cc9ffff" barSize={30} radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>

//             {/* Deuxième ligne - Deux cartes côte à côte */}
//             <div className="dual-cards">
//                 {/* Carte Véhicules */}
//                 <div className="delivery-vehicles-card">
//                     <div className="header">
//                         <h3>Delivery Vehicles</h3>
//                         <p className="subtitle">Vehicles operating on the road</p>
//                     </div>

//                     <div className="metrics">
//                         <div className="main-metric">
//                             <span className="value">89</span>
//                             <span className="trend positive">+2,29%</span>
//                         </div>
//                         <p className="comparison">than last week</p>
//                     </div>

//                     <div className="status">
//                         <span className="status-badge on-route">On-Route</span>
//                     </div>
//                 </div>

//                 {/* Carte Tracking */}
//                 <div className="tracking-card">
//                     <div className="tracking-delivery">
//                         <h2>Tracking Delivery</h2>
//                         <p className="subtitle">Last viewed delivery history</p>

//                         <div className="tracking-id">
//                             <span>Tracking ID</span>
//                             <div className="id-value">#172989-72-727bjk</div>
//                         </div>

//                         <div className="timeline">
//                             {trackingData.map((item, index) => (
//                                 <div key={index} className="timeline-item">
//                                     <div className="timeline-marker">
//                                         <div className={`status-dot ${item.status.toLowerCase().replace(' ', '-')}`}></div>
//                                         {index < trackingData.length - 1 && <div className="timeline-line"></div>}
//                                     </div>
//                                     <div className="timeline-content">
//                                         <div className="timeline-date">{item.date}</div>
//                                         <div className={`timeline-status ${item.status.toLowerCase().replace(' ', '-')}`}>
//                                             {item.status}
//                                         </div>
//                                         <div className="timeline-time">{item.time}</div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="courier-info">
//                             <div className="courier-label">Courier</div>
//                             <div className="courier-name">Adam Schleifer</div>
//                             <div className="current-status">
//                                 <span className="status-badge in-transit">In transit</span>
//                                 <span className="status-time">10:23 AM</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Composant Timeline réutilisable
// const TimelineItem = ({ date, status, time }) => (
//     <div className="timeline-item">
//         <div className="timeline-marker"></div>
//         <div className="timeline-content">
//             <div className="timeline-date">{date}</div>
//             <div className={`timeline-status ${status.toLowerCase().replace(' ', '-')}`}>
//                 {status}
//             </div>
//             <div className="timeline-time">{time}</div>
//         </div>
//     </div>
// );

// export default AnalyticView;