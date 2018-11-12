var persistencia= require("../Persistencia/mongoDBConeccion");
var luhn = require('luhn-alg');
var DateDiff = require('date-diff');
var configApp=require('../Config/app');

exports.guardarCompra = async (req) => {
    await controlarValidezTarjeta(req);
    await controlarSaldoTarjeta(req);
    await controlarBloqueoTarjeta(req);
    await controlarVencidaTarjeta(req);
    await controlarDenunciadaTarjeta(req);
    var idCompra = await persistencia.guardarCompra(req);
    return idCompra;
}; 
exports.eliminarCompra = async (req) => {
    //controlarCantidadDiasCompra(req);
    let idCompra=await persistencia.eliminarCompra(req);
    return idCompra;
}; 
controlarCantidadDiasCompra = async (req) => {
    let fechaCompra = new Date(await persistencia.consultarFechaCompra(req.params.id));
    let hoy = new Date();
    let diasTranscurridos=DateDiff(fechaCompra,hoy);
    console.log('fechaCompra'+fechaCompra);
    console.log(hoy);
    console.log(diasTranscurridos);
    let control =  diasTranscurridos < configApp.DIASDEVOLUCION
    if(!control){
        throw new Error('Cantidad días superado');
    }
}
controlarValidezTarjeta= (req) => {
    let control= luhn(req.body.tarjeta.toString());
    if(!control){
        throw new Error('Tarjeta Inválida');
    }
}
controlarSaldoTarjeta=async (req) => {
    let montoCompra = req.body.monto;
    let limite= await persistencia.consultarLimiteTarjeta(req);
    let totalComprasTarjeta = await persistencia.consultarTotalComprasEnTarjeta(req);
    let control = totalComprasTarjeta + montoCompra < limite;
    if(!control){
        throw new Error('Saldo insuficiente');
    }
}
controlarBloqueoTarjeta=async (req) => {
    let bloqueada= await persistencia.consultarBloqueoTarjeta(req);
    if(bloqueada){
        throw new Error('Tarjeta bloqueada ');
    }
}
controlarVencidaTarjeta=async (req) => {
    let vencida= await persistencia.consultarVencidaTarjeta(req);
    if(vencida){
        throw new Error('Tarjeta vencida');
    }
}
controlarDenunciadaTarjeta=async (req) => {
    let denunciada= await persistencia.consultarDenunciadaTarjeta(req);
    if(denunciada){
        throw new Error('Tarjeta denunciada');
    }
}
exports.guardarChargeBack = async (req) => {
    var idCompra = await persistencia.guardarChargeBack(req);
    return idCompra;
}; 


/*
actualizarSaldoTarjeta=async (req) => {
    let saldo= await persistencia.actualizarSaldoTarjeta(req);
}
*/
   
    

