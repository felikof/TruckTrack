// import { useNavigate } from 'react-router-dom';

// const PageAcceuil = () => {

//     return (
//         <div className="formulaire" style={{ padding: "40px", backgroundImage: `url("/vue-aerienne.jpg")`, display: "flex", flexDirection: "column", alignItems: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
//             <h2 style={{ color: "white" }}>Bienvenue sur Truck-Tracking</h2>
//             <p style={{ color: "white" }}>Veuillez remplir le formulaire ci-dessous pour vous inscrire.</p>

//             <div className="form" style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffefc29a", padding: "30px 100px 50px 100px", borderRadius: "8px", width: "500px", marginTop: "30px" }}>


//             </div>

//         </div>
//     );
// };
// export default PageAcceuil;

import React from "react";
import '/src/PageAcceuil.css';

const PageAcceuil = () => {
    return (
        <div className="bg-white text-gray-800 font-sans">

            {/* Navbar */}
            <nav className="flex justify-between items-center bg-white shadow-md px-6 py-4">
                <img src="/assets/logo.png" alt="Logo" className="h-10" />
                <ul className="flex space-x-6 text-blue-600 font-semibold">
                    <li><a href="#" className="hover:underline">Our Services</a></li>
                    <li><a href="#" className="hover:underline">Cooperation</a></li>
                    <li><a href="#" className="hover:underline">Contacts</a></li>
                </ul>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Contact Us</button>
            </nav>

            {/* Hero Section */}
            <section
                className="bg-cover bg-center text-white py-32 text-center"
                style={{ backgroundImage: "url('/vue-aerienne.jpg')", backgroundSize: "1270px", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
            >
                <div className="bg-black/50 p-10 rounded-lg inline-block text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Transportation of Cars</h1>
                    <p className="text-lg mb-6 text-white">
                        Transportation of cars by sea container has an undeniable advantage over others.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Start Transportation</button>
                        <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-blue-600 transition text-white">Explore More</button>
                    </div>
                </div>
            </section>

            {/* Images Section */}
            <section className="py-12 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <img src="/vue-aerienne.jpg" alt="Container 1" className="rounded shadow-md" />
                    <img src="/assets/container2.jpg" alt="Container 2" className="rounded shadow-md" />
                    <img src="/assets/container3.jpg" alt="Container 3" className="rounded shadow-md" />
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-gray-100 py-12 px-6">
                <h2 className="text-3xl font-bold text-center mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
                    Norea company is a team of high-level professionals with extensive experience in warehouse, transport and customs logistics.
                </p>
            </section>

            {/* Parameters */}
            <section className="py-12 px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Parameters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <img src="/assets/param1.jpg" alt="External dimensions" className="rounded shadow mb-2 mx-auto" />
                        <p className="text-gray-600">External container dimensions</p>
                    </div>
                    <div className="text-center">
                        <img src="/assets/param2.jpg" alt="Internal layout" className="rounded shadow mb-2 mx-auto" />
                        <p className="text-gray-600">Internal layout</p>
                    </div>
                    <div className="text-center">
                        <img src="/assets/param3.jpg" alt="Modern container" className="rounded shadow mb-2 mx-auto" />
                        <p className="text-gray-600">Modern container up to 4 cars</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6">
                &copy; 2025 Norea Company - All rights reserved.
            </footer>
        </div>
    );
};

export default PageAcceuil;
