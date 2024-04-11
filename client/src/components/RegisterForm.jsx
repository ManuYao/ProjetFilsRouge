import React, { useState } from 'react';
import {createAvatar} from '@dicebear/avatars';
import {bigEars} from '@dicebear/collection';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import google from '../asset/images/logo_google.png';
import meta from '../asset/images/logo_meta.png';
import yahoo from '../asset/images/logo_yahoo.png';
import '../styles/components/LoginForm.scss';


const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

        //mise à jour du seed pour l'avatar
        const updateAvatar = (name) => {
            return name.trim().toLowerCase();
        }

        //avatar
        const avatar = createAvatar(bigEars, {
            seed: updateAvatar(email),
            width: 124,
            height: 200,
            radius: 0,
        });

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
        <div className='page_auth'>
            <div className='img' />
            <div className='auth_menu'>
            <div dangerouslySetInnerHTML={{ __html: avatar }} />
                <div className='social'>
                    <img src={google} alt='google' />
                    <img src={meta} alt='meta' />
                    <img src={yahoo} alt='yahoo' />   
                </div>
            <form>
                <TextField
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button type="submit" variant='contained' style={{
                        backgroundColor: '#171625',
                        width: 245,
                        height: 60}} onClick={handleRegister}>S'inscrire</Button>
            </form>
            </div>
        </div>
    );
};

export default RegisterForm;
