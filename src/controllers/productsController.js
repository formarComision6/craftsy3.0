const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    add: (req, res) => {
        db.Category.findAll()
            .then(categorias => {
                return res.render('productAdd', {
                    categorias,
                })
            }).catch(error => console.log(error))

    },
    save: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, description, price, categoryId } = req.body;

            db.Product.create({
                ...req.body,
                name: name.trim(),
                description: description.trim()
            }).then(product => {

                if (req.files) {
                    var images = [];
                    var imagenes = req.files.map(imagen => imagen.filename);
                    imagenes.forEach(img => {
                        var image = {
                            file: img,
                            productId: product.id
                        }
                        images.push(image)
                    });

                    db.Image.bulkCreate(images, { validate: true })
                        .then(() => console.log('imagenes agregadas'))
                }

                return res.redirect('/admin')
            }).catch(error => console.log(error))

        } else {
            db.Category.findAll()
                .then(categorias => {
                    return res.render('productAdd', {
                        categorias,
                        errores: errors.mapped(),
                        old: req.body
                    })
                }).catch(error => console.log(error))
        }
    },
    detail: (req, res) => {

        db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { association: 'images' },
                { association: 'category' }
            ]
        }).then(producto => {
            console.log(producto);
            db.Category.findOne({
                where: {
                    id: producto.categoryId
                },
                include: [
                    {
                        association: 'products',
                        include: [
                            { association: 'images' }
                        ]
                    }
                ]
            }).then(category => {
                return res.render('productDetail', {
                    producto,
                    relacionados: category.products
                })
            })
        }).catch(error => console.log(error))

    },
    search: (req, res) => res.render('resultSearch'),
    edit: (req, res) => {
        let categorias = db.Category.findAll();
        let producto = db.Product.findByPk(req.params.id,{
            include : ['category','images']
        });
        Promise.all([categorias, producto])
            .then(([categorias, producto]) => {
                return res.render('productEdit', {
                    categorias,
                    producto
                })
            })

    },
    update: (req, res) => {
        const { name, description, price, categoryId } = req.body;

        db.Product.update(
            {
                name: name.trim(),
                description: description.trim(),
                price,
                categoryId
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(() => res.redirect('/admin'))
            .catch(error => console.log(error))

    },
    remove: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => res.redirect('/admin'))
            .catch(error => console.log(error))
    }
}