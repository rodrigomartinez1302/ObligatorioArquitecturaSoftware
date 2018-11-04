const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const persistencia = require('./src/Persistencia/mongoDBConeccion');
const servicios = require('./src/Servicios/compraRutas');
const config = require('./src/Config/app');
//const gateway = require('./src/Modelo/CategoriaCompraGatewayEsquema');

//Ver como dar de alta los gateway
//const auxGateway={categoriaCompra:'Ropa',nombreGateway:'gateway1'}
//console.log(auxGateway);
//persistencia.guardarGateway(auxGateway);

// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
servicios(app);

try{
    persistencia.Conectar();
} catch(error){
    console.log("Error al conectar"); 
}
app.listen(config.puerto, function() { 
    console.log('App corriendo'); }).on('error', function(err) { 
        if (err) {
             console.log('Error al levantar la app'); 
            } 
        });







