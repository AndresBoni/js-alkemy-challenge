const { check } = require('express-validator');
const { validateFields } = require('./validateFields');
const { validateToken } = require('./validateToken');

const typeRequired = check('type', 'Debe especificar el tipo de movimiento').not().isEmpty();
const amountIsNumeric =  check('amount', 'El monto debe ser un número').optional().isNumeric();
const amountRequired = check('amount', 'Debe especificar un monto').not().isEmpty();
const concept = check('concept', 'El concepto debe ser texto').optional().isString();
const idRequired = check('id', 'Debe especificar el ID').not().isEmpty();

const validateMovement = [
    typeRequired,
    amountIsNumeric,
    amountRequired,
    concept,
    validateFields,
    validateToken
];

const validateGetMovements = [
    validateToken
];

const validateUpdateMovement = [
    idRequired,
    amountIsNumeric,
    concept,
    validateFields,
    validateToken
];

const validateDeleteMovements = [
    idRequired,
    validateFields,
    validateToken
];


module.exports = {
    validateMovement,
    validateGetMovements,
    validateUpdateMovement,
    validateDeleteMovements
}