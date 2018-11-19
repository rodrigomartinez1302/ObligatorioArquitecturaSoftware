var mongoose = require('mongoose');
var transaccion= require('../Modelo/TransaccionEsquema.js');
var gateway= require('../Modelo/categoriaTransaccionGatewayEsquema.js');
var configDB = require('../Configuracion/db');

mongoose.Promise = global.Promise;

exports.Conectar = async   function (){ 
    try {
        await mongoose.connect(configDB.URL,
            { useNewUrlParser: true },)
            console.log('Connección a la base exitosa');
        }
        catch(error){
            console.log('Error al conectar a la base');
        }
}
/*exports.guardarTransaccion = async function(require){
    var esquemaAuxiliar = new transaccion(req.body);
       await esquemaAuxiliar.save(function(err){
        if (err) {
            throw new Error('Error al guardar la Transaccion');
        } 
        else{
            console.log('Se guardó la Transaccion con id '+ esquemaAuxiliar._id);
        }
    });
    return esquemaAuxiliar; 
}
exports.eliminarTransaccion = function(transaccionAEliminar){
    transaccion.deleteOne({ _id: transaccionAEliminar._id }, function (err) {
        if (err) {
            throw new Error('No se encontró la Transaccion');
        }
      });
      console.log('Se eliminó la Transaccion');
}
*/
exports.guardarGateway = async function(gatewayAGuardar){
    var esquemaAuxiliar = new gateway(gatewayAGuardar);
    await esquemaAuxiliar.save(function(error,respuesta){
        if (error) {
            throw new Error('Error al guardar el gateway');
        }
    });
}
exports.buscarGatewayPorCategoria = async function(categoria){
    let gatewayAuxiliar= await mongoose.model('CategoriaTransaccionGatewayEsquema');
    let gateRetorno;
    gateRetorno = await gatewayAuxiliar.findOne({ 'categoriaTransaccion': categoria}, 'nombreGateway').exec();
    return gateRetorno.nombreGateway;
}