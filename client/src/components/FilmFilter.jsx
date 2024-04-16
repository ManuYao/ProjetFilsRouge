import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import { Divider, Skeleton } from '@mui/material';
import Like from './Like';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/components/FilmFilter.scss';
import icon_dot from '../asset/images/icon_dot.png';// temporaire

function FilmGenreFilter({ genre }) {
    const [films, setFilms] = useState([]);
    const [filtredFilms, setFiltredFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingSkeleton(true);
                const response = await fetch(`http://localhost:2000/films?page=${currentPage}`);
                const data = await response.json();
                setFilms(prevFilms => [...prevFilms, ...data.films]);
                setHasMore(currentPage < data.totalPages);
            } catch (error) {
                console.error('Erreur lors de la récupération des données des films:', error);
            } finally {
                setLoadingSkeleton(false); 
            }
        };

        fetchData();
    }, [currentPage]);

    useEffect(() => {
        const filterFilms = films.filter(film => film.Genre === genre);
        setFiltredFilms(filterFilms);
    }, [films, genre]);

    const handleAfterChange = currentSlide => {
        if (currentSlide + 4 >= films.length && !loadingSkeleton && hasMore) { 
            setCurrentPage(currentPage + 1);
            console.log('Chargement de la page suivante...');
        }
    };

    const settings = {
        dots: false,
        centerMode: true,
        infinite: false,
        slidesToShow: 5,
        speed: 500,
        afterChange: handleAfterChange
    };

    return (
        <div className='genre_film'>
            <h2 className='genre_title'>{genre}</h2>
            <Slider {...settings}>
                {filtredFilms.map(film => (
                    <div className='card_filter' key={film._id} style={{ width: '320px', margin: '0 10px' }}>
                        {loadingSkeleton ? (
                            <Skeleton variant="rectangular" width={320} height={384} />
                        ) : (
                            <Card className='card' sx={{ height: '384px', width: '320px', backgroundColor: 'D9D9D9', opacity: 0.3 }} />
                        )}
                        <div>
                            {loadingSkeleton ? (
                                <>
                                    <Skeleton width={200} height={20} />
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Skeleton width={80} height={20} />
                                        <Divider orientation='vertical' flexItem/>
                                        <Skeleton width={80} height={20} />
                                    </div>
                                </>
                            ) : (
                                <>
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
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default FilmGenreFilter;