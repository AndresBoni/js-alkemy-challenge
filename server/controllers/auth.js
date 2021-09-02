const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async(req, res) => { 

    const {email, password} = req.body;
    
    try{
        // 1) Check if email exists
        const user = await User.findOne({ where: {email}}); 
        if(!user){
            return res.status(401).json({error: `No existe el usuario ${email}`});
        }
        
        // 2) Compare password
        const compare = await bcryptjs.compare(password, user.password); 
        if(!compare){
            return res.status(401).json({error: 'Datos incorrectos'});

        }else{ 
             // 3) Generate token
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_SECRET_CODE, { expiresIn: '24h'});
            return res.status(200).json({token: token});
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor', err});
    }

}

const register = async(req, res) => { 

    const {email, password} = req.body;
    
    // 1) Check if email already exists
    const user = await User.findOne({ where: {email}}); 
    if(user){
        return res.status(401).json({error: 'Ya existe un usuario con ese email'});
    }
    
    // 2) Encrypt password
    const salt = bcryptjs.genSaltSync(); 
    pwd = bcryptjs.hashSync(password, salt); 

    // 3) Create user
    await User.create({ 
        email,
        password: pwd
    }).then(() => {
        res.status(200).json({msg: 'Usuario creado con éxito.'});
        console.log(token);
    }).catch((err) => {
        console.log(err);
        return res.status(401).json({error: 'No se pudo crear el usuario', err});
    });
}

module.exports = {
    login,
    register
}