// FilmList.jsx

import React, { useState, useEffect } from 'react';

const FilmList = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:2000/films')
      .then(response => response.json())
      .then(data => setFilms(data))
      .catch(error => console.error('Erreur récupération des données des films:', error));
  }, []);

  return (
    <div style={{backgroundColor: '#202248'}}>
      <h2>Liste des films</h2>
      <ul>
        {films.map(film => (
          <li key={film._id}>
            <h3>{film.Titre}</h3>
            <p>{film.Synopsis}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmList;
