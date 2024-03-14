//Lecture des fichier xlsx
const xlsx = require('xlsx')

const workbook = xlsx.readFile('../database/film.xlsx')
const worksheet = workbook.Sheets[workbook.SheetNames[0]]
const films = xlsx.utils.sheet_to_json(worksheet)

module.exports = films;
