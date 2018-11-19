var mongoose = require('mongoose');
var configDB = require('../Configuracion/db');
var transaccion = require('../Modelo/transaccionEsquema');
var gateway = require('../Modelo/URLGateWayEsquema');
var red = require('../Modelo/URLRedEsquema');

mongoose.Promise = global.Promise;

exports.Conectar = async function (){ 
    try {
        await mongoose.connect(configDB.URL,
            { useNewUrlParser: true },)
            console.log('Connección a la base exitosa');
        }
        catch(error){
            console.log('Error al conectar a la base');
        }
}
exports.guardarTransaccion =async function(req){
   try {
       var esquemaAuxiliar = new transaccion(req.body);
       await esquemaAuxiliar.save();
       console.log('IDtransaccion:'+ esquemaAuxiliar._id);
       return esquemaAuxiliar._id;
    } catch (error) {
        throw new Error('Error al guardar la transacción')
    }   
 }   
 exports.eliminarTransaccion = async function(idTransaccionAEliminar){
    try {
        let esquemaAuxiliar = await Transaccion.findByIdAndDelete(idTransaccionAEliminar);
        if(!esquemaAuxiliar){
            throw new Error('No se encontró el ID');
        }
        console.log('IDTransaccion eliminado:'+ idTransaccionAEliminar);
        return idTransaccionAEliminar;
    } catch (error) {
        throw new Error('Error al eliminar la transacción')
    } 
}
exports.realizarDevolucionTransaccion = async function(idTransaccion){
    try {
        let esquemaAuxiliar = await transaccion.findById(idTransaccion);
        if(!esquemaAuxiliar){
            throw new Error('No se encontró el id');
        }
        esquemaAuxiliar.devolucion = true;
        await esquemaAuxiliar.save();
        console.log('IDTransaccion devolución:'+ esquemaAuxiliar._id);
        return esquemaAuxiliar._id;
    } catch (error) {
        throw new Error('Error al registrar la devolución')
    }    
}
exports.realizarChargeBack = async function(idTransaccion){
    let esquemaAuxiliar = await transaccion.findById(idTransaccion);
    esquemaAuxiliar.chargeBack = true;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion chargeback:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.revertirDevolucionTransaccion = async function(req){
    let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
    esquemaAuxiliar.devolucion = false;
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
exports.guardarRed = async function(redAGuardar){
    var esquemaAuxiliar = new red(redAGuardar);
    await esquemaAuxiliar.save(function(error,respuesta){
        if (error) {
            console.log(error);
        }
        else{
            console.log(respuesta);
        }
    });
}
exports.buscarURLRed = async function(nombreRed, recurso, verbo){
    let esquemaAuxiliar = mongoose.model('URLRed');
    let consulta = await esquemaAuxiliar.findOne({ 'nombre': nombreRed, 'recurso': recurso
    , 'verbo': verbo }).exec();
    if(!consulta) {
        throw new Error('Error al buscar la URL de la Red: '+ nombreRed);
    }
    return consulta.URL;
}
exports.consultarIDTransaccionGateway = async function(idTransaccion){
    let esquemaAuxiliar = mongoose.model('Transaccion');
    let consulta = await esquemaAuxiliar.findById(idTransaccion).exec();
    if(!consulta) {
        throw new Error('No existe la transacción')
    }
    return consulta.idTransaccionGate;
} 
exports.consultarIDTransaccionRed = async function(idTransaccion){
    let esquemaAuxiliar = mongoose.model('Transaccion');
    let consulta = await esquemaAuxiliar.findById(idTransaccion).exec();
    if(!consulta) {
        throw new Error('No existe la transacción')
    }
    return consulta.idTransaccionRed;
}
exports.consultarIDTransaccionEmisor = async function(idTransaccion){
    let esquemaAuxiliar = mongoose.model('Transaccion');
    let consulta = await esquemaAuxiliar.findById(idTransaccion).exec();
    if(!consulta) {
        throw new Error('No existe la transacción')
    }
    return consulta.idTransaccionEmisor;
}   




