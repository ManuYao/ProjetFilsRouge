const mongoose = require("mongoose");


//Inscription Schema, soon add genre ...
const subShema = new mongoose.Schema({


  userName: String,
  email: String,
  password: String,
});


const Sub = mongoose.model("Sub", subShema);


//Connection Schema
const loginShema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});


module.exports = Sub;