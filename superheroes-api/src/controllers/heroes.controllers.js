//Descreve quais funções devem ser chamadas para cada rota
const Hero = require("../models/Hero.js"); //importa o model Hero, para utilizar os métodos do sequelize

async function list(req, res){  //Async indica que a função é assíncrona, permite usar await dentro dela (ele permite que a função espere a execução de uma promise antes de continuar) req representa a requisição feita pelo usuário, res representa a resposta que será enviada para o usuário
    const movies = await Hero.findAll() //Const movies cria uma variavel para armazenar o resultado da consulta. Await aguarda a conclusão da operação assincrona. Hero.findAll(): método do Sequelize que consulta todos os registros do Model Hero.
    return res.status(200).json(movies); //Encecerra a requisição e retorna uma resposta com status 200 (OK) e o resultado da consulta em formato JSON.
}

async function create(req, res){ 
    const {name, universe, power} = req.body; //Desestruturação do objeto req.body, que contém os dados enviados pelo usuário na requisição. Cria variáveis name, universe e power com os valores correspondentes do corpo da requisição.

    if (!name || !universe || !power) { //Verifica se algum dos campos obrigatórios está ausente. Se algum deles estiver ausente, retorna uma resposta com status 400 (Bad Request) e uma mensagem de erro.
        return res.status(400).json({
            message: "Nome, universo e poder são obrigatórios"});
    }

    const hero = await Hero.create({name, universe, power}); 
    return res.status(201).json(hero);
}

module.exports = {
    list,
    create
};