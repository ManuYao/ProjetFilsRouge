const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const Sub = require("./models/subModel");
const Film = require("./models/filmsModel");
const Like = require("./models/noticeModel");
const xlsx = require("xlsx");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 2000;
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/ymovie", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion à MongoDB réussie !");

    async function injectFilmsData() {
      try {
        const excelFilePath = "../database/film.xlsx";
        const workbook = xlsx.readFile(excelFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const filmsData = xlsx.utils.sheet_to_json(worksheet);

        for (const filmData of filmsData) {
          const film = new Film(filmData);
          await film.save();
        }
        console.log("Données de films injectées avec succès !");
      } catch (error) {
        console.error(
          "Erreur lors de l'injection des données de films :",
          error
        );
      }
    }

    //Middleware pour autoriser les requêtes CORS
    app.use(cors());

    // _Vérification
    //Middleware pour vérifier le token JWT
    function verifyToken(req, res, next) {
      // Récupérer le token depuis l'en-tête Authorization lors de la requête HTTP {Login.jsx}
      const token = req.headers["authorization"];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token manquant. Authentification nécessaire." });
      }

      // Vérifier et décoder le token
      jwt.verify(token.split(" ")[1], "secretKey", (err, decodedToken) => {
        if (err) {
          return res.status(403).json({ message: "Token invalide." });
        }
        // Ajouter l'ID de l'utilisateur dans l'objet req
        req.userId = decodedToken.userId;
        next();
      });
    }
    module.exports = verifyToken;

    app.get("/data", verifyToken, (req, res) => {
      res.json({ message: "Données protégées récupérées avec succès." });
    });
    //' _Vérification

    //Appel de la fonction ##injectFilmsData() pour injecter les données de films dans la base de données
    injectFilmsData();

    app.get("/films", async (req, res) => {
      //Pagination des films
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2383;
      try {
        const totalFilms = await Film.countDocuments();
        const totalPages = Math.ceil(totalFilms / limit);

        //Récupération des films avec pagination
        const films = await Film.find()
          .skip((page - 1) * limit)
          .limit(limit);
        res.status(200).json({ films, totalPages });
      } catch (error) {
        res.status(500).json({
          message: "Erreur lors de la récupération des films",
          error: error.message,
        });
      }
    });

    //Fonction pour générer un token JWT
    function generateToken(user) {
      const token = jwt.sign({ userId: user._id }, "secret-key", {
        expiresIn: "1h",
      });
      return token;
    }

    app.post("/inscription", async (req, res) => {
      try {
        const { email, password } = req.body;
        const sub = new Sub({ email, password });
        await sub.save();
        console.log(email, password);
        res.json({ message: "Utilisateur inscrit avec succès !" });
      } catch (error) {
        res.status(500).json({
          message: "Erreur lors de l'inscription",
          error: error.message,
        });
      }
    });

    app.post("/connection", async (req, res) => {
      try {
        //Vérification & récupération des données de l'utilisateur
        const { email, password } = req.body;
        const existingUser = await Sub.findOne({ email, password });

        if (!existingUser) {
          return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        const token = generateToken(existingUser);
        res.json({ message: "Utilisateur connecté avec succès !", token });
      } catch (error) {
        res.status(500).json({
          message: "Erreur lors de la connexion",
          error: error.message,
        });
      }
    });

    //ajout like check si l'utilisateur a déjà liké le film ou non, si déjà liké alors il est déliké
    app.post("/like", async (req, res) => {
      try {
        const { filmId, userId } = req.body;
        const existingLike = await Like.findOne({ filmId, userId });

        if (existingLike) {
          await Like.deleteOne({ filmId, userId });
          return res.json({ message: "Film déliké avec succès !" });
        }
        const like = new Like({ filmId, userId, liked: true });
        await like.save();
        res.json({ message: "Film liké avec succès !" });
      } catch (error) {
        res.status(500).json({
          message: "Erreur lors du like",
          error: error.message,
        });
      }
    });

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.listen(PORT, () => {
      console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));
