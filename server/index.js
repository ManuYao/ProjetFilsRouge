const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/ymovie', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à MongoDB réussie !');

  //filmData.js soon ------------------------------------------------------
const Film = require('./models/filmsModel');
const xlsx = require('xlsx');

  // Convertie 'xlsx' > 'json' et sauvegarde 'film'
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
// ---------------------------------------------------------

/**
 * @function injectFilmsData 
 * @borrows './'
 * @description La fonction 'injectFilmsData' a pour but d'injecter
 *              les données contenues dans un fichier Excel (film.xlsx) 
 *              dans une base de données MongoDB.
 * **/ 
injectFilmsData()

  // Start server
  app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
  });
}).catch(err => console.error('Erreur de connexion à MongoDB :', err));
