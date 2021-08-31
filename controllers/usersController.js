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
        if(typeof hobbies === "string"){
            hobbies = hobbies.split()
        }
        if(errors.isEmpty()){
            let usuario = {
                id : usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre,
                email,
                contrasenia : bcrypt.hashSync(contrasenia,10),
                pais,
                genero,
                hobbies : typeof hobbies === 'undefined' ? [] : hobbies,
                rol : "user"
            }
            usuarios.push(usuario);
            guardar(usuarios);

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
            let usuario = usuarios.find(usuario => usuario.email === email)
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
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('craftsyForEver',null,{maxAge:-1})
        return res.redirect('/')
    }
}