var persistencia = require("./controladorDB");
var luhn = require('luhn-alg');
var dateDiff = require('date-diff');
var configApp =require('../Configuracion/app');
var controladorPeticiones = require("./controladorPeticiones");
var controladorAutenticacion = require("./controladorAutenticacion");

exports.guardarTransaccion = async (req) => {
    await controladorAutenticacion.validacionAutenticacion(req);
    await controlarValidezTarjeta(req);
    await controlarSaldoTarjeta(req);
    await controlarBloqueoTarjeta(req);
    await controlarVencidaTarjeta(req);
    await controlarDenunciadaTarjeta(req);
    await controlarExistenciatarjeta(req);
    let idTransaccion = await persistencia.guardarTransaccion(req);
    return idTransaccion;
}; 
exports.revertirTransaccion = async (req) => {
    let idTransaccion=await persistencia.eliminarTransaccion(req);
    return idTransaccion;
}; 
exports.realizarDevolucionTransaccion = async (req) => {
    //controlarCantidadDiasTransaccion(req);
    let idTransaccion = await persistencia.realizarDevolucionTransaccion(req);
    return idTransaccion;
 }; 
 exports.realizarChargeBack = async (req) => {
    let idTransaccion;
     try {
         let respuesta = await controladorPeticiones.enviarChargeBackTePagoYa(req);
         idTransaccion = respuesta;
     } catch (error) {
         throw new Error(error.message);
     }
     try {
        await persistencia.realizarChargeBack(idTransaccion);
     } catch(error) {
         throw new Error(error.message);
     }
     return req.body.idTransaccion;
 }; 
 /*
controlarCantidadDiasTransaccion = async (req) => {
    let fechaTransaccion = new Date(await persistencia.consultarFechaTransaccion(req.params.id));
    let hoy = new Date();
    let diasTranscurridos = dateDiff(fechaTransaccion,hoy);
    console.log('fechaTransaccion'+fechaTransaccion);
    console.log(hoy);
    console.log(diasTranscurridos);
    let control =  diasTranscurridos < configApp.DIASDEVOLUCION
    if(!control){
        throw new Error('Cantidad días superado');
    }
}
*/
controlarValidezTarjeta = (req) => {
    let control= luhn(req.body.tarjeta.toString());
    if(!control){
        throw new Error('Tarjeta Inválida');
    }
}
controlarSaldoTarjeta = async (req) => {
    let montoTransaccion = req.body.monto;
    let limite= await persistencia.consultarLimiteTarjeta(req);
    let totalTransaccionesTarjeta = await persistencia.consultarTotalTransaccionesEnTarjeta(req);
    let control = totalTransaccionesTarjeta + montoTransaccion < limite;
    if(!control){
        throw new Error('Saldo insuficiente');
    }
}
controlarBloqueoTarjeta = async (req) => {
    let bloqueada = await persistencia.consultarBloqueoTarjeta(req);
    if(bloqueada){
        throw new Error('Tarjeta bloqueada ');
    }
}
controlarVencidaTarjeta = async (req) => {
    let vencida = await persistencia.consultarVencidaTarjeta(req);
    if(vencida){
        throw new Error('Tarjeta vencida');
    }
}
controlarDenunciadaTarjeta = async (req) => {
    let denunciada = await persistencia.consultarDenunciadaTarjeta(req);
    if(denunciada){
        throw new Error('Tarjeta denunciada');
    }
}
controlarExistenciatarjeta = async (req) => {
    let tarjeta = await persistencia.controlarExistenciatarjeta(req);
    if(!tarjeta){
        throw new Error('No existe la tarjeta');
    }
}


   
    

