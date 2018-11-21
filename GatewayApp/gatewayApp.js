var express = require('express');
var bodyParser = require('body-parser');
var controladorPersistencia = require('./src/Controladores/controladorDB');
var servicios = require('./src/Rutas/rutas');
var configApp = require('./src/configuracion/app');
var controladorAutenticacion = require("./src/Controladores/controladorAutenticacion");


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

servicios(app);

try {
    controladorPersistencia.Conectar();
} catch(error) {
    console.log("Error al conectar"); 
}
app.listen(configApp.PUERTO, function() { 
    console.log('App corriendo');
}).on('error', function(err) { 
    if (err) {
        console.log('Error al levantar la app'); 
    } 
});
controladorAutenticacion.loginAutenticacion();
//controladorPersistencia.realizarCierreLotes(125, 19, 15);
