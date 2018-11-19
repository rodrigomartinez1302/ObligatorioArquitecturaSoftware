var express = require('express');
var bodyParser = require('body-parser');
var persistencia = require('./src/Persistencia/controladorDB');
var servicios = require('./src/Servicios/transaccionRutas');
const config = require('./src/Config/app');
var controladorTePagoYa = require("./src/Controlador/controladorTePagoYa");

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
    console.log('App corriendo'); }).on('error', function(err) { 
        if(err) {
            console.log('Error al levantar la app'); } 
        });
controladorTePagoYa.loginAutenticacion();

//var json={nombre:'Red1',recurso: 'Transacciones',verbo: 'DELETE', URL:'http://localhost:11000/Transacciones'};
//persistencia.guardarRed(json);
//persistencia.buscarURLRed('Red1');

