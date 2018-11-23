var express = require('express');
var bodyParser = require('body-parser');
var controladorPersistencia = require('./controladorDB');
var servicios = require('../Rutas/rutas');
var configApp = require('../Configuracion/app');
var controladorAutenticacion = require("./controladorAutenticacion");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

servicios(app);

exports.inicializarApp= async () => { 
try {
    await controladorPersistencia.Conectar();
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
}

/*let auxUsuario = {nombre: '5555', contraseña: '5555', rol: 'emisor'}
persistencia.registrarUsuario(auxUsuario);
*/


