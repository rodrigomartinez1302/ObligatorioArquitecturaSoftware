var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var persistencia = require('./src/Persistencia/controladorDB');
var servicios = require('./src/Servicios/compraRutas');
var config = require('./src/Config/app');

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
app.listen(config.PUERTO, function() { 
    console.log('App corriendo'); }).on('error', function(err) { 
        if (err) {
             console.log('Error al levantar la app'); 
            } 
        });







