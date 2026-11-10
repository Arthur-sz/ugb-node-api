//Descrevem as taelas do banco de dados
const { DataTypes } = require("sequelize"); //Utiliza a desestruturação para importar o DataTypes do Sequelize. O DataTypes permite determinar qual será o tipo de informação armazenada em cada atributo de um Model.

const sequelize = require("../database/database"); //Importa a conexão com o banco de dados, que foi configurada no arquivo database.js. Isso permite que o Model utilize essa conexão para interagir com o banco de dados.

const Hero = sequelize.define("Hero", { //Define o Model Hero, que representa a tabela "Hero" no banco de dados. O método define recebe dois argumentos: o nome do Model e um objeto que descreve os atributos da tabela.
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    universe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    power: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Hero; //Exporta o Model Hero, permitindo que ele seja utilizado em outros arquivos do projeto, como controladores e rotas, para realizar operações no banco de dados relacionadas aos heróis.