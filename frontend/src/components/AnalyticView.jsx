// import React from "react";
// import {
//     BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from "recharts";
// import "./AnalyticView.css";

// const data = [
//     { name: "Lundi", alertes: 3 },
//     { name: "Mardi", alertes: 7 },
//     { name: "Mercredi", alertes: 2 },
//     { name: "Jeudi", alertes: 5 },
//     { name: "Vendredi", alertes: 4 },
// ];

// const AnalyticView = () => {
//     return (
//         <div className="analytic-view-container">
//             <h2 className="analytic-title">Statistiques Hebdomadaires</h2>
//             <div className="chart-wrapper">
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={data}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                         <XAxis dataKey="name" stroke="#94a3b8" />
//                         <YAxis stroke="#94a3b8" />
//                         <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#0ff" }} />
//                         <Bar dataKey="alertes" fill="#0ff" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default AnalyticView;

import React, { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
//import "./AnalyticView.css";

const rawData = [
    { name: "Lundi", alertes: 3, zone: "Nord" },
    { name: "Mardi", alertes: 7, zone: "Sud" },
    { name: "Mercredi", alertes: 2, zone: "Est" },
    { name: "Jeudi", alertes: 5, zone: "Ouest" },
    { name: "Vendredi", alertes: 4, zone: "Nord" },
];

// Exemple de jours (date simple sous forme de string, ici noms de jours)
const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

// Zones disponibles
const zones = ["Tous", "Nord", "Sud", "Est", "Ouest"];

const AnalyticView = () => {
    const [dateStart, setDateStart] = useState("Lundi");
    const [dateEnd, setDateEnd] = useState("Vendredi");
    const [zoneFilter, setZoneFilter] = useState("Tous");

    // Filtrage des données selon les filtres sélectionnés
    const filteredData = rawData.filter(item => {
        // Filtre date : inclure uniquement entre dateStart et dateEnd (inclus)
        const index = jours.indexOf(item.name);
        const startIndex = jours.indexOf(dateStart);
        const endIndex = jours.indexOf(dateEnd);
        const inDateRange = index >= startIndex && index <= endIndex;

        // Filtre zone : soit "Tous", soit correspondance exacte
        const inZone = zoneFilter === "Tous" || item.zone === zoneFilter;

        return inDateRange && inZone;
    });

    return (
        <div className="analytic-view-container">
            <h2 className="analytic-title">Statistiques Hebdomadaires</h2>

            <div className="filters-container" style={{ marginBottom: 20 }}>
                <label>
                    Du :{" "}
                    <select value={dateStart} onChange={e => setDateStart(e.target.value)}>
                        {jours.map(j => <option key={j} value={j}>{j}</option>)}
                    </select>
                </label>

                <label style={{ marginLeft: 20 }}>
                    Au :{" "}
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
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#934155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#54a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#0ff" }} />
                        <Bar dataKey="alertes" fill="#0ff" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticView;
