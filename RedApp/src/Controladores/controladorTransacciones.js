var controladorPersistencia= require("./controladorDB");
var configApp=require('../Configuracion/app');
var controladorAutenticacion = require("./controladorAutenticacion");
var controldadorCache = require("./controladorCache");
 
exports.guardarTransaccion = async (req) => {
    let idTransaccion;
    let prefijoTarjeta;
    let nombreEmisor;

    await controladorAutenticacion.validacionAutenticacion(req);
    await controlFraude(req);
    idTransaccion = await controladorPersistencia.guardarTransaccion(req);
    prefijoTarjeta = req.body.tarjeta.toString().substring(1,4);
    prefijoTarjeta = parseInt(prefijoTarjeta);
    nombreEmisor = await controldadorCache.cache(prefijoTarjeta);
    if(!nombreEmisor) {
        try {
        nombreEmisor = await controladorPersistencia.buscarEmisorPorPrefijoTarjeta(prefijoTarjeta);
        controldadorCache.guardarEnCache(prefijoTarjeta, nombreEmisor);
        } catch (error) {
            throw new Error (error.message);
        }
    }
    let respuesta = {idTransaccion: idTransaccion, nombreEmisor: nombreEmisor};
    return respuesta;
}; 
exports.realizarDevolucionTransaccion = async (req) => {
   var idTransaccion = await controladorPersistencia.realizarDevolucionTransaccion(req);
   return idTransaccion;
}; 
exports.revertirTransaccion = async (req) => {
    var idTransaccion = await controladorPersistencia.eliminarTransaccion(req);
    return idTransaccion;
}; 
exports.realizarChargeBack = async (req) => {
    var idTransaccion = await controladorPersistencia.realizarChargeBack(req);
    return idTransaccion;
 }; 
controlFraude = async (req) => { 
    let cantTransacciones = await controladorPersistencia.controlFraude(req.body.tarjeta);
    if(cantTransacciones > configApp.CANTIDADTRX) {
        throw new Error('Control Fraude: cantidad transacciones excedida');
    }
}; 
/*
exports.loginAutenticacion = async () => {
    try {
        let respuesta = await controladorPeticiones.loginAutenticacion();
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
    let respuesta = await controladorPeticiones.validacionAutenticacion(req);
    if (!respuesta.auth) {
        throw new Error(respuesta.message);
    }
}
*/
