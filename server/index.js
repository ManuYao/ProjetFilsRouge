const mongoose = require('mongoose');
const express = require('express');
const { injectFilmsData } = require('./service/data/filmsData');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/ymovie', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à MongoDB réussie !');

  //Fonction filmData
  injectFilmsData();

  app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
  });
}).catch(err => console.error('Erreur de connexion à MongoDB :', err));
