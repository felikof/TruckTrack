import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-900 text-red p-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">🚛 TruckTrack - PAL</h1>
            <div className="space-x-6">
                <Link to="/" className="hover:text-yellow-300">Dashboard</Link>
                <Link to="/creneaux" className="hover:text-yellow-300">Réservations</Link>
                <Link to="/alertes" className="hover:text-yellow-300">Alertes</Link>
            </div>
        </nav>
    );
}

export default Navbar;
