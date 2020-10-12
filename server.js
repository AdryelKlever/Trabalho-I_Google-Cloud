'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = portServer(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Atividade Google Cloud",
        version: "0.0.1"
    });
});
app.use('/', route);

server.listen(port);
console.log('API rodando na porta ' + port);

function portServer(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}

function onError(error){
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 
        'Pipe ' + port : 
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' Requer Privilégios Elevados!');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' Já está em uso!');
            process.exit(1);
            break;
        default:
        throw error;

    }
}