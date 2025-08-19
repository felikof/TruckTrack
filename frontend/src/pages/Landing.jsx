import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/Landing.css";

function Landing() {
    const navigateUp = useNavigate();
    const navigateIn = useNavigate();

    const handleSignUp = () => {
        navigateUp("/SignUp");
    }
    const handleSignIn = () => {
        navigateIn("/SignIn");
    }
    const [benefits, setBenefits] = useState({
        timeReduction: 0,
        costSavings: 0,
        efficiency: 0,
        satisfaction: 0,
    });

    // Animation des compteurs au chargement de la page
    useEffect(() => {
        const timer = setTimeout(() => {
            setBenefits({
                timeReduction: 65,
                costSavings: 40,
                efficiency: 85,
                satisfaction: 95,
            });
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white text-slate-800 shadow-lg border-b" style={{ position: "fixed", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.93)" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-blue-600">Truck Tracking</h1>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a
                                    href="#features"
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                                    style={{ textDecoration: "none" }}
                                >
                                    Fonctionnalités
                                </a>
                                <a
                                    href="#benefits"
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                                    style={{ textDecoration: "none" }}
                                >
                                    Avantages
                                </a>
                                <a
                                    href="#testimonials"
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                                    style={{ textDecoration: "none" }}
                                >
                                    Témoignages
                                </a>
                                <a
                                    href="#pricing"
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                                    style={{ textDecoration: "none" }}
                                >
                                    Tarifs
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="button" onClick={handleSignIn} className="text-slate-600 hover:text-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{ backgroundColor: "blue", color: "white", borderRadius: "5px" }}>
                                Connexion
                            </button>
                            <button type="button" onClick={handleSignUp} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: "orange", borderRadius: "5px" }}>
                                Commencer
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Section Hero */}
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" style={{ backgroundImage: "url('/vue-aerienne.jpg')", backgroundSize: "cover", width: "100%", height: "90vh" }}>
                    <div className="text-center" style={{ color: "white", paddingTop: "50px", paddingBottom: "80px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <h1 className="text-4xl md:text-6xl font-semibold mb-6 animate-fade-in">
                            Transformez Vos Opérations Portuaires
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto" style={{ color: "#ff9d2dff" }}>
                            Réduisez les coûts, éliminez les retards et boostez l'efficacité avec
                            la plateforme leader de gestion du trafic camions utilisée par les ports
                            du monde entier.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button type="button" onClick={handleSignIn} className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 shadow-lg" style={{ width: "250px", height: "50px", marginTop: "20px" }}>
                                Réservez un Créneau
                            </button>
                            {/* <button className="border-2 border-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-lg text-lg font-medium transition-all">
                                Démo Programmé
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Avantages */}
            <div className="bg-white shadow-lg -mt-16 mx-4 sm:mx-8 lg:mx-16 rounded-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
                    <div className="p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 counter">
                            {benefits.timeReduction}%
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Réduction de Temps</div>
                    </div>
                    <div className="p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 counter">
                            {benefits.costSavings}%
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Économies</div>
                    </div>
                    <div className="p-6 text-center">
                        <div className="text-3xl font-bold text-indigo-600 counter">
                            {benefits.efficiency}%
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Gain d'Efficacité</div>
                    </div>
                    <div className="p-6 text-center">
                        <div className="text-3xl font-bold text-orange-600 counter">
                            {benefits.satisfaction}%
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                            Satisfaction Clients
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Fonctionnalités */}
            <div
                id="features"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Tout Ce Dont Vous Avez Besoin Pour Optimiser Vos Opérations Portuaires
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Notre plateforme complète fournit des résultats mesurables dès le premier jour,
                        vous aidant à réduire les coûts et améliorer l'efficacité.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Service 1 - Réservation de Créneaux */}
                    <div
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
                        style={{ backgroundImage: "url('/creneau.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <div className="p-8" style={{ padding: "35px", backgroundColor: "#454545a7", color: "white" }}>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                📅
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4" style={{ color: "white" }}>
                                Réservation de Créneaux
                            </h3>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed" style={{ color: "white" }}>
                                Éliminez les temps d'attente et réduisez les coûts opérationnels avec un système de réservation intelligent qui optimise l'emploi du temps de votre flotte.
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Réduction de 70% des attentes
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Réservation en ligne 24/7
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Confirmations automatisées
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Service 2 - Suivi en Temps Réel */}
                    <div
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
                        style={{ backgroundImage: "url('/creneau.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <div className="p-8" style={{ padding: "48px", backgroundColor: "#454545a7", color: "white" }}>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                📍
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4" style={{ color: "white" }}>
                                Suivi en Temps Réel
                            </h3>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed" style={{ color: "white" }}>
                                Obtenez une visibilité complète de votre flotte avec un suivi GPS précis et des estimations d'arrivée prédictives.
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Visibilité en direct de la flotte
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Estimations d'arrivée prédictives
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Optimisation d'itinéraire
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Service 3 - Notifications Intelligentes */}
                    <div
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
                        style={{ backgroundImage: "url('/creneau.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <div className="p-8" style={{ padding: "35px", backgroundColor: "#454545a7", color: "white" }}>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                🔔
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4" style={{ color: "white" }}>
                                Notifications Intelligentes
                            </h3>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed" style={{ color: "white" }}>
                                Ne manquez jamais les mises à jour critiques avec des alertes intelligentes qui maintiennent le bon fonctionnement de vos opérations.
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Alertes instantanées
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Notifications personnalisables
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Livraison multi-canaux
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Service 4 - Tableau de Bord Analytique */}
                    <div
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
                        style={{ backgroundImage: "url('/creneau.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <div className="p-8" style={{ padding: "48px", backgroundColor: "#454545a7", color: "white" }}>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                📊
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4" style={{ color: "white" }}>
                                Tableau de Bord Analytique
                            </h3>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed" style={{ color: "white" }}>
                                Prenez des décisions éclairées avec des insights complets sur vos opérations portuaires et vos indicateurs de performance.
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Insights en temps réel
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Métriques de performance
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Rapports personnalisés
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Témoignages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Témoignage 1 - Sarah Chen */}
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow" style={{ padding: "20px", marginRight: "60px", marginLeft: "60px" }}>
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ width: "50px", height: "50px", marginRight: "20px" }}>
                            SC
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">
                                Sarah Chen
                            </h4>
                            <p className="text-sm text-gray-600">Responsable des Opérations</p>
                            <p className="text-sm text-blue-600 font-medium">
                                Pacific Logistics
                            </p>
                        </div>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">
                        "Truck-Tracking a réduit notre temps moyen de rotation portuaire de 3 heures. Le ROI a été immédiat."
                    </p>
                    <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐</div>
                </div>

                {/* Témoignage 2 - Michael Rodriguez */}
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow" style={{ padding: "20px", marginRight: "60px", marginLeft: "60px" }}>
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ width: "50px", height: "50px", marginRight: "20px" }}>
                            MR
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">
                                Michael Rodriguez
                            </h4>
                            <p className="text-sm text-gray-600">Directeur de Flotte</p>
                            <p className="text-sm text-blue-600 font-medium">
                                Harbor Transport Co.
                            </p>
                        </div>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">
                        "La fonctionnalité de suivi en temps réel nous a fait économiser 50 000 F CFA en coûts opérationnels le trimestre dernier."
                    </p>
                    <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
                </div>

                {/* Témoignage 3 - Jennifer Park */}
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow" style={{ padding: "20px", marginRight: "60px", marginLeft: "60px", marginBottom: "60px" }}>
                    <div className="flex items-center mb-4">
                        <div className="w-30 h-30 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ width: "50px", height: "50px", marginRight: "20px" }}>
                            JP
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">
                                Jennifer Park
                            </h4>
                            <p className="text-sm text-gray-600">Coordinatrice Logistique</p>
                            <p className="text-sm text-blue-600 font-medium">
                                Coastal Shipping
                            </p>
                        </div>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">
                        "Nos chauffeurs adorent le système de réservation de créneaux. Plus d'attente dans les longues files."
                    </p>
                    <div className="flex text-yellow-400 mt-4">⭐⭐⭐</div>
                </div>
            </div>

            {/* Section CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20" style={{ background: "linear-gradient(to right, #3b82f6, #10b981)" }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Prêt à Transformer Vos Opérations Portuaires ?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Rejoignez des centaines de ports dans le monde qui font confiance à Truck-Tracking pour optimiser
                        leur gestion du trafic camions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button type="button" onClick={handleSignIn} className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 shadow-lg" style={{ width: "250px", height: "50px" }}>
                            Réservez un Créneau
                        </button>
                        <button type="button" onClick={handleSignUp} className="border-2 border-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg text-lg font-medium transition-all">
                            S'inscrire
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-blue-500">
                        <div className="text-center" style={{ marginTop: "20px" }}>
                            <div className="text-2xl font-bold mb-2">500+</div>
                            <div className="text-blue-200">Ports dans le Monde</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold mb-2">2M+</div>
                            <div className="text-blue-200">Camions Gérés</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold mb-2">99.9%</div>
                            <div className="text-blue-200">Disponibilité</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pied de Page */}
            <footer className="bg-slate-900 text-white py-16" style={{ backgroundColor: "#000000ff" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ color: "white" }}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-blue-400 mb-4">
                                Truck-Tracking
                            </h3>
                            <p className="text-gray-300 mb-4">
                                La plateforme leader de gestion du trafic camions pour les ports
                                et terminaux dans le monde.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Produit</h4>
                            <ul className="space-y-2 text-black-300">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Réservation de Créneaux
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Suivi en Temps Réel
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Notifications Intelligentes
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Analytiques
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Entreprise</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        À Propos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Carrières
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Presse
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Partenaires
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Ressources</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Contactez-nous
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Centre d'Aide
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                                        Sécurité
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-center">
                        <p className="text-gray-400 text-sm text-center">
                            &copy; 2025 Truck-Tracking. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Landing;