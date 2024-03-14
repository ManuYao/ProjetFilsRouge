const Film = require('../models/films')

exports.createFilm = async (dataFilms) => {
    try{
        const newMovie = new Film(dataFilms)
        const createFilm = await newMovie.save()
        return createFilm
    } catch (error){
console.error('Erreur lors de la création du film :', error);
    }
}