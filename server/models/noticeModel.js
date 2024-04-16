// Model likeModel pour envoyer les données à la base de données avec le nom et l'id de l'utilisateur

const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  filmId: String,
  userId: String,
  liked: Boolean,
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
