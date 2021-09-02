const Movement = require('../models/Movement');
require('../models/Associations');

const createMovement = async(req, res) => {
    await Movement.create({ 
        type: req.body.type,
        amount: req.body.amount,
        concept: req.body.concept,
        date: Date.parse(req.body.release_date),
        userId: req.user.id,
        categoryId: req.body.categoryId
    }).then(detail => {
        res.status(200).json({ 
            msg: 'Movimiento creado con éxito.',
            detail
        });
    }).catch(() => {
        return res.status(401).json({error: 'No se pudo crear el movimiento'});
    });
}

const getMovements = async(req, res) => {

    console.log(req.params.userId)
    if(!req.params.userId){
        return res.status(404).json({error:'No se encontraro el id de usuario'});
    }

    await Movement.findAll({
        where: {
            userId: req.params.userId,
        } 
    }).then( movements => {
        if(movements.length > 1){
            console.log(movements)
            res.json(movements);
        }else{
            res.status(404).json({error:'No se encontraron movimientos'});
        }
    }).catch((err)=>{
        res.status(500).json({error:'Error al obtener los movimientos'});
        console.log(err)
    })
}

const updateMovement = async(req, res) => {


    const id = req.params.id;
    const movement = await Movement.findOne({ where: {id}}); 
    if(!movement){
        return res.status(401).json({error: 'No se encontró movimiento con ese ID'});
    }
    

    await Movement.update({ 
        type: req.body.type,
        amount: req.body.amount,
        concept: req.body.concept,
        date: Date.parse(req.body.release_date),
        categoryId: req.body.categoryId
    } , {
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    }).then(result => {
        if(result == 1){
            res.json({msg: 'Movimiento modificado con éxito'});
        }else{
            res.status(404).json({error: 'No se modificó ningun movimiento'});
        }
    }).catch((error)=> {
       res.status(500).json({error});
    });
   
}

const deleteMovement = async(req, res) => {

    console.log(req.params.id)
    if(!req.params.id){
        return res.status(404).json({error:'No se encontraro movimiento a elimiar'});
    }
    
    //Delete movement where {id}
    await Movement.destroy({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    }).then(result => {
        if(result){
            res.json({msg: 'Movimiento eliminado correctamente'});
        }else{
            res.status(404).json({error: 'No se encontró movimiento con ese ID'});
        }
    }).catch((error)=>{
        res.status(500).json(error);
    });
        
}
module.exports = {
    createMovement,
    getMovements,
    updateMovement,
    deleteMovement
}