import React, { useState } from 'react';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:2000/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Données d'inscription > l'API backend
                body: JSON.stringify({ email, password }), 
            });

            if (response.ok) {
                console.log('Inscription réussie !');
                window.location.href = './Login.jsx';
            } else {
                console.log('Erreur lors de l\'inscription');
            }
        } catch (error) {
            console.error('Erreur lors de la requête d\'inscription', error);
        }
    };

    return (
        <div>
            <h1>Inscription</h1>
            <input
                type="text"
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
            <button onClick={handleRegister}>S'inscrire</button>
        </div>
    );
};

export default RegisterForm;
