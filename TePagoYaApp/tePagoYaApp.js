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
    var conexion= new persistencia.Conectar();
}catch(error){
 console.log("Error al conectar");   
}

app.listen(CONFIG.puerto, function() { 
    console.log('App corriendo'); }).on('error', function(err) { 
        if (err) {
             console.log('Error al levantar la app'); 
            } 
        });
        
//persistencia.cerrarLotes();
        
/*
crearToken = function(compraRecibida){
var auxToke = {
    sub : compra.compra,
    iat : moment.unix(),
    exp : moment().add(14,'days').unix()
};
return jwt.encode(auxToke,config.TOKEN_SECRETO);
}

var resultado=crearToken();
console.log(resultado);

//persistencia.cerrarLotes();

// const pruebaCerda = async () => {
//     try {
//         const response = await axios.get('https://localhost:8000/Probar');
//         console.log(response.data);
//     } catch (error) {
//         console.log(error);   
//     }
// }

// pruebaCerda();




/*
var nuevaCompra=compra.crearCompra(
    tarjeta.crearTarjeta(1111,'12/10/2018','nombreTitular',1234),
    direccionEnvio.crearDireccionEnvio('Calle',1234,'Ciudad','Pais',1234),
    123,'12/12/2018',
    producto.crearProducto('NombreProducto','Categoria'),1)
console.log(nuevaCompra);

MongoClient.connect(db.url,(err,database)=>{
    if(err) return console.log(err)
    require('./src/Servicios')(app,database);
    app.listen(port,() => {console.log('Estamos escuhando el puerto '+ port)})

});




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