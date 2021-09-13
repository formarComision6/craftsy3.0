const fs = require('fs');
const path = require('path');
const categorias = require('../data/categories_db');
const {productos, guardar} = require('../data/products_db');
const {validationResult} = require('express-validator');

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
 // base de datos
        return res.render('productEdit',{
            categorias,
            productos,
            producto
        })
    },
    update : (req,res) => {
        const {title, description,price,category} = req.body;

        //base de datos
        res.redirect('/')
          
    },
    remove : (req,res) => {
        //base de datos
        res.send(req.params.id)
    }
}