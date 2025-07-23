import React from "react";
import "/src/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">🚛 PortAI Dashboard</div>
            <ul className="navbar-links">
                <li>Accueil</li>
                <li>Statistiques</li>
                <li>Alertes</li>
                <li>Paramètres</li>
            </ul>
        </nav>
    );
};

export default Navbar;
