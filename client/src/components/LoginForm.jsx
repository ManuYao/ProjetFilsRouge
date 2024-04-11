import React, { useState } from 'react';
import {createAvatar} from '@dicebear/avatars';
import {bigEars} from '@dicebear/collection';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import google from '../asset/images/logo_google.png';
import meta from '../asset/images/logo_meta.png';
import yahoo from '../asset/images/logo_yahoo.png';
import '../styles/components/LoginForm.scss';

export default function LoginForm({ setToken }) {
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
        <div className='page_auth'>
            <div className='img'/>
            <div className='auth_menu'>
                <div dangerouslySetInnerHTML={{ __html: avatar }} />
                <div className='social'>
                    <img src={google} alt='google' />
                    <img src={meta} alt='meta' />
                    <img src={yahoo} alt='yahoo' />   
                </div>
           

                <form onSubmit={handleSubmit}>
                    <TextField
                        type="email" id="email" name="email" value={email}
                        onChange={handleEmailChange} placeholder="Email"
                    />
                    <TextField
                        type="password" id="password" name="password" value={password}
                        onChange={handlePasswordChange} placeholder="Mot de passe"
                    />
                    <Button type="submit" variant='contained' style={{
                        backgroundColor: '#171625',
                        width: 245,
                        height: 60
                    }}>Se connecter</Button>
                </form>
            </div>
        </div>
    );
}