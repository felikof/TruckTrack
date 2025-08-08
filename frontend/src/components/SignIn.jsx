import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        mot_de_passe: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();
    const navigateUp = useNavigate();

    const handleSignUp = () => {
        navigateUp("/SignUp");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = formData.mot_de_passe.length >= 8;

        if (!isValid) {
            alert("Mot de passe moins de 8 caractères");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/utilisateurs/connexion", {
                email: formData.email,
                mot_de_passe: formData.mot_de_passe
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            );
            console.log("Connexion réussie :", response.data);
            alert("Connexion réussie !");
            navigate("/UserDashboard"); // Redirection vers la page Dashboard.jsx
        } catch (error) {
            console.error("Erreur de connexion :", error);
            alert("Erreur lors de la connexion !");
        }
    };

    return (
        <div style={{ backgroundImage: `url("/portnight.jpg")`, display: "flex", flexDirection: "column", alignItems: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
            <h2 style={{ color: "white", textAlign: "center" }}>Bienvenue sur Truck-Tracking</h2>
            <p style={{ color: "white", textAlign: "center" }}>Ravie de vous revoir.</p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffefc29a", padding: "30px 100px 10px 100px", borderRadius: "8px", width: "500px", marginTop: "30px" }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} style={inputStyle} />
                    <input type="password" name="mot_de_passe" placeholder="Mot de passe" required value={formData.mot_de_passe} onChange={handleChange} style={inputStyle} />

                    <button type="submit" style={loginButtonStyle}><h2>Se connecter</h2></button>

                    <button type="button" onClick={handleSignUp} style={{ cursor: "pointer", background: "none", border: "none" }}>
                        <h4 style={{ marginTop: "30px", fontSize: "1.1rem", alignItems: "center", textAlign: "center" }}>Vous n'avez pas de compte ?</h4>
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
    margin: "10px 0"
};

const loginButtonStyle = {
    cursor: "pointer",
    width: "300px",
    height: "40px",
    backgroundColor: "#006affff",
    color: "white",
    borderRadius: "30px",
    paddingBottom: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    border: "none",
    textAlign: "center"
};

export default SignIn;
