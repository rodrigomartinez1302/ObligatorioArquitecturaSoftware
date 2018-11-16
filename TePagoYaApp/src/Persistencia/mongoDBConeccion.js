var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../Config/db');
var transaccion = require('../Modelo/transaccionEsquema');
var gateway = require('../Modelo/URLGateWayEsquema');

mongoose.Promise = global.Promise;

exports.Conectar = async function (){ 
    try {
        await mongoose.connect(db.URL,
            { useNewUrlParser: true },)
            console.log('Connección a la base exitosa');
        }
        catch(error){
            console.log('Error al conectar a la base');
        }
}
exports.guardarTransaccion =async function(req){
   var esquemaAuxiliar = new transaccion(req.body);
   await esquemaAuxiliar.save();
   console.log('IDtransaccion:'+ esquemaAuxiliar._id);
   return esquemaAuxiliar._id;
 }   
 exports.eliminarTransaccion = async function(idTransaccionAEliminar){
    let eliminado = await Transaccion.findByIdAndDelete(idTransaccionAEliminar);
    if(!eliminado){
        throw new Error('No se encontró el ID');
    }
    console.log('IDTransaccion eliminado:'+ idTransaccionAEliminar);
    return idTransaccionAEliminar;
}
exports.realizarDevolucionTransaccion = async function(req){
    let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
    esquemaAuxiliar.devolucion = true;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion devolución:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.guardarGateway = async function(gatewayAGuardar){
    var esquemaAuxiliar = new gateway(gatewayAGuardar);
    await esquemaAuxiliar.save(function(error,respuesta){
        if (error) {
            console.log(error);
        }
        else{
            console.log(respuesta);
        }
    });
}
exports.buscarURLGateway = async function(nombreGateway){
    let esquemaAuxiliar = mongoose.model('URLGateway');
    let consulta = await esquemaAuxiliar.findOne({ 'nombre': nombreGateway}).exec();
    let URL = consulta.URL;
    return URL;
}
exports.buscarNombreGateway = async function(idTransaccion){
    let esquemaAuxiliar = mongoose.model('Transaccion');
    let consulta = await esquemaAuxiliar.findOne({ '_id': idTransaccion}).exec();
    return consulta.gateway;
}
exports.consultarIDTransaccionEmisor = async function(idTransaccion){
    let esquemaAuxiliar = mongoose.model('Transaccion');
    let consulta = await esquemaAuxiliar.findOne({ '_id': idTransaccion}).exec();
    return consulta.idTransaccionEmisor;
} 
exports.consultarIDTransaccionRed = async function(idTransaccion){
    let esquemaAuxiliar = mongoose.model('Transaccion');
    let consulta = await esquemaAuxiliar.findOne({ '_id': idTransaccion}).exec();
    if(!consulta){
        throw new Error('No existe la transacción')
    }
    return consulta.idTransaccionRed;
} 
exports.consultarIDTransaccionGateway = async function(idTransaccion){
    let esquemaAuxiliar = mongoose.model('Transaccion');
    let consulta = await esquemaAuxiliar.findOne({ '_id': idTransaccion}).exec();
    return consulta.idTransaccionGate;
} 




