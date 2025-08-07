import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        mot_de_passe: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();
    const navigateIn = useNavigate();

    const handleSignIn = () => {
        navigateIn("/SignIn");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.mot_de_passe !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/utilisateurs/inscription", {
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                mot_de_passe: formData.mot_de_passe
            }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log("Inscription réussie :", response.data);
            alert("Inscription réussie !");
            navigate("/UserDashboard"); // Redirection vers la page Dashboard.jsx
        } catch (error) {
            console.error("Erreur d’inscription :", error);
            alert("Erreur lors de l’inscription !");
        }
    };

    return (
        <div className="formulaire" style={{ padding: "40px", backgroundImage: `url("/cargo-au-port-de-miami.jpg")`, display: "flex", flexDirection: "column", alignItems: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
            <h2 style={{ color: "white" }}>Bienvenue sur Truck-Tracking</h2>
            <p style={{ color: "white" }}>Veuillez remplir le formulaire ci-dessous pour vous inscrire.</p>

            <div className="form" style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffefc29a", padding: "30px 100px 50px 100px", borderRadius: "8px", width: "500px", marginTop: "30px" }}>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="nom" placeholder="Nom" required value={formData.nom} onChange={handleChange} style={inputStyle} />
                    <input type="text" name="prenom" placeholder="Prénom" required value={formData.prenom} onChange={handleChange} style={inputStyle} />
                    <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} style={inputStyle} />
                    <input type="password" name="mot_de_passe" placeholder="Mot de passe" required value={formData.mot_de_passe} onChange={handleChange} style={inputStyle} />
                    <input type="password" name="confirmPassword" placeholder="Confirmer mot de passe" required value={formData.confirmPassword} onChange={handleChange} style={inputStyle} />

                    <button type="reset" style={resetButtonStyle}>Annuler</button>
                    <button type="submit" style={submitButtonStyle}>Suivant</button>

                    <h4>Avez-vous déjà un compte ? Si oui cliquez
                        <button type="button" onClick={handleSignIn} style={loginButtonStyle}><h2>Se connecter</h2></button>
                    </h4>
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

const resetButtonStyle = {
    cursor: "pointer",
    width: "300px",
    height: "40px",
    backgroundColor: "#bfdaffff",
    color: "white",
    borderRadius: "30px",
    padding: "10px",
    marginTop: "30px",
    marginBottom: "10px"
};

const submitButtonStyle = {
    cursor: "pointer",
    width: "300px",
    height: "40px",
    backgroundColor: "#006affff",
    color: "white",
    borderRadius: "30px",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px"
};

const loginButtonStyle = {
    backgroundColor: "white",
    cursor: "pointer",
    color: "blue",
    marginTop: "20px",
    width: "300px",
    height: "40px",
    borderRadius: "30px"
};

export default SignUp;
