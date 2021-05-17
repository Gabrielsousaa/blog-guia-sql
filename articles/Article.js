const Sequelize = require("sequelize");
const connection = require("../database/database");

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: { // slug desenvolvimento Web = desenvolvimento-web é uma versao da categoria do titulo
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }

});

module.exports = Article;