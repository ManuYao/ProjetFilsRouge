const mongoose = require("mongoose");

const newFilmsSchema = new mongoose.Schema({
  Titre: String,
  Réalisateur: String,
  Année: Number,
  Durée: String,
  Nationolalité: String,
  Genre: String,
  Synopsis: String,
  "Titre original": String,
  "Année de production": Number,
});

const NewFilm = mongoose.model("NewFilm", newFilmsSchema);

module.exports = NewFilm;
