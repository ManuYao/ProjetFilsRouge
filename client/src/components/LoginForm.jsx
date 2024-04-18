import React, { useState } from 'react';
import { createAvatar } from '@dicebear/avatars';
import { bigEars } from '@dicebear/collection';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import google from '../asset/images/logo_google.png';
import meta from '../asset/images/logo_meta.png';
import yahoo from '../asset/images/logo_yahoo.png';
import '../styles/components/LoginForm.scss';
import { Alert } from '@mui/material';
import { motion } from 'framer-motion';

export default function LoginForm({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [loginStatus, setLoginStatus] = useState({});

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
    })

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (email.includes('@') && email.includes('.')) {
            setCheckEmail(true);
            console.log('Email valide');
        } else {
            setCheckEmail(false);
            console.log('Email invalide');
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (password.length >= 8) {
            setCheckPassword(true);
        } else {
            setCheckPassword(false);
        }
    }

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
            if (data.token && checkEmail && checkPassword) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                console.log('Utilisateur connecté avec succès !', data.token);
            } else {
                setLoginStatus({ success: false, message: 'Email ou mot de passe invalide' });
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
                <motion.div  animate={{ y: 20 }} dangerouslySetInnerHTML={{ __html: avatar }} />
                <div className='social'>
                    <img src={google} alt='google' />
                    <img src={meta} alt='meta' />
                    <img src={yahoo} alt='yahoo' />   
                </div>
                
                {loginStatus.message && (
                    <Alert className='msg_alert' severity={loginStatus.success ? "success" : "error"}>
                        {loginStatus.message}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="email" id="email" name="email"
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
    )
}
