const fs = require('fs');
const path = require('path');
const categorias = require('../data/categories_db');
const {productos, guardar} = require('../data/products_db');
const {validationResult} = require('express-validator');
const db = require('../database/models');

module.exports = {
    add : (req,res) => {
        return res.render('productAdd',{
            categorias,
           productos
        })
    },
    save : (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {title, description,price,category} = req.body;
            if(req.files){
                var imagenes = req.files.map(imagen => imagen.filename)
            }

            //base de datos
         
           return res.redirect('/')
        }else{
            return res.render('productAdd',{
                categorias,
                productos,
                errores : errors.mapped(),
                old : req.body
            })
        }
       

    },
    detail : (req,res) => {

        //base de datos

        return res.render('productDetail',{
            producto,
            productos,
            relacionados,
        })
    },
    search : (req,res) => {

        //base de datos

        return res.render('resultSearch',{
            result,
            productos,
            busqueda : req.query.search
        })
    },
    edit : (req,res) => {
        let categorias = db.Category.findAll();
        let producto = db.Product.findByPk(req.params.id);
        Promise.all([categorias,producto])
        .then(([categorias,producto]) => {
            return res.render('productEdit',{
                categorias,
                producto
            })
        })
      
    },
    update : (req,res) => {
        const {name, description,price,categoryId} = req.body;

        db.Product.update(
            {
                name : name.trim(),
                description : description.trim(),
                price,
                categoryId
            },
            {
                where : {
                    id : req.params.id
                }
            }
        ).then( () =>   res.redirect('/admin'))
        .catch(error => console.log(error))
          
    },
    remove : (req,res) => {
        db.Product.destroy({
            where : {
                id : req.params.id
            }
        }).then( () => res.redirect('/admin'))
        .catch(error => console.log(error))
    }
}