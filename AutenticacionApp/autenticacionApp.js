var express = require('express');
var bodyParser = require('body-parser');
var persistencia = require('./src/Controladores/controladorDB');
var servicios = require('./src/Rutas/rutas');
var confignApp = require('./src/Configuracion/app');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
servicios(app);

try{
    persistencia.Conectar();
} catch(error){
    console.log("Error al conectar"); 
}
app.listen(confignApp.PUERTO, function() {
    console.log('App corriendo'); }).on('error', function(err) {
        if (err) {
            console.log('Error al levantar la app'); 
        } 
    });


/*let auxUsuario = {nombre: '5555', contraseña: '5555', rol: 'emisor'}
persistencia.registrarUsuario(auxUsuario);
*/

