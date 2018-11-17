var express = require('express');
var bodyParser = require('body-parser');
var persistencia = require('./src/Persistencia/controladorDB');
var servicios = require('./src/Servicios/autenticacionRutas');
var config = require('./src/Config/app');

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
        if (err) {
            console.log('Error al levantar la app'); 
        } 
    });

//let auxUsuario = {nombre: '1111', contraseña: '1111'}
//persistencia.registrarUsuario(auxUsuario);


