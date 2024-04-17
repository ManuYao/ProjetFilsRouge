import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import { Divider } from '@mui/material';
import Like from './Like';
import icon_dot from '../asset/images/icon_dot.png';
import { LoadingSkeleton, errorLoadingSkeleton } from './asset/LoadingSkeleton';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/components/FilmFilter.scss';

function FilmGenreFilter({ genre }) {
    const [films, setFilms] = useState([]);
    const [filtredFilms, setFiltredFilms] = useState([]);
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingSkeleton(true);
                const response = await fetch(`http://localhost:2000/films`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setFilms(data);
                } else {
                    console.error('Les données des films sont absentes ou incorrectes');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données des films:', error);
            } finally {
                setLoadingSkeleton(false); 
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (films.length === 0) {
            setFiltredFilms([]);
            return;
        }
        
        const filterFilms = films.filter(film => film.Genre === genre);
        setFiltredFilms(filterFilms);
    }, [films, genre]);

    const settings = {
        dots: false,
        centerMode: true,
        infinite: false,
        slidesToShow: 5,
        speed: 500,
        centerPadding: '-125px',
    };

    return (
        <div className='genre_film'>
            <h2 className='genre_title' style={{fontWeight: 700, fontSize: 48, marginBottom: 74}}>{genre}</h2>
            <Slider {...settings}>
                {filtredFilms.length > 0 ? (
                    filtredFilms.map(film => (
                        <div className='card_filter' key={film._id} style={{ width: '320px', margin: '0 10px', marginLeft:'100px'}}>
                            {loadingSkeleton ? (
                                LoadingSkeleton()
                            ) : (
                                <>
                                     <Card className='card' sx={{ height: '384px', width: '320px', backgroundColor: 'D9D9D9', opacity: 0.3 }} />
                                    <h3 className='title_card'>{film.Titre}</h3>
                                    <div className='state_films'>
                                        <div className='time_genre'>
                                            <p>{film.Durée}</p>
                                            <Divider orientation='vertical' flexItem sx={{ backgroundColor: 'white' }} />
                                            <p>{film.Genre}</p>
                                        </div>
                                        <div className='more_like'>
                                            <img style={{height: '32px'}} src={icon_dot} alt='like_icon'/>
                                            <Like filmId={film._id} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    errorLoadingSkeleton()
                )}
            </Slider>
        </div>
    );
}

export default FilmGenreFilter;
