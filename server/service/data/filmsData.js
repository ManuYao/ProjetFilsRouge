//filmData.js
const Film = require('../../models/filmsModel');
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

// Expose la fonction injectFilmsData pour pouvoir l'utiliser ailleurs si besoin
module.exports = injectFilmsData;
