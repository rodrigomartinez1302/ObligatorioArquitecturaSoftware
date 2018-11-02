const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const persistencia = require('./src/Persistencia/mongoDBConeccion');
const servicios = require('./src/Servicios/compraRutas');
const CONFIG = require('./src/Config/app');
//const gateway = require('./src/Modelo/CategoriaCompraGatewayEsquema');

//Ver como dar de alta los gateway
//const auxGateway={categoriaCompra:'Ropa',nombreGateway:'gateway1'}
//console.log(auxGateway);
//persistencia.guardarGateway(auxGateway);

//persistencia.buscarGatewayPorCategoria('Electrodomesticos');

// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
servicios(app);

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

/*
let compra = require('./src/Modelo/Compra');
let mongoose = require('mongoose');
let tarjeta = require('./src/Modelo/Tarjeta');
let direccionEnvio = require('./src/Modelo/DireccionEnvio');
let producto = require('./src/Modelo/Producto');
let persistencia = require('./src/Persistencia/MongoDBConeccion');

persistencia.Conectar();

//let tePagoYa = express();

//comercio.use(bodyparser.json());
//comercio.use(bodyparser.urlencoded({ extended: true }))

//services(tePagoYa);



   var nuevaCompra=compra.crearCompra(
    tarjeta.crearTarjeta(1111,'12/10/2018','nombreTitular',1234),
    direccionEnvio.crearDireccionEnvio('Calle',1234,'Ciudad','Pais',1234),
    123,'12/12/2018',
    producto.crearProducto('NombreProducto','Categoria'),1)
    */

    

    /*var nuevaTarjeta=tarjeta.crearTarjeta(1111,'12/10/2018','nombreTitular',1234);
    persistencia.persistirTarjeta(nuevaTarjeta);

    */
    //var schema = new mongoose.Schema(nuevaTarjeta);

    /*nuevaTarjeta2= new modelo(nuevaTarjeta)
    console.log(nuevaTarjeta)
    nuevaTarjeta.save();
    */

    //nuevaCompra.save();
   /*const server = tePagoYa.listen(4000,() => {
    console.log('Hello world');
})
*/