const { check } = require('express-validator');
const { validateFields } = require('./validateFields');


const emailRequired = check('email', 'Debe ingresar un email').not().isEmpty();
const isEmail = check('email', 'Formato de email inválido').isEmail().normalizeEmail();
const passwordRequired = check ('password', 'Ingrese la contraseña').not().isEmpty();
const passwordIsString = check('password', 'Formato de contraseña inválida').isString().trim();

const validateLogin = [
    emailRequired,
    isEmail,
    passwordRequired,
    passwordIsString,
    validateFields
];

const validateRegister = [
    emailRequired,
    isEmail,
    passwordRequired,
    passwordIsString,
    validateFields
];

module.exports = {
    validateLogin,
    validateRegister
}