const tutoriales = require('../data/tutorials_db');
const banner = require('../data/banner.json');

const db = require('../database/models');

module.exports = {
    index : (req,res) => {
        let productos = db.Product.findAll();
        let nuevos = db.Category.findOne({
            where : {
                name : 'nuevo'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        });
        let refact = db.Category.findOne({
            where : {
                name : 'refaccionado'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        });
        let usados = db.Category.findOne({
            where : {
                name : 'usado'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        })
        Promise.all([productos,nuevos,usados,refact])
        .then(([productos,nuevos,usados,refact]) => {
            return res.render('index',{
                title : "Craftsy 3.0",
                productos,
                nuevos : nuevos.products,
                refact : refact.products,
                usados : usados.products,
                banner,
                tutoriales
            })
        }).catch(error => console.log(error))
      
    },
    admin : (req,res) => {
        db.Product.findAll({
            include : [
                {association : 'category'}
            ]
        }).then(productos => res.render('admin/index',{
            productos
        }))
    }
}