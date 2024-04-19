//Permet d'ajouter un film à la liste des films et de l'envoyer à la base de données différente de la liste des films 

import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import transition from '../components/asset/transition'
import "../styles/pages/Page_addFilm.scss";

function Page_AddFilm () {
    // const [films, setFilms] = useState([]);
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
            const response = await fetch("http://localhost:2000/addNewFilm", {
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
    
    console.log(titre, réalisateur, année, durée, nationalité, genre, synopsis, titreOriginal, annéeDeProduction);

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
            <div className="new_film_input">
                <TextField variant="outlined" label='Titre' value={titre} onChange={(event) => setTitre(event.target.value)} />
                <TextField variant="outlined" label='Réalisateur' value={réalisateur} onChange={(event) => setRéalisateur(event.target.value)} />
                <TextField label="Année" type="number" InputLabelProps={{ shrink: true,}} value={année} onChange={(event) => setAnnée(event.target.value)} />
                <TextField variant="outlined" label='Durée' value={durée} onChange={(event) => setDurée(event.target.value)} />
                <TextField variant="outlined" label='Nationalité' value={nationalité} onChange={(event) => setNationalité(event.target.value)} />
                <TextField variant="outlined" label='Genre' value={genre} onChange={(event) => setGenre(event.target.value)} />
                <TextField variant="outlined" label='Synopsis' value={synopsis} onChange={(event) => setSynopsis(event.target.value)} />
                <TextField variant="outlined" 
                            label='Titre original' 
                            value={titreOriginal} 
                            onChange={
                                (event) => setTitreOriginal(event.target.value)} 
                />
                <TextField label="Année de production" type="number" InputLabelProps={{ shrink: true,}} value={annéeDeProduction} onChange={(event) => setAnnéeDeProduction(event.target.value)} />
                <button type="submit">Ajouter</button>
            </div>
        </form>
    </div>
    )
}

export default transition(Page_AddFilm);