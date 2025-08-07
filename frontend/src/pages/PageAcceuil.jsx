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
import { useNavigate } from "react-router-dom";


const PageAcceuil = () => {

    const navigateUp = useNavigate();
    const navigateIn = useNavigate();

    const handleSignUp = () => {
        navigateUp("/SignUp");
    }
    const handleSignIn = () => {
        navigateIn("/SignIn");
    }

    return (
        <div>
            <nav style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 40px 10px 40px", backgroundColor: "#f8f9fab5", position: "fixed" }}>
                <img src="/icon.webp" alt="Logo" style={{width: "50px", height: "50px"}} />
                <ul style={{ display: "flex", gap: "50px", listStyle: "none", marginLeft: "250px" }}>
                    <li><a href="#" className="hover:underline">Home</a></li>
                    <li><a href="#" className="hover:underline">Nos services</a></li>
                    <li><a href="#" className="hover:underline">Cooperation</a></li>
                    <li><a href="#" className="hover:underline">Contacts</a></li>
                </ul>
                <button type="button" onClick={handleSignUp} style={{backgroundColor: "black", color: "white", borderRadius: "10px", padding: "7px 20px 7px 20px", cursor: "pointer", marginRight: "10px"}}>S'inscrire</button>
            </nav>

            <section style={{height: "100vh", display: "flex", alignItems: "center", backgroundImage: `url("/vue-aerienne.jpg")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <div style={{ maxWidth: "800px", height: "100%", marginTop: "140px", marginLeft: "60%", textAlign: "center", justifyContent: "center", padding: "150px 20px 0px 20px", backgroundColor: "rgba(0, 0, 0, 0.23)"}}>
                    <h1 style={{color: "white", fontSize: "3rem"}}>Gestionnaire de flux</h1>
                    <p style={{color: "white", fontSize: "1.2rem", marginBottom: "20px"}}>
                        Reservez votre créneau pour effectuer vos opérations au Port Autonome de Lomé en toute fluidité.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
                        <button type="button" onClick={handleSignIn} style={{backgroundColor: "blue", width: "180px", padding: "15px 10px 15px 10px", border: "none", color: "white", fontSize: "1rem", borderRadius: "10px", cursor: "pointer"}}>Reserver un créneau</button>
                        {/* <button style={{backgroundColor: "transparent", width: "180px", padding: "15px 10px 15px 10px", border: "none", color: "white", fontSize: "1rem", cursor: "pointer"}}>Explore More</button> */}
                    </div>
                </div>
            </section>

            {/* Images Section */}
            <section className="py-12 px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <img src="/vue-aerienne.jpg" alt="Container 1" style={{width: "33%", height: "auto"}} />
                    <img src="/portnight.jpg" alt="Container 2" style={{width: "33%", height: "auto"}} />
                    <img src="/container1.png" alt="Container 3" style={{width: "33%", height: "auto"}} />
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
                        <img src="/man2.jpg" alt="External dimensions" style={{width: "50%", height: "auto"}} />
                        <p className="text-gray-600">External container dimensions</p>
                    </div>
                    <div className="text-center">
                        <img src="/container2.jpg" alt="Internal layout" style={{width: "50%", height: "100%"}} />
                        <p className="text-gray-600">Internal layout</p>
                    </div>
                    <div className="text-center">
                        <img src="/man3.jpg" alt="Modern container" style={{width: "50%", height: "auto"}} />
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
