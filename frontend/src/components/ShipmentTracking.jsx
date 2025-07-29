const ShipmentTracking = ({ shipments }) => (
    <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Suivi des Colis</h2>
        <div className="space-y-4">
            {shipments.map(shipment => (
                <div key={shipment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                        <span className="font-medium">{shipment.id}</span>
                        <span className={`text-sm px-2 py-1 rounded-full 
                            ${shipment.status === 'Livré' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {shipment.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">Estimation: {shipment.estimate}</p>
                    <button className="mt-2 text-sm text-blue-600 hover:underline">
                        Voir le détail
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default ShipmentTracking;