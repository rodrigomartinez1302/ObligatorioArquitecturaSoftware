var express = require('express');
var bodyParser = require('body-parser');
var persistencia = require('./src/Persistencia/mongoDBConeccion');
var servicios = require('./src/Servicios/transaccionRutas');
var config = require('./src/Config/app');
var controladorGateway = require("./src/Controlador/controladorGateway");


// Express Configuration
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
servicios(app);

try{
    persistencia.Conectar();
} catch(error){
    console.log("Error al conectar"); 
}
app.listen(config.PUERTO, function() {
    console.log('App corriendo'); }).on('error', function(err){
        if (err) {
            console.log('Error al levantar la app'); 
        } 
    });
controladorGateway.loginAutenticacion();

//let auxRed = {idRed: '5', nombreRed: 'Red2'}
//persistencia.guardarRed(auxRed);