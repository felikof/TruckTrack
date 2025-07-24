import React, { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
//import "./AnalyticView.css";

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
                        {/* <CartesianGrid strokeDasharray="3 3" stroke="#934155" /> */}
                        <XAxis dataKey="name" stroke="#3b464aff" />
                        <YAxis stroke="#3b464aff" />
                        <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#0ff" }} />
                        <Bar dataKey="alertes" fill="#8cc9ffff" barSize={30} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticView;
