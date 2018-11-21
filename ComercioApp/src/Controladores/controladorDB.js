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
exports.guardarGateway = async function(gatewayAGuardar){
    let gateway = new gateway(gatewayAGuardar);
    await gateway.save(function(error,respuesta){
        if (error) {
            throw new Error('Error al guardar el gateway');
        }
    });
}
exports.buscarGatewayPorCategoria = async function(categoria){
    let gateway= await mongoose.model('CategoriaTransaccionGatewayEsquema');
    let gateRetorno;
    gateRetorno = await gateway.findOne({ 'categoriaTransaccion': categoria}, 'nombreGateway').exec();
    return gateRetorno.nombreGateway;
}