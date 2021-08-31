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
            let producto = {
                id : productos[productos.length - 1].id + 1,
                title,
                description,
                price : +price,
                images : req.files.length != 0 ? imagenes : ['default-image.png'],
                category
            }
           productos.push(producto);
    
           guardar(productos)
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
        let producto = productos.find(producto => producto.id === +req.params.id);

        return res.render('productDetail',{
            producto,
            productos,
            relacionados : productos.filter(item => item.category === producto.category)
        })
    },
    search : (req,res) => {
        let result = productos.filter(producto => producto.title.toLowerCase().includes(req.query.search.toLowerCase()));
        return res.render('resultSearch',{
            result,
            productos,
            busqueda : req.query.search
        })
    },
    edit : (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);

        return res.render('productEdit',{
            categorias,
            productos,
            producto
        })
    },
    update : (req,res) => {
        const {title, description,price,category} = req.body;

        let producto = productos.find(producto => producto.id === +req.params.id)
        let productoEditado = {
            id : +req.params.id,
            title,
            description,
            price : +price,
            image : req.file ? req.file.filename : producto.image,
            category
        }

        let productosModificados = productos.map(producto => producto.id === +req.params.id ? productoEditado : producto)

        guardar(productosModificados)
        res.redirect('/')
          
    },
    remove : (req,res) => {
        res.send(req.params.id)
    }
}