import React, { useState } from 'react';
import {createAvatar} from '@dicebear/avatars';
import {bottts} from '@dicebear/collection';

export default function LoginForm({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //mise à jour du seed pour l'avatar
    const updateAvatar = (name) => {
        return name.trim().toLowerCase();
    }

    //avatar
    const avatar = createAvatar(bottts, {
        seed: updateAvatar(email),
        width: 124,
        height: 200,
        radius: 0,
    });

    const svg = avatar.toString();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
            const response = await fetch('http://localhost:2000/connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                console.log('Utilisateur connecté avec succès !', data.token);
            } else {
                console.error('Erreur lors de la connexion :', data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    };

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: avatar }} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email" id="email" name="email" value={email}
                    onChange={handleEmailChange}
                />
                <label htmlFor="password">Mot de passe:</label>
                <input
                    type="password" id="password" name="password" value={password}
                    onChange={handlePasswordChange}
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}