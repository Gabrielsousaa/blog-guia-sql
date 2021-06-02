const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: { // desenvolvimento Web = desenvolvimento-web é uma versao da categoria do titulo
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = Category;