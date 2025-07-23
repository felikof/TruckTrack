import React from "react";

export default function DeliveryVehicles() {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Delivery Vehicles</h2>
            <p className="text-3xl font-bold">89</p>
            <p className="text-green-500 text-sm">+2.29% from last week</p>
            <img src="/van.png" alt="vehicle" className="mt-2 w-full h-24 object-contain" />
        </div>
    );
}
