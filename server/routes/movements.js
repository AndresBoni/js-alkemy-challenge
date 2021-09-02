const { Router } = require('express');

//Validations
const { validateMovement,
validateGetMovements, 
validateUpdateMovement,
validateDeleteMovements
} = require('../middlewares/movementsValidation'); 

//Controller
const { createMovement,
getMovements,
updateMovement,
deleteMovement } = require('../controllers/movements');

const router = Router();
//Routes
router.post('/create', validateMovement, createMovement); // Create
router.get('/:userId', validateGetMovements, getMovements); // Get
router.put('/:id', validateUpdateMovement, updateMovement); // Update
router.delete('/:id', validateDeleteMovements, deleteMovement); // Delete


module.exports = router;