const Notifications = ({ items }) => (
    <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Notifications</h2>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
        </div>
        <div className="space-y-3">
            {items.map(item => (
                <div key={item.id} className="border-b pb-3 last:border-0">
                    <p className="text-sm">{item.message}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                </div>
            ))}
        </div>
    </div>
);
export default Notifications;