import Notifications from './Notifications';
import ShipmentTracking from './ShipmentTracking';
import UserProfile from './UserProfile';

const UserDashboard = () => {
    // Données simulées
    const userData = {
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        membership: "Premium",
        joinDate: "15/03/2022"
    };

    const shipments = [
        { id: "TRK-789456", status: "En transit", estimate: "20/05/2023" },
        { id: "TRK-123456", status: "Livré", estimate: "10/05/2023" }
    ];

    const notifications = [
        { id: 1, message: "Votre colis TRK-789456 est en route", time: "2h ago" },
        { id: 2, message: "Livraison TRK-123456 complétée", time: "1j ago" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Mon Espace Client</h1>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <div className="relative">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="User profile"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne gauche - Profil */}
                    <div className="lg:col-span-1">
                        <UserProfile user={userData} />
                    </div>

                    {/* Colonne centrale - Suivi */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Section Statistiques */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium mb-4">Mes Statistiques</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-blue-600">Colis envoyés</p>
                                    <p className="text-2xl font-bold">24</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-green-600">Livraisons réussies</p>
                                    <p className="text-2xl font-bold">22</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <p className="text-sm text-yellow-600">En cours</p>
                                    <p className="text-2xl font-bold">2</p>
                                </div>
                            </div>
                        </div>

                        {/* Section Suivi */}
                        <ShipmentTracking shipments={shipments} />
                    </div>

                    {/* Colonne droite - Notifications (sur grands écrans) */}
                    <div className="lg:col-span-3 xl:col-span-1 xl:row-span-2">
                        <Notifications items={notifications} />
                    </div>
                </div>

                {/* Section Historique (pleine largeur) */}
                <div className="mt-8 bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Historique des Livraisons</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° de Suivi</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {shipments.map((shipment) => (
                                    <tr key={shipment.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${shipment.status === 'Livré' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {shipment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.estimate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="text-blue-600 hover:text-blue-900">Détails</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;