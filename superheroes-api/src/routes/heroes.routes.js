//Descreve quais urls existem na aplicação e quais funções devem ser chamadas para cada uma delas
const express = require("express");
const router = express.Router();
const heroesController = require("../controllers/heroes.controllers.js");

router.get("/", heroesController.list);
router.post("/", heroesController.create);

module.exports = router;