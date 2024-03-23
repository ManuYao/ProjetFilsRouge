const mongoose = require('mongoose')

const filmShema = new mongoose.Schema({
    Titre: String,
    Réalisateur: String,
    Année: Number,
    Nationolalité: String,
    Synopsis: String
})

const Film = mongoose.model('Film', filmShema)

module.exports = Film;