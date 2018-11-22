var mongoose = require('mongoose');
var configDB = require('../Configuracion/db');
var Transaccion = require('../Modelo/transaccionEsquema');
var Gateway = require('../Modelo/URLGateWayEsquema');
var Red = require('../Modelo/URLRedEsquema');
var Emisor = require('../Modelo/URLEmisorEsquema');

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
       var transaccion = new Transaccion(req.body);
       await transaccion.save();
       console.log('IDtransaccion:'+ transaccion._id);
       return transaccion._id;
    } catch (error) {
        throw new Error('Error al guardar la transacción')
    }   
 }   
 exports.eliminarTransaccion = async function(idTransaccionAEliminar){
    try {
        let transaccion = await Transaccion.findByIdAndDelete(idTransaccionAEliminar);
        if(!transaccion){
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
        let transaccion = await Transaccion.findById(idTransaccion);
        if(!transaccion){
            throw new Error('No se encontró el id');
        }
        transaccion.devolucion = true;
        await transaccion.save();
        console.log('IDTransaccion devolución:'+ transaccion._id);
        return transaccion._id;
    } catch (error) {
        throw new Error('Error al registrar la devolución')
    }    
}
exports.realizarChargeBack = async function(idTransaccion){
    let transaccion = await transaccion.findById(idTransaccion);
    transaccion.chargeBack = true;
    await transaccion.save();
    console.log('IDTransaccion chargeback:'+ transaccion._id);
    return transaccion._id;
}
exports.revertirDevolucionTransaccion = async function(req){
    let transaccion = await transaccion.findById(req.body.idTransaccion);
    transaccion.devolucion = false;
    await transaccion.save();
    console.log('IDTransaccion devolución:'+ transaccion._id);
    return transaccion._id;
}
exports.guardarGateway = async function(gatewayAGuardar){
    var gateway = new Gateway(gatewayAGuardar);
    await gateway.save(function(error,respuesta){
        if (error) {
            console.log(error);
        }
        else{
            console.log(respuesta);
        }
    });
}
exports.buscarURLGateway = async function(nombreGateway, recurso, verbo){
    let URLGateway = mongoose.model('URLGateway');
    let consulta = await URLGateway.findOne({ 'nombre': nombreGateway, 'recurso': recurso
    , 'verbo': verbo }).exec();
    if(!consulta) {
        throw new Error('Error al buscar la URL del gateway: '+ nombreGateway);
    }
    return consulta.URL;
}

exports.buscarNombreGateway = async function(idTransaccion){
    let transaccion = mongoose.model('Transaccion');
    let consulta = await transaccion.findOne({ '_id': idTransaccion}).exec();
    return consulta.gateway;
}
exports.guardarRed = async function(redAGuardar){
    var red = new Red(redAGuardar);
    await red.save(function(error,respuesta){
        if (error) {
            console.log(error);
        }
        else{
            console.log(respuesta);
        }
    });
}
exports.buscarURLRed = async function(nombreRed, recurso, verbo){
    let URLRed = mongoose.model('URLRed');
    
    let consulta = await URLRed.findOne({ 'nombre': nombreRed, 'recurso': recurso
    , 'verbo': verbo }).exec();
    if(!consulta) {
        throw new Error('Error al buscar la URL de la Red: '+ nombreRed);
    }
    return consulta.URL;
}
exports.consultarIDTransaccionGateway = async function(idTransaccion){
    let transaccion = mongoose.model('Transaccion');
    let consulta = await transaccion.findById(idTransaccion).exec();
    if(!consulta) {
        throw new Error('No existe la transacción')
    }
    return consulta.idTransaccionGate;
} 
exports.consultarIDTransaccionRed = async function(idTransaccion){
    let transaccion = mongoose.model('Transaccion');
    let consulta = await transaccion.findById(idTransaccion).exec();
    if(!consulta) {
        throw new Error('No existe la transacción')
    }
    return consulta.idTransaccionRed;
}
exports.consultarIDTransaccionEmisor = async function(idTransaccion){
    let transaccion = mongoose.model('Transaccion');
    let consulta = await transaccion.findById(idTransaccion).exec();
    if(!consulta) {
        throw new Error('No existe la transacción')
    }
    return consulta.idTransaccionEmisor;
} 

exports.guardarEmisor = async function(emisorAGuardar){
    var emisor = new Emisor(emisorAGuardar);
    await emisor.save(function(error,respuesta){
        if (error) {
            console.log(error);
        }
        else{
            console.log(respuesta);
        }
    });
}
exports.buscarURLEmisor = async function(nombreEmisor, recurso, verbo){
    let URLEmisor = mongoose.model('URLEmisor');
    let consulta = await URLEmisor.findOne({ 'nombre': nombreEmisor, 'recurso': recurso
    , 'verbo': verbo }).exec();
    if(!consulta) {
        throw new Error('Error al buscar la URL de la Emisor: '+ nombreEmisor);
    }
    return consulta.URL;
}




