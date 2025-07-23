import React from "react";

export default function TrackingDelivery() {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Tracking Delivery</h2>
            <p>Tracking ID: #172989-72-727bjk</p>
            <ul className="text-sm mt-2">
                <li>13 Dec 2023 - Delivered</li>
                <li>12 Dec 2023 - In transit</li>
                <li>11 Dec 2023 - Checking</li>
            </ul>
            <div className="mt-3 flex items-center gap-2">
                <img src="/courier.jpg" alt="courier" className="w-8 h-8 rounded-full" />
                <span>Adam Schleifer</span>
            </div>
        </div>
    );
}
