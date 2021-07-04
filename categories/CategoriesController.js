const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title) //versao sem espaços desenvolvimento-web com traços
        }).then(() => {
            res.redirect("/");
        })

    } else {
        res.redirect("/admin/categories/new");
    }

});

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", { categories: categories });
    });
});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) { //verifica se o valor for numerico

            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });

        } else { //id nao for numero
            res.redirect("/admin/categories");
        }

    } else { // null
        res.redirect("/admin/categories");
    }

});

module.exports = router;