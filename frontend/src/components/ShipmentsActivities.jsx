import React from "react";

const shipments = [
    { id: "#172989-72-727bjk", category: "Electronic", company: "Exetron Co", date: "24 Dec 2023", route: "London - Prague", price: "$5,872", status: "Delivered" },
    // ajoute plus si besoin
];

export default function ShipmentsActivities() {
    return (
        <div className="bg-white p-4 rounded shadow col-span-2">
            <h2 className="text-lg font-semibold mb-2">Shipments Activities</h2>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left border-b">
                        <th>Order ID</th><th>Category</th><th>Company</th><th>Arrival</th><th>Route</th><th>Price</th><th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments.map((s, i) => (
                        <tr key={i} className="border-b">
                            <td>{s.id}</td>
                            <td>{s.category}</td>
                            <td>{s.company}</td>
                            <td>{s.date}</td>
                            <td>{s.route}</td>
                            <td>{s.price}</td>
                            <td>{s.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
