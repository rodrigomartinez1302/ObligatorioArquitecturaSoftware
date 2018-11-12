var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../Config/db');
var compra= require('../Modelo/compraEsquema');
var gateway= require('../Modelo/URLGateWayEsquema');

mongoose.Promise = global.Promise;

exports.Conectar= async function (){ 
    try {
        await mongoose.connect(db.url,
            { useNewUrlParser: true },)
            console.log('Connección a la base exitosa');
        }
        catch(error){
            console.log('Error al conectar a la base');
        }
}
//Estos dos metodos moverlos a un aquete controlador
exports.guardarCompra =async function(req){
   var esquemaAuxiliarCompra = new compra(req.body);
   await esquemaAuxiliarCompra.save();
   return esquemaAuxiliarCompra._id; 
 }   
 exports.eliminarCompra =async function(idCompraAEliminar){
    let eliminado=await compra.findByIdAndDelete(idCompraAEliminar);
    if(!eliminado){
        throw new Error('No se encontró el id');
    }
    console.log('Borre el id:'+ idCompraAEliminar);
    return idCompraAEliminar;
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
exports.buscarURLGateway =async function(nombreGateway){
    let gatewayAuxiliar = mongoose.model('URLGateway');
    let consulta= await gatewayAuxiliar.findOne({ 'nombre': nombreGateway}).exec();
    let URL=consulta.URL;
    return URL;
}
exports.buscarNombreGateway= async function(idCompra){
    let compraAuxiliar = mongoose.model('Compra');
    let consulta= await compraAuxiliar.findOne({ '_id': idCompra}).exec();
    return consulta.gateway;
}
exports.consultarIDCompraEmisor =async function(idCompra){
    let compraAuxiliar = mongoose.model('Compra');
    let consulta= await compraAuxiliar.findOne({ '_id': idCompra}).exec();
    return consulta.idCompraEmisor;
} 
exports.consultarIDCompraRed =async function(idCompra){
    let compraAuxiliar = mongoose.model('Compra');
    let consulta= await compraAuxiliar.findOne({ '_id': idCompra}).exec();
    return consulta.idCompraRed;
} 
exports.consultarIDCompraGateway =async function(idCompra){
    let compraAuxiliar = mongoose.model('Compra');
    let consulta= await compraAuxiliar.findOne({ '_id': idCompra}).exec();
    return consulta.idCompraGate;
} 




