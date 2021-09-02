const { Router } = require('express');

//Validations
const { validateCreateCategory,
validateGetCategories, 
validateUpdateCategories,
validateDeleteCategory
} = require('../middlewares/categoriesValidation'); 

//Controller
const { createCategory,
getCategories,
updateCategory,
deleteCategory } = require('../controllers/categories');

const router = Router();
//Routes
router.post('/create', validateCreateCategory, createCategory); // Create
router.get('/', validateGetCategories, getCategories); // Get
router.put('/:id', validateUpdateCategories, updateCategory); // Update
router.delete('/:id', validateDeleteCategory, deleteCategory); // Delete


module.exports = router;