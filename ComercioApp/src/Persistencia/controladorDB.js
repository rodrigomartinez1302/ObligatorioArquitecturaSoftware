var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var compra= require('../Modelo/compraEsquema.js');
var gateways= require('../Modelo/categoriaCompraGatewayEsquema.js');
var db = require('../Config/db');

// Mongoose Configuration
mongoose.Promise = global.Promise;

exports.Conectar =async   function (){ 
    try {
        await mongoose.connect(db.url,
            { useNewUrlParser: true },)
            console.log('Connección a la base exitosa');
        }
        catch(error){
            console.log('Error al conectar a la base');
        }
}
exports.guardarCompra = async function(require){
    var esquemaAuxiliar = new compra(req.body);
       await esquemaAuxiliar.save(function(err){
        if (err) {
            throw new Error('Error al guardar la compra');
        } 
        else{
            console.log('Se guardó la compra con id '+ esquemaAuxiliar._id);
        }
    });
    return esquemaAuxiliar; 
}
exports.eliminarCompra = function(compraAEliminar){
    compra.deleteOne({ _id: compraAEliminar._id }, function (err) {
        if (err) {
            throw new Error('No se encontró la compra');
        }
      });
      console.log('Se eliminó la compra');
}
exports.guardarGateway = async function(gatewayAGuardar){
    var esquemaAuxiliar = new gateways(gatewayAGuardar);
    await esquemaAuxiliar.save(function(error,respuesta){
        if (error) {
            console.log(error);
        }
        else{
            console.log(respuesta);
        }
    });
}
exports.buscarGatewayPorCategoria= async function(categoria){
    let gatewayAuxiliar= await mongoose.model('CategoriaCompraGatewayEsquema');
    let gateRetorno;
    gateRetorno= await gatewayAuxiliar.findOne({ 'categoriaCompra': categoria}, 'nombreGateway').exec();
    return gateRetorno.nombreGateway;
}







/*
var GuardarTarjeta = function( a/*ca pasari aun json con los datos tarjetaAguardar){
    console.log('Entramos');
    const tarjetaAGuardar={numero:1234,vencimiento:'12/12/2018',nombreTitular:'Nombre',codigoSeguridad:1234}
    
    const esquemaprueba = new tarjetaEsquema(tarjetaAGuardar);
    esquemaprueba.save(function(error,respuesta){
        if (error) {
            console.log(error);
        }
        else{
            console.log(respuesta);
        }
    });
}


*/
//module.exports = mongoose.model('Compra', compraEsquema);
//module.exports = mongoose.model('Tarjeta', tarjetaEsquema);
//module.exports = mongoose.model('Producto', productoEsquema);
//module.exports = mongoose.model('DireccionEnvioEsquema', direccionEnvioEsquema);




