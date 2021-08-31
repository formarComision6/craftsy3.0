const {check} = require('express-validator');

module.exports = [
    check('title')
    .notEmpty().withMessage('El nombre es obligatorio'),

    check('description')
    .notEmpty().withMessage('Debes añadir una descripción'),

    check('price')
    .notEmpty().withMessage('Se precisa el precio'),

    check('category')
    .notEmpty().withMessage('Indica la categoría')
]