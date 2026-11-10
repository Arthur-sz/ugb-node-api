//Conecta com o banco de dados 
const { Sequelize } = require("sequelize") //{} faz comm que apenas a classe Sequelize seja importada do pacote sequelize, requiere("sequelize") importa o pacote sequelize

const sequelize = new Sequelize({ 
    dialect: "sqlite", //Define qual banco de dados será usado
    storage: "./database.sqlite", //Define o caminho do arquivo do banco de dados, dizendo onde ficarão armazenados os dados
    logging: false //Desativa o log de queries SQL no console, para não poluir a saída do console com informações desnecessárias
});

module.exports = sequelize; //Disponibiliza a conexão com o banco de dados para outros arquivos do projeto, permitindo que eles utilizem a instância do Sequelize para interagir com o banco de dados.