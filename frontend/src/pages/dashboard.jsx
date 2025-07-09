import MapView from "../components/MapView";

function Dashboard() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">📡 Suivi en temps réel</h2>

            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 shadow-md rounded-xl overflow-hidden">
                    <MapView />
                </div>

                <div className="bg-white shadow-md p-4 rounded-xl">
                    <h3 className="text-lg font-bold mb-2 text-blue-700">Résumé</h3>
                    <ul className="space-y-1 text-gray-700">
                        <li>✅ Camions actifs : <b>7</b></li>
                        <li>⚠️ Alertes en cours : <b>2</b></li>
                        <li>📅 Réservations aujourd’hui : <b>15</b></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
