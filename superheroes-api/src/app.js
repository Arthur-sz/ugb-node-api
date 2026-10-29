const express = require("express");
const sequelize = require("./database/database");
const Hero = require("./models/Hero");
const Movie = require("./models/Movie");
const heroesRoutes = require("./routes/heroes.routes");
const app = express();

Hero.belongsToMany(Movie, {
    through: "HeroMovies" 
});

Movie.belongsToMany(Hero, {
    through: "MoviesHero" 
});

app.use("/heroes", heroesRoutes);

sequelize
    .sync()
    .then(() => {
        console.log("Banco de dados sincronizado.");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar o banco de dados:", error);
    })
module.exports = app;