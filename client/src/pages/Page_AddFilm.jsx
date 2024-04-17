//Permet d'ajouter un film à la liste des films et de l'envoyer à la base de données différente de la liste des films 

import React, { useState, useEffect } from "react";

export default function Page_AddFilm () {
    const [films, setFilms] = useState([]);
    const [titre, setTitre] = useState("");
    const [réalisateur, setRéalisateur] = useState("");
    const [année, setAnnée] = useState("");
    const [durée, setDurée] = useState("");
    const [nationalité, setNationalité] = useState("");
    const [genre, setGenre] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [titreOriginal, setTitreOriginal] = useState("");
    const [annéeDeProduction, setAnnéeDeProduction] = useState("");

    const newFilm = async (filmData) => {
        try {
            const response = await fetch("http://localhost:2000/newfilms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(filmData),
            });
            const data = await response.json();
            console.log(data.message); 
        } catch (error) {
            console.error("Erreur lors de l'ajout du film:", error);
        }
    }

    return (

        <div>
            <h1>Ajouter un film</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                newFilm({
                    Titre: titre,
                    Réalisateur: réalisateur,
                    Année: année,
                    Durée: durée,
                    Nationalité: nationalité,
                    Genre: genre,
                    Synopsis: synopsis,
                    "Titre original": titreOriginal,
                    "Année de production": annéeDeProduction,
                });
            }}>
                <input type="text" placeholder="Titre" value={titre} onChange={(event) => setTitre(event.target.value)} />

                <input type="text" placeholder="Réalisateur" value={réalisateur} onChange={(event) => setRéalisateur(event.target.value)} />

                <input type="number" placeholder="Année" value={année} onChange={(event) => setAnnée(event.target.value)} />

                <input type="text" placeholder="Durée" value={durée} onChange={(event) => setDurée(event.target.value)} />

                <input type="text" placeholder="Nationalité" value={nationalité} onChange={(event) => setNationalité(event.target.value)} />

                <input type="text" placeholder="Genre" value={genre} onChange={(event) => setGenre(event.target.value)} />

                <input type="text" placeholder="Synopsis" value={synopsis} onChange={(event) => setSynopsis(event.target.value)} />

                <input type="text" placeholder="Titre original" value={titreOriginal} onChange={(event) => setTitreOriginal(event.target.value)} />

                <input type="number" placeholder="Année de production" value={annéeDeProduction} onChange={(event) => setAnnéeDeProduction(event.target.value)} />

                <button type="submit">Ajouter</button>
            </form>
        </div>
    )
    
}
