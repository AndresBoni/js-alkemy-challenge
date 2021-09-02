var jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    //1)Get header's token
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        // 2) verify token
        try{
            const user = jwt.verify(req.token, process.env.JWT_SECRET_CODE);
            req.user = user;
        }catch(err){
            return res.status(403).json({error: 'Token Inválido - Debe autenticarse'});
        }
    }else {
        return res.status(403).json({error: 'Token Inválido - Debe autenticarse'});
    }
    
    next(); // 3) If ok, continue
}

module.exports = {
    validateToken
};

