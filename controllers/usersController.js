const {productos} = require('../data/products_db');
const {usuarios, guardar} = require('../data/users_db');
const paises = require('../data/paises');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const { reverse } = require('../data/paises');

module.exports = {
    register : (req,res) => {
        return res.render('register',{
            productos,
            paises
        })
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        let {nombre,email,contrasenia,pais,genero,hobbies} = req.body;
      if(errors.isEmpty()){


        //base de datos
       
            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol : usuario.rol
            }
            return res.redirect('/')
        }else{
            return res.render('register',{
                productos,
                paises,
                old : req.body,
                errores : errors.mapped()
            })
        }
        
    },
    login : (req,res) => {
        return res.render('login',{
            productos
        })
    },
    processLogin : (req,res) => {

        let errors = validationResult(req);
        const {email, recordar} = req.body;
        if(errors.isEmpty()){
            

            //base de datos

            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol : usuario.rol
            }

            if(recordar){
                res.cookie('craftsyForEver',req.session.userLogin,{maxAge: 1000 * 60})
            }
            return res.redirect('/')
        }else{
            return res.render('login',{
                productos,
                errores : errors.mapped()
            })
        }
    },
    profile : (req,res) => {

    },
    update : (req,res) => {

    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('craftsyForEver',null,{maxAge:-1})
        return res.redirect('/')
    }
}