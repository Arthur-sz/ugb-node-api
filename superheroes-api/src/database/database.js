const { Sequelize } = require("sequelize")

const sequelize = new Sequeliza({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false
});

module.exports = sequelize;