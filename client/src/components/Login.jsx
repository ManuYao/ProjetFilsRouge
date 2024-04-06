import React, { useEffect, useState } from 'react';
import FilmGenreFilter from './FilmFilter';

export default function Login() {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [films, setFilms] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire

        try {
            const response = await fetch('http://localhost:2000/connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            localStorage.setItem('token', data.token);
            if (!data.token) {
                console.error('Erreur lors de la connexion :', data.message);
                return;
            }
            const tokenFromServer = 'token-from-server';
            setToken(tokenFromServer);
            console.log('Token stocké avec succès !', data.token);
            
            // Après la connexion réussie, récupère les données du serveur
            fetchData();
        } catch (error) {
            console.error('Erreur lors de la récupération du token:', error);
        }
    };

// Fonction pour déconnecter l'utilisateur
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
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
            
            fetch('http://localhost:2000/films')
                .then(response => response.json())
                .then(data => setFilms(data))
                .catch(error => console.error('Error:', error));

            const data = await response.json();
            console.log('Données récupérées avec succès :', data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            fetchData();
        }
    }
    , []);

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Connexion</button>
            </form>

            <div>
    {token ? (
        <p>Connecté</p>
    ) : (
        <p>Déconnecté</p>
    )}
    {token ? <button onClick={handleLogout}>Déconnexion</button> : null }
</div>

{/*  Affiche les films filtrés par genre */}
{token && <FilmGenreFilter films={films} genre="Policier" />}
{token && <FilmGenreFilter films={films} genre="Action" />}
{token && <FilmGenreFilter films={films} genre="Comédie" />}
{token && <FilmGenreFilter films={films} genre="Romance" />}

    {/*Ancien code afficher tous les film {token && films.map(film => (
        <div key={film._id}>
            <h2>{film.Titre}</h2>
            <p>{film.Synopsis}</p>
        </div>
    ))} */}
</div>);
}
