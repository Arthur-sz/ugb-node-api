//Monta a aplicação express
const express = require("express");
const sequelize = require("./database/database");
const Hero = require("./models/Hero");
const Movie = require("./models/Movie");
const heroesRoutes = require("./routes/heroes.routes");

const app = express(); //cria uma aplicação express e denomina a variável app para ser usada em outros arquivos
app.use(express.json()); //.use(): registra um middleware, que será executado durante o processamento das requisições. express.json(): cria um middleware responsável por interpretar o corpo das requisições que chegam em formato JSON

Hero.belongsToMany(Movie, { //Define a relação de muitos para muitos entre Hero e Movie
    through: "HeroMovies"  // "throuth" informa o Sequelize que a relação entre Hero e Movie será feita através da tabela "HeroMovies"
});

Movie.belongsToMany(Hero, {//Define a relação de muitos para muitos entre Movie e Hero
    through: "MoviesHero"  // "throuth" informa o Sequelize que a relação entre Movie e Hero será feita através da tabela "MoviesHero"
});

app.use("/heroes", heroesRoutes); //Registra as rotas de heróis na aplicação express, associando o caminho "/heroes" ao arquivo de rotas "heroesRoutes"

sequelize //Sincroniza o banco de dados, sequelize é um orm JS que permite mapear objetos JS para tabelas do banco de dados, e vice-versa. .sync() cria as tabelas no banco de dados caso elas não existam
    .sync() //Cria as tabelas no banco de dados caso elas não existam
    .then(() => { //Se a sincronização for bem-sucedida, exibe uma mensagem no console
        console.log("Banco de dados sincronizado.");
    })
    .catch((error) => { //Se houver algum erro durante a sincronização, exibe uma mensagem de erro no console
        console.error("Erro ao sincronizar o banco de dados:", error);
    })
module.exports = app; //Exporta a aplicação express para ser usada em outros arquivos, como o server.js