// import React from "react";
// import { useNavigate } from "react-router-dom";


// const PageAcceuil = () => {

//     const navigateUp = useNavigate();
//     const navigateIn = useNavigate();

//     const handleSignUp = () => {
//         navigateUp("/SignUp");
//     }
//     const handleSignIn = () => {
//         navigateIn("/SignIn");
//     }

//     return (
//         <div>
//             <nav style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 40px 10px 40px", backgroundColor: "#f8f9fab5", position: "fixed" }}>
//                 <img src="/icon.webp" alt="Logo" style={{width: "50px", height: "50px"}} />
//                 <ul style={{ display: "flex", gap: "50px", listStyle: "none", marginLeft: "250px"}}>
//                     <li><a href="#" style={{textDecoration: "none"}}>Home</a></li>
//                     <li><a href="#" style={{textDecoration: "none"}}>Nos services</a></li>
//                     <li><a href="#" style={{textDecoration: "none"}}>Cooperation</a></li>
//                     <li><a href="#" style={{textDecoration: "none"}}>Contacts</a></li>
//                 </ul>
//                 <button type="button" onClick={handleSignUp} style={{backgroundColor: "black", color: "white", borderRadius: "10px", padding: "7px 20px 7px 20px", cursor: "pointer", marginRight: "10px"}}>S'inscrire</button>
//             </nav>

//             <section style={{height: "100vh", display: "flex", alignItems: "center", backgroundImage: `url("/vue-aerienne.jpg")`, backgroundSize: "cover", backgroundPosition: "center"}}>
//                 <div style={{ maxWidth: "800px", height: "100%", marginTop: "145px", marginLeft: "60%", textAlign: "center", justifyContent: "center", padding: "150px 20px 0px 20px", backgroundColor: "rgba(0, 0, 0, 0.23)"}}>
//                     <h1 style={{color: "white", fontSize: "3rem"}}>Gestionnaire de flux</h1>
//                     <p style={{color: "white", fontSize: "1.2rem", marginBottom: "20px"}}>
//                         Reservez votre créneau pour effectuer vos opérations au Port Autonome de Lomé en toute fluidité.
//                     </p>
//                     <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
//                         <button type="button" onClick={handleSignIn} style={{backgroundColor: "blue", width: "180px", padding: "15px 10px 15px 10px", border: "none", color: "white", fontSize: "1rem", borderRadius: "10px", cursor: "pointer"}}>Reserver un créneau</button>
//                     </div>
//                 </div>
//             </section>

//             {/* Images Section */}
//             <section className="py-12 px-6">
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//                     <img src="/vue-aerienne.jpg" alt="Container 1" style={{width: "33%", height: "auto"}} />
//                     <img src="/portnight.jpg" alt="Container 2" style={{width: "33%", height: "auto"}} />
//                     <img src="/container1.png" alt="Container 3" style={{width: "33%", height: "auto"}} />
//                 </div>
//             </section>

//             {/* Our Story */}
//             <section className="bg-gray-100 py-12 px-6">
//                 <h2 className="text-3xl font-bold text-center mb-6">Our Story</h2>
//                 <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
//                     Norea company is a team of high-level professionals with extensive experience in warehouse, transport and customs logistics.
//                 </p>
//             </section>

//             {/* Parameters */}
//             <section className="py-12 px-6">
//                 <h2 className="text-3xl font-bold text-center mb-8">Parameters</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     <div className="text-center">
//                         <img src="/man2.jpg" alt="External dimensions" style={{width: "50%", height: "auto"}} />
//                         <p className="text-gray-600">External container dimensions</p>
//                     </div>
//                     <div className="text-center">
//                         <img src="/container2.jpg" alt="Internal layout" style={{width: "50%", height: "100%"}} />
//                         <p className="text-gray-600">Internal layout</p>
//                     </div>
//                     <div className="text-center">
//                         <img src="/man3.jpg" alt="Modern container" style={{width: "50%", height: "auto"}} />
//                         <p className="text-gray-600">Modern container up to 4 cars</p>
//                     </div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="bg-gray-900 text-white text-center py-6">
//                 &copy; 2025 Norea Company - All rights reserved.
//             </footer>
//         </div>
//     );
// };

// export default PageAcceuil;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PageAcceuil = () => {
//     const navigateUp = useNavigate();
//     const navigateIn = useNavigate();

//     const handleSignUp = () => {
//         navigateUp("/SignUp");
//     };
//     const handleSignIn = () => {
//         navigateIn("/SignIn");
//     };

