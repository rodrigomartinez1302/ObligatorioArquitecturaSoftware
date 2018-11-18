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

//var json={nombre:'gateway2',URL:'http://localhost:1000x/Compras'};
//persistencia.guardarGateway(json);
//persistencia.buscarNombreGateway('5be6e72740613d34d85215c8');


