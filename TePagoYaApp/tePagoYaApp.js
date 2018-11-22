var express = require('express');
var bodyParser = require('body-parser');
var persistencia = require('./src/Controladores/controladorDB');
var servicios = require('./src/Rutas/rutas');
var configApp = require('./src/configuracion/app');
var controladorAutenticacion = require("./src/Controladores/controladorAutenticacion");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

servicios(app);

try {
    persistencia.Conectar();
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
//var json={nombre:'emisor1', recurso: 'Transacciones',
//verbo: 'POST', URL:'http://localhost:12000/Transacciones'};
//persistencia.guardarEmisor(json);
//persistencia.buscarURLGateway('gateway1','Transacciones','POST');


