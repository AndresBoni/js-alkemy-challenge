const { Router } = require('express');
const { validateLogin, validateRegister } = require('../middlewares/authValidation'); //Validations
const { login, register } = require('../controllers/auth'); //Controller

const router = Router();
//Routes
router.post('/login', validateLogin, login); //Login
router.post('/register', validateRegister, register); //Register

module.exports = router;