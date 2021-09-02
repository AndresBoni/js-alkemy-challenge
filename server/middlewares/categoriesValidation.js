const { check } = require('express-validator');
const { validateFields } = require('./validateFields');
const { validateToken } = require('./validateToken');

const nameRequired = check('name', 'Debe especificar un nombre para la categoría').not().isEmpty();
const nameIsString = check('name', 'Formato de nombre inválido').isString();
const idRequired = check('id', 'Id de categoría vacío').not().isEmpty();
const adminCodeRequired = check('adminCode', 'Debe especificar código de administrador').not().isEmpty();

const validateCreateCategory = [
    nameRequired,
    nameIsString,
    adminCodeRequired,
    validateFields,
    validateToken
];

const validateGetCategories = [
    validateToken
];

const validateUpdateCategories = [
    idRequired,
    adminCodeRequired,
    nameIsString,
    validateToken
];

const validateDeleteCategory = [
    idRequired,
    adminCodeRequired,
    validateFields,
    validateToken
];



module.exports = {
    validateCreateCategory,
    validateGetCategories,
    validateUpdateCategories,
    validateDeleteCategory
}