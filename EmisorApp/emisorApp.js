var express = require('express');
var bodyParser = require('body-parser');
var persistencia = require('./src/Persistencia/mongoDBConeccion');
var servicios = require('./src/Servicios/compraRutas');
var config = require('./src/Config/app');
var controladorPrueba = require('./src/Controlador/controladorEmisor');


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


//let tarjeta={saldo: 300000 ,limite: 300000,numero: 5232449742219221, vencida:false, bloqueada: false,denunciada: false };
//persistencia.altaTarjeta(tarjeta);
//persistencia.consultarTotalCompras(4242424242424242);//,'2018-11-01');
//console.log(total);
//persistencia.consultarSaldo(4242424242424242);
//persistencia.actualizarSaldo(4242424242424242,123);