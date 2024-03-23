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

  //filmData.js
const Film = require('./models/filmsModel');
const xlsx = require('xlsx');

// Exporte la fonction injectFilmsData
async function injectFilmsData() {
  try {
    const excelFilePath = '../database/film.xlsx';
    const workbook = xlsx.readFile(excelFilePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const filmsData = xlsx.utils.sheet_to_json(worksheet);

    for (const filmData of filmsData) {
      const film = new Film(filmData);
      await film.save();
    }
    console.log('Données de films injectées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'injection des données de films :', error);
  }
}

injectFilmsData()

  app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
  });
}).catch(err => console.error('Erreur de connexion à MongoDB :', err));
