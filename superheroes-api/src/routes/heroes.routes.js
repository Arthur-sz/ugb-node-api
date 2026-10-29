const express = require("express");
const router = express.Router();
const heroesController = require("../controllers/heroes.controllers.js");

router.get("/", heroesController.list);

module.exports = router;