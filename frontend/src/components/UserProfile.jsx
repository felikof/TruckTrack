const UserProfile = ({ user }) => (
    <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
            <img
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
            />
            <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
            </div>
        </div>
        <div className="space-y-2">
            <p><span className="font-medium">Membre depuis:</span> {user.joinDate}</p>
            <p>
                <span className="font-medium">Statut:</span>
                <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {user.membership}
                </span>
            </p>
        </div>
    </div>
);
export default UserProfile;