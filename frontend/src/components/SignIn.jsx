import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Toast({ message, type, onClose }) {
    return (
        <div className={`toast ${type}`}>
            <span>{type === "success" ? "✓" : "✕"}</span>
            <p>{message}</p>
            <button onClick={onClose} className="toast-close">
                ×
            </button>
        </div>
    );
}

const SignIn = () => {
    const [toast, setToast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };

    const [formData, setFormData] = useState({
        email: "",
        mot_de_passe: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();
    const navigateUp = useNavigate();

    const handleSignUp = () => {
        navigateUp("/SignUp");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const isValid = formData.mot_de_passe.length >= 8;

        if (!isValid) {
            alert("Mot de passe moins de 8 caractères");
            return;
        }

        // try {
        //     const response = await axios.post("http://localhost:8000/utilisateurs/connexion", {
        //         email: formData.email,
        //         mot_de_passe: formData.mot_de_passe
        //     }, {
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     }
        //     );
        //     console.log("Connexion réussie :", response.data);
        //     alert("Connexion réussie !");
        //     navigate("/Booking"); // Redirection vers la page Dashboard.jsx
        // } catch (error) {
        //     console.error("Erreur de connexion :", error);
        //     alert("Erreur lors de la connexion !");
        // }

        try {
            const response = await axios.post(
                "http://localhost:8000/utilisateurs/connexion",
                {
                    email: formData.email,
                    mot_de_passe: formData.mot_de_passe,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 10000, // 10 secondes timeout
                }
            );

            console.log("Connexion réussie :", response.data);
            showToast("Connexion réussie !", "success");

            // Redirection avec délai pour voir le toast
            setTimeout(() => navigate("/Booking"), 1500);
        } catch (error) {
            console.error("Erreur de connexion :", error);

            let errorMessage = "Erreur lors de la connexion";

            if (error.response) {
                // Erreurs spécifiques du serveur
                if (error.response.status === 401) {
                    errorMessage = "Email ou mot de passe incorrect";
                } else if (error.response.status === 500) {
                    errorMessage = "Problème serveur, veuillez réessayer plus tard";
                }
            } else if (error.code === "ECONNABORTED") {
                errorMessage = "Temps d'attente dépassé";
            } else if (error.message === "Network Error") {
                errorMessage = "Problème de connexion internet";
            }

            showToast(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    <div className="login-container">
        <form onSubmit={handleSubmit}>
            {/* Vos champs de formulaire ici */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>
        </form>

        {/* Toast notification */}
        {toast && (
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
            />
        )}
    </div>;

    return (
        <div
            style={{
                minHeight: "100vh",
                minWidth: "100vw",
                position: "fixed",
                top: 0,
                left: 0,
                backgroundImage: `url("/portnight.jpg")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "8px",
                    width: "500px",
                }}
            >
                <h2 style={{ color: "white", textAlign: "center" }}>
                    Bienvenue sur Truck-Tracking
                </h2>
                <p style={{ color: "white", textAlign: "center" }}>
                    Ravie de vous revoir.
                </p>
            </div>

            <div
                style={{
                    backgroundColor: "#ffefc29a",
                    padding: "30px 0px 10px 0px",
                    borderRadius: "8px",
                    width: "500px",
                    marginTop: "30px",
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        name="mot_de_passe"
                        placeholder="Mot de passe"
                        required
                        value={formData.mot_de_passe}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <button type="submit" style={loginButtonStyle}>
                        <h2>Se connecter</h2>
                    </button>

                    <button
                        type="button"
                        onClick={handleSignUp}
                        style={{ cursor: "pointer", background: "none", border: "none" }}
                    >
                        <h4
                            style={{
                                marginTop: "30px",
                                fontSize: "1.1rem",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            Vous n'avez pas de compte ?
                        </h4>
                    </button>
                </form>
            </div>
        </div>
    );
};

const inputStyle = {
    width: "300px",
    height: "40px",
    borderRadius: "5px",
    border: "1px solid blue",
    padding: "10px",
    margin: "10px 0",
};

const loginButtonStyle = {
    cursor: "pointer",
    width: "60%",
    backgroundColor: "#006affff",
    color: "white",
    borderRadius: "30px",
    paddingBottom: "10px",
    paddingTop: "10px",
    marginTop: "10px",
    border: "none",
    textAlign: "center",
    fontSize: "0.8rem",
    transition: "background-color 0.3s ease",
};

export default SignIn;
