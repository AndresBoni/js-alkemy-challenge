const Category = require('../models/Category');

const getCategories = async (req, res) => {
    await Category.findAll().then(categories =>{
        if(categories == 0){
            res.status(404).json({msg: 'No hay categorías definidas'});
        }else{
            res.json({categories});
        }
    }).catch(error=>{
        res.status(500).json({error});
    });
}

const createCategory = async (req, res) => {

    //Verificamos autorización para crear categoría
    if(req.body.adminCode != process.env.JWT_SECRET_CODE ){
        return res.status(400).json({error: 'Acción Denegada, no tiene permisos suficientes'});
    }

    const categoryCheck = await Category.findOne({ where: {name: req.body.name}});

    if(categoryCheck){
        return res.status(400).json({error: 'Ya existe esa categoría en la base de datos'});
    }

    await Category.create({
        name: req.body.name
    }).then(category => {
        res.status(201).json({
            msg: 'Categoría creado con éxito',
            category
        });
    }).catch(error => {
        res.status(500).json(error);
    })
}

const updateCategory = async (req, res) => {

    //Verificamos autorización para actualizar categoría
    if(req.body.adminCode != process.env.JWT_SECRET_CODE ){
        return res.status(400).json({error: 'Acción Denegada, no tiene permisos suficientes'});
    }
    
    const category = await Category.findByPk(req.params.id);
    if(!category){
        return res.status(404).json({error: 'No se encontró categoría con ese ID'});
    }

    await Category.update({
        name: req.body.name,
    },{
        where: {
            id: req.params.id
        }
    }).then(result => {
        if(result == 0){
            res.status(401).json({error: 'No se modificó ninguna categoría'});
        }else{
            res.json({msg: 'Categoría modificada con éxito'});
        }
        
    }).catch(error => {
        res.status(500).json(error);
    });
}

const deleteCategory = async (req, res) => {

    //Verificamos autorización para borrar categoría
    if(req.body.adminCode != process.env.JWT_SECRET_CODE ){
        return res.status(400).json({error: 'Acción Denegada, no tiene permisos suficientes'});
    }

    const category = await Category.findByPk(req.params.id);
    if(!category){
        return res.status(404).json({error: 'No se encontró categoría con ese ID'});
    }

    await Category.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        if(result){
            res.json({msg: 'Categoría eliminada correctamente'});
        }else{
            res.status(404).json({error: 'No se encontró género con ese ID'});
        }
    }).catch((error)=>{
        res.status(500).json(error);
    });
    
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory

}
