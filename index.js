const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const CategoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");

// view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database 
connection
    .authenticate()
    .then(() => {
        console.log("Sucessfull join database...");
    }).catch((error) => {
        console.log(error);
    })

app.use("/", CategoriesController);
app.use("/", ArticlesController);


app.get("/", (req, res) => {
    res.render("index");
})


app.listen(8080, () => {
    console.log("Server is running... ")
})