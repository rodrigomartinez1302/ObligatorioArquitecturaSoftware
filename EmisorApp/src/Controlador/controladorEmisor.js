var persistencia= require("../Persistencia/mongoDBConeccion");
var luhn = require('luhn-alg');
var DateDiff = require('date-diff');
var configApp=require('../Config/app');

exports.guardarTransaccion = async (req) => {
    await controlarValidezTarjeta(req);
    await controlarSaldoTarjeta(req);
    await controlarBloqueoTarjeta(req);
    await controlarVencidaTarjeta(req);
    await controlarDenunciadaTarjeta(req);
    let idTransaccion = await persistencia.guardarTransaccion(req);
    return idTransaccion;
}; 
exports.revertirTransaccion = async (req) => {
    //controlarCantidadDiasTransaccion(req);
    let idTransaccion=await persistencia.eliminarTransaccion(req);
    return idTransaccion;
}; 
exports.realizarDevolucionTransaccion = async (req) => {
    var idTransaccion = await persistencia.realizarDevolucionTransaccion(req);
    return idTransaccion;
 }; 
controlarCantidadDiasTransaccion = async (req) => {
    let fechaTransaccion = new Date(await persistencia.consultarFechaTransaccion(req.params.id));
    let hoy = new Date();
    let diasTranscurridos=DateDiff(fechaTransaccion,hoy);
    console.log('fechaTransaccion'+fechaTransaccion);
    console.log(hoy);
    console.log(diasTranscurridos);
    let control =  diasTranscurridos < configApp.DIASDEVOLUCION
    if(!control){
        throw new Error('Cantidad días superado');
    }
}
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
exports.guardarChargeBack = async (req) => {
    var idTransaccion = await persistencia.guardarChargeBack(req);
    return idTransaccion;
}; 


/*
actualizarSaldoTarjeta=async (req) => {
    let saldo= await persistencia.actualizarSaldoTarjeta(req);
}
*/
   
    

