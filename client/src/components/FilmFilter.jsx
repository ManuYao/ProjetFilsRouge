import { useState, useEffect } from 'react';

function FilmGenreFilter({ genre }) {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2000/films')
            .then(response => response.json())
            .then(data => setFilms(data))
            .catch(error => console.error('Erreur récupération des données des films:', error));
            console.log('Données récupérées avec succès :', films);
    }, []);

    const filteredGenresFilms = films.filter(film => film.Genre && film.Genre.includes(genre));

    return (
        <>
            <h2 className='genre_film'>Films du genre {genre}</h2>

            {filteredGenresFilms.map(film => (
                <div key={film._id}>
                    <h3>{film.Titre}</h3>
                    <p>{film.Synopsis}</p>
                    <p>{film.Année}</p>
                    <p style={{color: 'red'}}>{film.Genre}</p>
                </div>
            ))}
        </>
    );
};

export default FilmGenreFilter;