//     return (
//         <div>
//             {/* Navbar */}
//             <nav style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "10px 40px",
//                 backgroundColor: "#f8f9fab5",
//                 position: "fixed",
//                 zIndex: 100
//             }}>
//                 <img src="/icon.webp" alt="Logo" style={{ width: "50px", height: "50px" }} />
//                 <ul style={{
//                     display: "flex",
//                     gap: "50px",
//                     listStyle: "none",
//                     marginLeft: "250px"
//                 }}>
//                     <li><a href="#" style={{ textDecoration: "none" }}>Home</a></li>
//                     <li><a href="#services" style={{ textDecoration: "none" }}>Nos services</a></li>
//                     <li><a href="#cooperations" style={{ textDecoration: "none" }}>Cooperation</a></li>
//                     <li><a href="#contacts" style={{ textDecoration: "none" }}>Contacts</a></li>
//                 </ul>
//                 <button
//                     type="button"
//                     onClick={handleSignUp}
//                     style={{
//                         backgroundColor: "black",
//                         color: "white",
//                         borderRadius: "10px",
//                         padding: "7px 20px",
//                         cursor: "pointer",
//                         marginRight: "10px"
//                     }}
//                 >
//                     S'inscrire
//                 </button>
//             </nav>

//             {/* Hero Section */}
//             <section style={{
//                 height: "100vh",
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundImage: `url("/vue-aerienne.jpg")`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center"
//             }}>
//                 <div style={{
//                     maxWidth: "800px",
//                     height: "100%",
//                     marginTop: "145px",
//                     marginLeft: "60%",
//                     textAlign: "center",
//                     justifyContent: "center",
//                     padding: "150px 20px 0px 20px",
//                     backgroundColor: "rgba(0, 0, 0, 0.23)"
//                 }}>
//                     <h1 style={{ color: "white", fontSize: "3rem" }}>Gestionnaire de flux</h1>
//                     <p style={{
//                         color: "white",
//                         fontSize: "1.2rem",
//                         marginBottom: "20px"
//                     }}>
//                         Réservez votre créneau pour effectuer vos opérations au Port Autonome de Lomé en toute fluidité.
//                     </p>
//                     <div style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: "20px",
//                         marginTop: "20px"
//                     }}>
//                         <button
//                             type="button"
//                             onClick={handleSignIn}
//                             style={{
//                                 backgroundColor: "blue",
//                                 width: "180px",
//                                 padding: "15px 10px",
//                                 border: "none",
//                                 color: "white",
//                                 fontSize: "1rem",
//                                 borderRadius: "10px",
//                                 cursor: "pointer"
//                             }}
//                         >
//                             Réserver un créneau
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             {/* Images Section */}
//             <section className="py-12 px-6">
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//                     <img src="/vue-aerienne.jpg" alt="Container 1" style={{ width: "33%", height: "auto" }} />
//                     <img src="/portnight.jpg" alt="Container 2" style={{ width: "33%", height: "auto" }} />
//                     <img src="/container1.png" alt="Container 3" style={{ width: "33%", height: "auto" }} />
//                 </div>
//             </section>

//             {/* Our Story */}
//             <section className="bg-gray-100 py-12 px-6">
//                 <h2 className="text-3xl font-bold text-center mb-6">Our Story</h2>
//                 <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
//                     Norea company is a team of high-level professionals with extensive experience in warehouse, transport and customs logistics.
//                 </p>
//             </section>

//             {/* Nos Services */}
//             <section id="services" className="py-12 px-6 bg-white">
//                 <h2 className="text-3xl font-bold text-center mb-8">Nos services</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//                     <div>
//                         <h3 className="font-bold text-xl">Réservation de créneaux</h3>
//                         <p>Planifiez vos opérations portuaires et évitez les congestions.</p>
//                     </div>
//                     <div>
//                         <h3 className="font-bold text-xl">Suivi en temps réel</h3>
//                         <p>Visualisez la position des camions, conteneurs et navires.</p>
//                     </div>
//                     <div>
//                         <h3 className="font-bold text-xl">Gestion des documents</h3>
//                         <p>Chargez et validez vos documents logistiques en ligne.</p>
//                     </div>
//                     <div>
//                         <h3 className="font-bold text-xl">Alertes et notifications</h3>
//                         <p>Recevez des alertes en cas de retard ou d’incident.</p>
//                     </div>
//                     <div>
//                         <h3 className="font-bold text-xl">Tableaux de bord analytiques</h3>
//                         <p>Analysez vos données et optimisez vos opérations.</p>
//                     </div>
//                 </div>
//             </section>

//             {/* Cooperations */}
//             <section id="cooperations" className="py-12 px-6 bg-gray-50">
//                 <h2 className="text-3xl font-bold text-center mb-8">Cooperations</h2>
//                 <ul className="max-w-4xl mx-auto text-lg text-gray-700 list-disc list-inside">
//                     <li><strong>Port Autonome de Lomé</strong> – Partenaire principal pour la gestion des flux.</li>
//                     <li><strong>Compagnies maritimes</strong> – Coordination des arrivées et départs.</li>
//                     <li><strong>Transporteurs routiers</strong> – Optimisation des livraisons et enlèvements.</li>
//                     <li><strong>Services de douane</strong> – Accélération des formalités administratives.</li>
//                     <li><strong>Zones franches & entrepôts</strong> – Stockage et distribution optimisés.</li>
//                 </ul>
//             </section>

