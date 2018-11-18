var persistencia= require("../Persistencia/mongoDBConeccion");
var luhn = require('luhn-alg');
var DateDiff = require('date-diff');
var configApp=require('../Config/app');
var peticiones= require("../Servicios/controladorPeticiones");
var configAutenticacion= require("../Config/autenticacion");

exports.guardarTransaccion = async (req) => {
    await validacionAutenticacion(req);
    await controlarValidezTarjeta(req);
    await controlarSaldoTarjeta(req);
    await controlarBloqueoTarjeta(req);
    await controlarVencidaTarjeta(req);
    await controlarDenunciadaTarjeta(req);
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
         let respuesta = await peticiones.enviarChargeBackTePagoYa(req);
         idTransaccion = respuesta;
         console.log(respuesta.data);
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
exports.loginAutenticacion = async () => {
    try {
        let respuesta = await peticiones.loginAutenticacion();
        configAutenticacion.TOKEN = respuesta.data.token;
        if(!respuesta.data.auth) {
            throw new Error('Usuario no autenticado')
        } else {
            console.log('Autenticación exitosa');
        }
    }
    catch(error) {
        console.log(error.message);
    } 
};
validacionAutenticacion = async (req) => {
    let respuesta = await peticiones.validacionAutenticacion(req);
    if (!respuesta.auth) {
        throw new Error(respuesta.message);
    }
}

   
    

