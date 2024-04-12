import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import { Divider, Skeleton } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/components/FilmFilter.scss';

function FilmGenreFilter({ genre }) {
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingSkeleton(true);
            try {
                const response = await fetch(`http://localhost:2000/films?page=${currentPage}`);
                const data = await response.json();
                setFilms(prevFilms => [...prevFilms, ...data.films]);
                setHasMore(currentPage < data.totalPages);
            } catch (error) {
                console.error('Erreur récupération des données des films:', error);
            }
            setLoadingSkeleton(false); 
        };
    
        if (hasMore) {
            fetchData();
        }
    }, [currentPage, hasMore]);
    
    const settings = {
        dots: false,
        centerMode: true,
        infinite: false,
        slidesToShow: 5,
        speed: 500,
        afterChange: (currentSlide) => {
            if (currentSlide + 4 >= films.length && !loadingSkeleton && hasMore) { 
                setCurrentPage(currentPage + 1);
                console.log('Chargement de la page suivante...');
            }
        }
    };
    

    return (
        <>
            <h2 className='genre_film'>Films du genre {genre}</h2>
            <Slider {...settings}>
                {films.map(film => (
                    <div className='card_filter' key={film._id} style={{ width: '320px', margin: '0 10px' }}>
                        {loadingSkeleton ? (
                            <Skeleton variant="rectangular" width={320} height={384} />
                        ) : (
                            <Card sx={{ height: '384px', width: '320px', backgroundColor: 'green' }} />
                        )}
                        <div>
                            {loadingSkeleton ? (
                                <>
                                    <Skeleton width={200} height={20} />
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Skeleton width={80} height={20} />
                                        <Divider orientation='vertical' flexItem sx={{ backgroundColor: 'red' }} />
                                        <Skeleton width={80} height={20} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3>{film.Titre}</h3>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <p>{film.Durée}</p>
                                        <Divider orientation='vertical' flexItem sx={{ backgroundColor: 'red' }} />
                                        <p style={{ color: 'red' }}>{film.Genre}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default FilmGenreFilter;
