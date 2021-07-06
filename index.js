const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const CategoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//const gitExtension = vscode.extensions.getExtension < GitExtension > ('vscode.git').exports;
//const git = gitExtension.getAPI(1);

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
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories: categories });

        })
    });
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories });

            })
        } else {
            res.redirect("/");
        }

    }).catch(err => {
        res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", { articles: category.articles, categories: categories });
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })

});


app.listen(8080, () => {
    console.log("Server is running... ")
})