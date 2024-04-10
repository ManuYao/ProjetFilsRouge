import React, { useState, useEffect } from 'react';
import FilmeFilter from './FilmFilter';
import LoginForm from './LoginForm';
import Register from './Register';

export default function Login() {
    const [token, setToken] = useState('');
    const [films, setFilms] = useState([]);
    const [showRegister, setShowRegister] = useState(false);

    // Fonction pour basculer entre le formulaire de connexion et d'inscription
    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setFilms([]);
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:2000/data', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setFilms(data);
            console.log('Données récupérées avec succès :', data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    // Récupération du token dans le local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            fetchData();
        }
    }, []);

    return (
        <div>
            {token ? (
                <button onClick={handleLogout}>Se déconnecter</button>
            ) : (
                <>
                    {showRegister ? null : <LoginForm setToken={setToken} />}
                    <p onClick={toggleRegister}>{showRegister ? 'Connexion' : 'Inscription'}</p>
                    {showRegister && <Register />}
                </>
            )}

            {/* Affiche les films filtrés par genre lors de la connexion */}
            {token && (
                <>
                    <FilmeFilter films={Array.isArray(films) ? films : []} genre="Policier" />
                    <FilmeFilter films={Array.isArray(films) ? films : []} genre="Action" />
                    <FilmeFilter films={Array.isArray(films) ? films : []} genre="Comédie" />
                    <FilmeFilter films={Array.isArray(films) ? films : []} genre="Romance" />
                </>
            )}
        </div>
    );
}
