// Importer les modules nécessaires
const express = require('express');
const films = require ('./service/filmsdata')

/* Start serveur */
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
  });

/**
 * -------Route films list---------
 * 
 * http://localhost:3000/data/films ON
 *  */
app.get('/data/films', (req, res) => {
  res.json(films)
});

