const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/articles/index", { articles: articles });
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    });
});
router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.redirect("/admin/articles");
    }
    Article.findByPk(id).then(article => {
        if (article != undefined) {
            res.render("admin/articles/edit", { article: article });

        } else {
            res.redirect("/admin/articles");
        }
    }).catch(err => {
        res.redirect("/admin/articles")
    })
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    });

});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) { //verifica se o valor for numerico

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });

        } else { //id nao for numero
            res.redirect("/admin/articles");
        }

    } else { // null
        res.redirect("/admin/articles");
    }

});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.redirect("/admin/articles");
    }
    Article.findByPk(id).then(article => {
        if (article != undefined) {
            res.render("admin/article/edit", { article: article });

        } else {
            res.redirect("/admin/articles");
        }
    }).catch(err => {
        res.redirect("/admin/articles");
    })
});

router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Article.update({ title: title, slug: slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    })
});

module.exports = router;