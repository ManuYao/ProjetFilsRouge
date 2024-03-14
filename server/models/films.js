const mongoose = require('mongoose')

const filmShema = new mongoose.Schema({
    titre: String,
    réalisateur: String,
    annee: Number,
    nation: String,
    Synopsis: String
})

const Film = mongoose.model('Film', filmShema)

module.exports = Film;