const sequelize  = require('./config/sequelize'); 
const Server = require('./config/express-server');

const start = async() => {
    try{
        await sequelize.authenticate().then(()=>{
            console.log('☑ Conectado correctamente a la base de datos');
        });
        sequelize.sync({force:false}).then(()=>{
            console.log('☑ Base de datos sincronizada');
        });

        const server = new Server();
        server.listen();

    }catch(err){
        console.log('☒ Error en la conexión a la base de datos');
        console.log(err);
    }
}

start();

