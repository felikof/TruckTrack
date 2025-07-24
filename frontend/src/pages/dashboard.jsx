import React from "react";
import ShipmentStats from "../components/ShipmentStats";
import AnalyticView from "../components/AnalyticView";
import TrackingDelivery from "../components/TrackingDelivery";
import DeliveryVehicles from "../components/DeliveryVehicles";
import ShipmentsActivities from "../components/ShipmentsActivities";
import AdminNavbar from "../components/AdminNavbar";
import PieChart from "../components/PieChart";

export default function Dashboard() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* <AdminNavbar /> */}
            <div className="p-60 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-2 gap-10">
                <ShipmentStats />
                <AnalyticView />
                <PieChart/>
                <TrackingDelivery />
                <DeliveryVehicles />
                <ShipmentsActivities />
            </div>
        </div>
    );
}
