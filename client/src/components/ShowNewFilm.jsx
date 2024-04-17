import React, { useState, useEffect } from "react";

export default function ShowNewFilm() {
    const [films, setFilms] = useState([]);
    
    useEffect(() => {
        const fetchFilms = async () => {
        try {
            const response = await fetch("http://localhost:2000/newFilms");
            const data = await response.json();
            setFilms(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des films:", error);
        }
        };
        fetchFilms();
    }, []);
    
    return (
        <div>
        <h1>Nouveaux films</h1>
        <ul>
            {films.map((film) => (
            <li key={film._id}>
                {film.Titre} - {film.Réalisateur} - {film.Année} - {film.Durée} - {film.Nationalité} - {film.Genre} - {film.Synopsis} - {film["Titre original"]} - {film["Année de production"]}
            </li>
            ))}
        </ul>
        </div>
    );
    }
