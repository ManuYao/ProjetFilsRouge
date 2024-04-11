import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

    const settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 4.1,
        speed: 500,
    };

    return (
        <>
            <h2 className='genre_film'>Films du genre {genre}</h2>

            <Slider {...settings}>
            {filteredGenresFilms.map(film => (
                <div className='card_filter' key={film._id}>
                    <Card sx={{height: 384, width:320,backgroundColor:'green'}}/>
                    <div>
                        <h3>{film.Titre}</h3>
                        {/* <p>{film.Synopsis}</p> */}
                        <div style={{display:'flex', gap:8}}>
                            <p>{film.Durée}</p>
                            <Divider orientation='vertical' flexItem sx={{backgroundColor: 'red'}}/>
                            <p style={{color: 'red'}}>{film.Genre}</p>
                        </div>
                    </div>
                </div>
            ))}
            </Slider>
        </>
    );
};

export default FilmGenreFilter;