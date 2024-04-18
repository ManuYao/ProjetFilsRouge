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

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState({});

    // Mise à jour du seed pour l'avatar
    const updateAvatar = (name) => {
        return name.trim().toLowerCase();
    }

    // Avatar
    const avatar = createAvatar(bigEars, {
        seed: updateAvatar(email),
        width: 124,
        height: 200,
        radius: 0,
    });

    const handleRegister = async (event) => {
        event.preventDefault();

        // Validation de l'email et du mot de passe
        if (email.includes('@') && password.length >= 8) {
            try {
                const response = await fetch('http://localhost:2000/inscription', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // Données d'inscription envoyées à l'API backend
                    body: JSON.stringify({ email, password }), 
                });

                if (response.ok) {
                    console.log('Inscription réussie !');
                    setLoginStatus({ success: true, message: 'Inscription réussie !' });
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 3000);
                } else {
                    console.error('Erreur lors de l\'inscription');
                    setLoginStatus({ success: false, message: 'Erreur lors de l\'inscription' });
                }
            } catch (error) {
                console.error('Erreur lors de la requête d\'inscription', error);
                setLoginStatus({ success: false, message: 'Erreur lors de la requête d\'inscription' });
            }
        } else {
            console.log('Email ou mot de passe invalide');
            setLoginStatus({ success: false, message: 'Email ou mot de passe invalide' });
        }
    };

    return (
        <div className='page_auth'>
            <div className='img' />
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
                    //Soon redirection page login via react router
                )}

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
                        height: 60
                    }} onClick={handleRegister}>S'inscrire</Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