//             {/* Parameters */}
//             <section className="py-12 px-6">
//                 <h2 className="text-3xl font-bold text-center mb-8">Parameters</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     <div className="text-center">
//                         <img src="/man2.jpg" alt="External dimensions" style={{ width: "50%", height: "auto" }} />
//                         <p className="text-gray-600">External container dimensions</p>
//                     </div>
//                     <div className="text-center">
//                         <img src="/container2.jpg" alt="Internal layout" style={{ width: "50%", height: "100%" }} />
//                         <p className="text-gray-600">Internal layout</p>
//                     </div>
//                     <div className="text-center">
//                         <img src="/man3.jpg" alt="Modern container" style={{ width: "50%", height: "auto" }} />
//                         <p className="text-gray-600">Modern container up to 4 cars</p>
//                     </div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="bg-gray-900 text-white text-center py-6">
//                 &copy; 2025 Norea Company - All rights reserved.
//             </footer>
//         </div>
//     );
// };

// export default PageAcceuil;

import React from "react";
import { useNavigate } from "react-router-dom";

const PageAcceuil = () => {
    const navigateUp = useNavigate();
    const navigateIn = useNavigate();

    const handleSignUp = () => navigateUp("/SignUp");
    const handleSignIn = () => navigateIn("/SignIn");

    const styles = {
        nav: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 50px",
            background: "rgba(10, 10, 25, 0.9)",
            backdropFilter: "blur(8px)",
            position: "fixed",
            top: 0,
            zIndex: 1000,
            boxShadow: "0 4px 20px rgba(0, 255, 255, 0.2)",
        },
        navList: {
            display: "flex",
            gap: "50px",
            listStyle: "none",
            marginLeft: "250px",
        },
        navLink: {
            textDecoration: "none",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "0.3s ease",
        },
        hero: {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            backgroundImage: `url("/vue-aerienne.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginTop: "60px",
            position: "relative",
        },
        heroOverlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
        },
        heroContent: {
            position: "relative",
            maxWidth: "800px",
            marginLeft: "60%",
            textAlign: "center",
            padding: "150px 20px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 1.5s ease-in-out",
        },
        heroTitle: {
            color: "#00f7ff",
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "0 0 15px rgba(0, 255, 255, 0.8)",
        },
        heroText: {
            color: "white",
            fontSize: "1.2rem",
            marginBottom: "20px",
            lineHeight: "1.5",
        },
        buttonPrimary: {
            backgroundColor: "#00d4ff",
            width: "200px",
            padding: "15px",
            border: "none",
            color: "black",
            fontSize: "1rem",
            fontWeight: "600",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "0.3s ease",
            boxShadow: "0 0 15px rgba(0, 212, 255, 0.7)",
        },
        section: {
            padding: "60px 20px",
            animation: "fadeUp 1s ease-in-out",
        },
        sectionTitle: {
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
            color: "#00f7ff",
            textShadow: "0 0 10px rgba(0,255,255,0.5)",
        },
        grid3: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            justifyItems: "center",
        },
        gridImage: {
            width: "100%",
            borderRadius: "10px",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
        },
        footer: {
            backgroundColor: "#0f0f1e",
            color: "white",
            textAlign: "center",
            padding: "20px 0",
            boxShadow: "0 -4px 20px rgba(0,255,255,0.2)",
        },
    };

    return (
        <div>
            {/* Navbar */}
            <nav style={styles.nav}>
                <img src="/icon.webp" alt="Logo" style={{ width: "50px", height: "50px" }} />
                <ul style={styles.navList}>
                    {["Home", "Nos services", "Cooperation", "Contacts"].map((item, idx) => (
                        <li key={idx}>
                            <a
                                href="#"
                                style={styles.navLink}
                                onMouseOver={(e) => (e.target.style.color = "#00d4ff")}
                                onMouseOut={(e) => (e.target.style.color = "#fff")}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    onClick={handleSignUp}
                    style={{ ...styles.buttonPrimary, backgroundColor: "#ff0066", color: "white", width: "150px" }}
                    onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                    S'inscrire
                </button>
            </nav>

            {/* Hero */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}></div>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>Gestionnaire de flux</h1>
                    <p style={styles.heroText}>
                        Réservez votre créneau pour effectuer vos opérations au Port Autonome de Lomé en toute fluidité.
                    </p>
                    <button
                        type="button"
                        onClick={handleSignIn}
                        style={styles.buttonPrimary}
                        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                        Réserver un créneau
                    </button>
                </div>
            </section>

            {/* Images */}
            <section style={styles.section}>
                <div style={styles.grid3}>
                    {["/vue-aerienne.jpg", "/portnight.jpg", "/container1.png"].map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Container ${idx + 1}`}
                            style={styles.gridImage}
                            onMouseOver={(e) => {
                                e.target.style.transform = "scale(1.05)";
                                e.target.style.boxShadow = "0 0 20px rgba(0,255,255,0.6)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                    ))}
                </div>
            </section>
            
            {/* Our Story */}
            <section style={{ ...styles.section, backgroundColor: "#f0f0f0" }}>
                <h2 style={styles.sectionTitle}>Our Story</h2>
                <p style={{ textAlign: "center", color: "#333", fontSize: "1.2rem" }}>
                    Norea company is a team of high-level professionals with extensive experience in warehouse, transport and customs logistics.
                </p>
            </section>

            {/* Nos Services */}
            <section
                id="services"
                style={{
                    ...styles.section,
                    background: "linear-gradient(90deg, #f8fafc 60%, #e0f7fa 100%)",
                    boxShadow: "0 2px 16px rgba(0,247,255,0.07)",
                    borderRadius: "12px",
                    margin: "40px 0"
                }}
            >
                <h2 style={styles.sectionTitle}>Nos services</h2>
                <div style={{
                    ...styles.grid3,
                    gap: "30px",
                    marginTop: "30px"
                }}>
                    {[
                        {
                            title: "Réservation de créneaux",
                            desc: "Planifiez vos opérations portuaires et évitez les congestions.",
                            icon: "📅"
                        },
                        {
                            title: "Suivi en temps réel",
                            desc: "Visualisez la position des camions, conteneurs et navires.",
                            icon: "📡"
                        },
                        {
                            title: "Alertes et notifications",
                            desc: "Recevez des alertes en cas de retard ou d’incident.",
                            icon: "🔔"
                        },
                        {
                            title: "Tableaux de bord analytiques",
                            desc: "Analysez vos données et optimisez vos opérations.",
                            icon: "📊"
                        }
                    ].map((service, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: "rgba(0,247,255,0.07)",
                                borderRadius: "12px",
                                padding: "32px 18px",
                                boxShadow: "0 2px 12px rgba(0,212,255,0.08)",
                                minHeight: "180px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.transform = "translateY(-8px) scale(1.04)";
                                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,212,255,0.18)";
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,212,255,0.08)";
                            }}
                        >
                            <div style={{
                                fontSize: "2.5rem",
                                marginBottom: "18px",
                                color: "#00d4ff",
                                filter: "drop-shadow(0 0 8px #00f7ff88)"
                            }}>
                                {service.icon}
                            </div>
                            <h3 style={{
                                fontWeight: "bold",
                                fontSize: "1.25rem",
                                marginBottom: "10px",
                                color: "#0a2233"
                            }}>
                                {service.title}
                            </h3>
                            <p style={{
                                color: "#333",
                                fontSize: "1rem",
                                lineHeight: "1.5"
                            }}>
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="cooperations" style={{ ...styles.section, backgroundColor: "#f8fafc" }}>
                <h2 style={styles.sectionTitle}>Cooperations</h2>
                <ul style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    fontSize: "1.15rem",
                    color: "#222",
                    listStyle: "disc inside",
                    background: "rgba(0,247,255,0.07)",
                    borderRadius: "10px",
                    padding: "30px 30px 30px 50px",
                    boxShadow: "0 2px 12px rgba(0,212,255,0.08)"
                }}>
                    <li><strong>Port Autonome de Lomé</strong> – Partenaire principal pour la gestion des flux.</li>
                    <li><strong>Compagnies maritimes</strong> – Coordination des arrivées et départs.</li>
                    <li><strong>Transporteurs routiers</strong> – Optimisation des livraisons et enlèvements.</li>
                    <li><strong>Services de douane</strong> – Accélération des formalités administratives.</li>
                    <li><strong>Zones franches & entrepôts</strong> – Stockage et distribution optimisés.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Parameters</h2>
                <div style={styles.grid3}>
                    {["/man2.jpg", "/container2.jpg", "/man3.jpg"].map((img, idx) => (
                        <div key={idx} style={{ textAlign: "center" }}>
                            <img src={img} alt={`Parameter ${idx + 1}`} style={{ width: "50%", height: "auto" }} />
                            <p style={{ color: "#666", marginTop: "10px" }}>
                                {idx === 0 ? "External container dimensions" : idx === 1 ? "Internal layout" : "Modern container up to 4 cars"}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                &copy; 2025 Truck Tracking - All rights reserved.
            </footer>
        </div>
    );
};

export default PageAcceuil;