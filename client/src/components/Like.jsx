import React, { useState } from 'react';
import icon_like from '../asset/images/icon_like.png';

export default function Like({ filmId }) {
    const [like, setLike] = useState();

    const handleLike = async () => {
        try {
            const response = await fetch('http://localhost:2000/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ filmId }),
            });

            const data = await response.json();
            console.log(data.message);
            setLike(data.message);
        } catch (error) {
            console.error('Erreur lors du like:', error);
        }
    }

    return (
        <div>
            <img style={{height: '32px'}} src={icon_like} alt='like_icon' onClick={handleLike} />
        </div>
    );
}

//Permet d'afficher une liste de films filtrée de film liké  soon
// export function LikedFilmsList() {
// }