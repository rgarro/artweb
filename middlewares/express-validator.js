const { body } = require('express-validator');


module.exports = [
    body('name').isEmpty().withMessage('Debes completar el Nombre').bail(),
    body('email').isEmpty().withMessage('El nombre debe contener minimo 5 caracteres').bail(),
    
]