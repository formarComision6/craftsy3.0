const {check, body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El nombre tiene que tener como mínimo 2 caracteres').bail()
    .isAlpha().withMessage('El nombre debe contener solo letras'),

    check('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debes ingresar un email válido'),

    body('email')
    .custom(value => {
        console.log(value)
        return db.User.findOne({
            where : {
                email : value
            }
        }).then(user => {
            if(user){
                return Promise.reject('El email ya está registrado')
            }
        })
    }),

    check('password')
    .isLength({
        min : 6,
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('password2')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden'),

    check('acepta')
    .isString('on').withMessage('Debes aceptar los términos y condiciones')
]