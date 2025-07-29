import React from "react";
import ShipmentStats from "../components/ShipmentStats";
import AnalyticView from "../components/AnalyticView";
import TrackingDelivery from "../components/TrackingDelivery";
import DeliveryVehicles from "../components/DeliveryVehicles";
import ShipmentsActivities from "../components/ShipmentsActivities";
import PieChart from "../components/PieChart";
import UserDashboard from "../components/UserDashboard";

export default function Dashboard() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* <AdminNavbar /> */}
            <div className="p-60 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-2 gap-10">
                <ShipmentStats />
                <TrackingDelivery />
                <DeliveryVehicles />
                <PieChart/>
                <AnalyticView />
                <ShipmentsActivities />
                {/* <UserDashboard /> */}
            </div>
        </div>
    );
}

// export default function Dashboard() {
//     return (
//         <div className="bg-gray-100 min-h-screen p-4">
//             <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
//                 {/* Première ligne */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2">
//                         <AnalyticView />
//                     </div>
//                     <div className="grid grid-cols-1 gap-6">
//                         <ShipmentStats />
//                         <DeliveryVehicles />
//                     </div>
//                 </div>

//                 {/* Deuxième ligne */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <TrackingDelivery />
//                     <PieChart />
//                     <div className="lg:col-span-2">
//                         <ShipmentsActivities />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default function Dashboard() {
//     return (
//         <div className="bg-gray-100 min-h-screen p-4">
//             {/* <AdminNavbar /> */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {/* Première ligne - Large carte */}
//                 <div className="md:col-span-2 lg:col-span-3">
//                     <ShipmentStats />
//                 </div>

//                 {/* Deuxième ligne - 3 cartes égales */}
//                 <TrackingDelivery />
//                 <div className="grid grid-cols-1 gap-6">
//                     <DeliveryVehicles />
//                     <AnalyticView />
//                 </div>
//                 <PieChart />

//                 {/* Troisième ligne - Full width */}
//                 <div className="md:col-span-2 lg:col-span-3">
//                     <ShipmentsActivities />
//                 </div>
//             </div>
//         </div>
//     );
// }

// Composant Card réutilisable
// const Card = ({ children, className = "" }) => (
//     <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
//         {children}
//     </div>
// );

// export default function Dashboard() {
//     return (
//         <div className="bg-gray-100 min-h-screen p-6 space-y-6">
//             {/* Ligne 1 */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card><AnalyticView /></Card>
//                 <Card><ShipmentStats /></Card>
//             </div>

//             {/* Ligne 2 */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
//                 <Card><DeliveryVehicles /></Card>
//                 <Card><PieChart /></Card>
//                 <Card><TrackingDelivery /></Card>
//             </div>

//             {/* Ligne 3 */}
//             <Card><ShipmentsActivities /></Card>
//         </div>
//     );
// }