const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../database/models')

module.exports = {
    register : (req,res) => {
        return res.render('register')
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        let {name,email,password} = req.body;
      if(errors.isEmpty()){

            db.User.create({
                name : name.trim(),
                email : email.trim(),
                password : bcrypt.hashSync(password,10),
                avatar : 'default.png',
                rolId : 1
            }).then(user => {
                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.rol
                }
                return res.redirect('/')
            }).catch(error => console.log(error))
        }else{
            return res.render('register',{
                old : req.body,
                errores : errors.mapped()
            })
        }
        
    },
    login : (req,res) => {
        return res.render('login')
    },
    processLogin : (req,res) => {

        let errors = validationResult(req);
        const {email, recordar} = req.body;
        if(errors.isEmpty()){
            db.User.findOne({
                where : {
                    email
                }
            }).then(user => {
                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.rolId,
                    avatar : user.avatar
                }
                recordar && res.cookie('craftsyForEver',req.session.userLogin,{maxAge: 1000 * 60})
                return res.redirect('/')
            })
           
        }else{
            return res.render('login',{
                errores : errors.mapped()
            })
        }
    },
    profile : (req,res) => {
        db.User.findByPk(req.session.userLogin.id)
        .then(user => res.render('profile',{
            user
        })).catch(error => console.log(error))
    },
    update : (req,res) => {
        const {name,password} = req.body;
        db.User.update(
            {
                name : name.trim(),
                avatar : req.file && req.file.filename,
                password :  password != " " && bcrypt.hashSync(password,10)
            },
            {
                where : {
                    id : req.params.id
                }
            }).then( () => res.redirect('/users/profile'))
    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('craftsyForEver',null,{maxAge:-1})
        return res.redirect('/')
    }
}