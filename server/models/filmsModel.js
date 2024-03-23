const mongoose = require('mongoose')

const filmShema = new mongoose.Schema({
    Titre: String,
    Réalisateur: String,
    Année: Number,
    Durée: String,
    Nationolalité: String,
    Genre: String,
    Synopsis: String,
    'Titre original': String,
    'Année de production': Number
})

const Film = mongoose.model('Film', filmShema)

module.exports = Film;