import React, { useState } from 'react';

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
            <button onClick={handleLike}>Like</button>
            <p>{like}</p>
        </div>
    );
}
