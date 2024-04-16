import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import { Divider, Skeleton } from '@mui/material';
import Like from './Like';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/components/FilmFilter.scss';

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
            <h2 className='genre_title' style={{fontWeight: 700, fontSize: 48, marginBottom: 74}}>{genre}</h2>
            <Slider {...settings}>
                {filtredFilms.map(film => (
                    <div className='card_filter' key={film._id} style={{ width: '320px', margin: '0 10px' }}>
                        {loadingSkeleton ? (
                            <Skeleton variant="rectangular" width={320} height={384} />
                        ) : (
                            <Card className='card' sx={{ height: '384px', width: '320px', backgroundColor: '#D9D9D9' }} />
                        )}
                        <div>
                            {loadingSkeleton ? (
                                <>
                                    <Skeleton width={200} height={20} sx={{ backgroundColor: '#D9D9D', color: '#D9D9D' }} />
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Skeleton width={80} height={20} />
                                        <Divider orientation='vertical' flexItem sx={{ backgroundColor: 'red' }} />
                                        <Skeleton width={80} height={20} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 style={{ fontSize: '20px', marginTop: '40px' }}>{film.Titre}</h3>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
                                        <p>{film.Durée}</p>
                                        <Divider orientation='vertical' flexItem sx={{ backgroundColor: 'red' }} />
                                        <p style={{ color: 'red' }}>{film.Genre}</p>
                                        <Like filmId={film._id} />
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