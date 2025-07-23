import React from "react";
import Navbar from "../components/Navbar";
import ShipmentStats from "../components/ShipmentStats";
import AnalyticView from "../components/AnalyticView";
import TrackingDelivery from "../components/TrackingDelivery";
import DeliveryVehicles from "../components/DeliveryVehicles";
import ShipmentsActivities from "../components/ShipmentsActivities";

export default function Dashboard() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ShipmentStats />
                <AnalyticView />
                <TrackingDelivery />
                <DeliveryVehicles />
                <ShipmentsActivities />
            </div>
        </div>
    );
}
