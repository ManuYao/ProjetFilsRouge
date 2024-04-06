import React from 'react';

const FilmGenreFilter = ({ films, genre }) => {
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