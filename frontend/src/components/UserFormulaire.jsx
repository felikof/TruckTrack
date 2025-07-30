import React from "react";

const Formulaire = () => {
    return (
        <div className="formulaire" style={{padding: "40px", backgroundImage: `url("/cargo-au-port-de-miami.jpg")`, display: "flex", flexDirection: "column", alignItems: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
            <h2>Inscription</h2>
            <p>Veuillez remplir le formulaire ci-dessous pour vous inscrire.</p>

            <div className="form" style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffefc29a", padding: "50px", borderRadius: "8px", width: "500px" }}>

                <form>
                {/* <label htmlFor="name">Nom:</label> */}
                <input type="text" id="name" name="name" placeholder="Nom" required style={{width: "300px", height: "40px", borderRadius: "5px", border: "1px solid blue", padding: "10px", marginBottom: "10px"}}/><br />

                {/* <label htmlFor="age">Prenom:</label> */}
                <input type="text" id="surname" name="surname" placeholder="Prénom" required style={{width: "300px", height: "40px", borderRadius: "5px", border: "1px solid blue", padding: "10px", marginTop: "10px", marginBottom: "10px"}}/><br />

                {/* <label htmlFor="email">Email:</label> */}
                <input type="email" id="email" name="email" placeholder="Email" required style={{width: "300px", height: "40px", borderRadius: "5px", border: "1px solid blue", padding: "10px", marginTop: "10px", marginBottom: "10px"}}/><br />

                {/* <label htmlFor="message">Mot de passe:</label> */}
                <input type="password" id="password" name="password" placeholder="Mot de passe" required style={{width: "300px", height: "40px", borderRadius: "5px", border: "1px solid blue", padding: "10px", marginTop: "10px", marginBottom: "10px"}}/><br />

                {/* <label htmlFor="message">Confirmer:</label> */}
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirmer mot de passe" required style={{width: "300px", height: "40px", borderRadius: "5px", border: "1px solid blue", padding: "10px", marginTop: "10px", marginBottom: "10px"}}/><br />

                <button type="reset" style={{cursor: "pointer", width: "300px", height: "40px", backgroundColor: "#bfdaffff", borderRadius: "30px", padding: "10px", marginTop: "10px", marginBottom: "10px"}}>Annuler</button><br />
                <button type="submit" style={{cursor: "pointer", width: "300px", height: "40px", backgroundColor: "#006affff", borderRadius: "30px", padding: "10px", marginTop: "10px", marginBottom: "10px"}}>Suivant</button>

                <h4>Avez-vous déjà un compte ? Si oui <span><button style={{border: "None", backgroundColor: "transparent", cursor: "pointer"}}>Se connecter</button></span></h4>

            </form>
            </div>
            
        </div>
    );
}

export default Formulaire;