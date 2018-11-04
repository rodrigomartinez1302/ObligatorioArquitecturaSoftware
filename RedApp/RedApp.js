var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var persistencia = require('./src/Persistencia/mongoDBConeccion');
var servicios = require('./src/Servicios/compraRutas');
var axios = require('axios');
var compraEsquema = require('./src/Modelo/compraEsquema');
const CONFIG = require('./src/Config/app');

var compra = compraEsquema.compra;

// Express Configuration
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

servicios(app);

var jwt = require('jwt-simple');
var moment = require('moment');
var config=('.src/config');

try{
    persistencia.Conectar();
} catch(error){
    console.log("Error al conectar"); 
}
app.listen(CONFIG.puerto, function() { 
    console.log('App corriendo'); }).on('error', function(err) { 
        if (err) {
             console.log('Error al levantar la app'); 
            } 
        });

//persistencia.controlFraude(123);