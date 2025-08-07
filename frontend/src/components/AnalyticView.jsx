import React, { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

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
        <div className="analytic-view-container" style={{ height: "100%", width: "auto", backgroundColor: "#ffffffff", borderRadius: "1.5rem", padding: "1rem", position: "relative", margin: "30px 30px 20px 30px"}}>
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

// import React, { useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// // Données de test garanties non vides
// const rawData = [
//     { name: "Nord", value: 12 },
//     { name: "Sud", value: 19 },
//     { name: "Est", value: 8 },
//     { name: "Ouest", value: 15 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const AnalyticView = () => {
//     const [activeZone, setActiveZone] = useState("All");

//     const filteredData = activeZone === "All"
//         ? rawData
//         : rawData.filter(item => item.name === activeZone);

//     console.log("Données affichées:", filteredData); // Debug

//     return (
//         <div className="bg-white rounded-xl p-4 shadow-md w-full h-[400px]" style={{ position: "relative", marginTop: "30px", marginBottom: "20px"}}>
//             <h2 className="text-lg font-bold mb-4">Répartition par Zone</h2>
//             <PieChart width={400} height={400}>
//                 <Pie data={[{ name: 'Test', value: 1 }]} dataKey="value" />
//             </PieChart>
//             <div className="mb-4">
//                 <select
//                     value={activeZone}
//                     onChange={(e) => setActiveZone(e.target.value)}
//                     className="p-2 border rounded"
//                 >
//                     <option value="All">Toutes zones</option>
//                     {rawData.map((zone) => (
//                         <option key={zone.name} value={zone.name}>
//                             {zone.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {filteredData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="80%">
//                     <PieChart>
//                         <Pie
//                             data={filteredData}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             label={({ name, percent }) =>
//                                 `${name}: ${(percent * 100).toFixed(0)}%`
//                             }
//                             outerRadius={80}
//                             fill="#8884d8"
//                             dataKey="value"
//                         >
//                             {filteredData.map((entry, index) => (
//                                 <Cell
//                                     key={`cell-${index}`}
//                                     fill={COLORS[index % COLORS.length]}
//                                 />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                     </PieChart>
//                 </ResponsiveContainer>
//             ) : (
//                 <div className="flex items-center justify-center h-full">
//                     <p className="text-gray-500">Aucune donnée à afficher</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AnalyticView;