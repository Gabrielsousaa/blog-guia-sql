const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    } // desenvolvimento Web = desenvolvimento-web é uma versao da categoria do titulo

});

module.exports = Category;