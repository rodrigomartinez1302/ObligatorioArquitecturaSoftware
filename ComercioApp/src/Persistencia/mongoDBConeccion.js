var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var compras= require('../Modelo/compraEsquema.js');
var gateways= require('../Modelo/categoriaCompraGatewayEsquema.js');
var db = require('../Config/db');

// Mongoose Configuration
mongoose.Promise = global.Promise;

exports.Conectar =   function (){ 
 mongoose.connect(
    db.url,
    { useNewUrlParser: true },).then(() => {
    console.log('Connección a la base exitosa');
  }).catch(() => {
    console.log('Error al conectar a la base');
  });
}

exports.guardarCompra =  function(compraAGuardar){
    var esquemaAuxiliar = new compras(compraAGuardar);
      /* esquemaAuxiliar.save(function(err){
        if (err) {
            throw new handleError('Error al guardar la compra');
        } 
    });
    */
}
exports.eliminarCompra = function(compraAEliminar){
    compras.deleteOne({ _id: compraAEliminar.params.id }, function (err) {
        if (err) throw new handleError('No se encontró la compra');
        //console.log('Compra eliminada');
      });
}
exports.guardarGateway = function(gatewayAGuardar){
    var esquemaAuxiliar = new gateways(gatewayAGuardar);
    esquemaAuxiliar.save(function(error,respuesta){
        if (error) {
            console.log(error);
        }
        else{
            console.log(respuesta);
        }
    });
}
exports.buscarGatewayPorCategoria = function(categoria){
    var gatewayAuxiliar = mongoose.model('CategoriaCompraGatewayEsquema');
    gatewayAuxiliar.findOne({ 'categoriaCompra': categoria}, 'nombreGateway', function (err, gateway) {
        if (err) return handleError(err);
        console.log('Gateway:'+ gateway.nombreGateway);
      });
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




