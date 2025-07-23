import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "/src/ShipmentStats.css";

const data = [
    { day: "Lun", camions: 200 },
    { day: "Mar", camions: 250 },
    { day: "Mer", camions: 220 },
    { day: "Jeu", camions: 300 },
    { day: "Ven", camions: 280 },
    { day: "Sam", camions: 310 },
    { day: "Dim", camions: 190 },
];

const ShipmentStats = () => {
    return (
        <div className="shipment-stats">
            <h2 className="stats-title">📊 Statistiques Logistiques Hebdo</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">1287</div>
                    <div className="stat-label">Camions traités</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">154</div>
                    <div className="stat-label">En attente</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">92%</div>
                    <div className="stat-label">Taux d’efficacité</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">37</div>
                    <div className="stat-label">Temps moyen (min)</div>
                </div>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#0ff" strokeDasharray="3 3" />
                        <XAxis dataKey="day" stroke="#00fff7" />
                        <YAxis stroke="#00fff7" />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#112", border: "none" }}
                            labelStyle={{ color: "#0ff" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="camions"
                            stroke="#00fff7"
                            strokeWidth={3}
                            dot={{ r: 4, fill: "#00fff7" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ShipmentStats;
