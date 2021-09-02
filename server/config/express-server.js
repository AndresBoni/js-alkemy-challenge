const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/auth',
            movements: '/movements',
            categories: '/categories'
        }
        //Middlewares
        this.middleware();
        //Rutas
        this.routes();
    }

    middleware(){

        this.app.use(cors({origin:process.env.WEBSITE_HOST}));

        //Lectura y parseo del body a formato json
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.movements, require('../routes/movements'));
        this.app.use(this.paths.categories, require('../routes/categories'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`☑ Servidor corriendo en http://localhost:${this.port}`);
          });
    }
}

module.exports = Server;