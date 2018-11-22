var controladorPersistencia = require("./controladorDB");
var controldadorCache = require("./controladorCache");
var controladorAutenticacion = require("./controladorAutenticacion");
var configApp = require('../Configuracion/app');

exports.guardarTransaccion = async (req) => {
    try {
        await controladorAutenticacion.validacionAutenticacion(req);
    } catch (error) {
        throw new Error(error.message);
    }
    let idTransaccion = await controladorPersistencia.guardarTransaccion(req);
    let prefijoTarjeta = req.body.prefijoTarjeta;
    let nombreRed = await controldadorCache.cache(prefijoTarjeta);
    if(!nombreRed) {
        nombreRed = await controladorPersistencia.buscarRedPorPrefijoTarjeta(prefijoTarjeta);
        controldadorCache.guardarEnCache(prefijoTarjeta, nombreRed);
    }
    let respuesta = {idTransaccion: idTransaccion, nombreRed: nombreRed};
    return respuesta;
}; 
exports.revertirTransaccion = async (req) => {
    var idTransaccion = await controladorPersistencia.eliminarTransaccion(req);
    return idTransaccion;
}; 
exports.realizarDevolucionTransaccion = async (req) => {
    var idTransaccion = await controladorPersistencia.realizarDevolucionTransaccion(req);
    return idTransaccion;
 }; 
 exports.realizarChargeBack = async (req) => {
    var idTransaccion = await controladorPersistencia.realizarChargeBack(req);
    return idTransaccion;
 }; 
 exports.realizarCierreLotes = async (req) => {
    var idTransaccion = await controladorPersistencia.realizarCierreLotes(req);
    return idTransaccion;
 };
 exports.solicitarCierreLotes = async (req) => {
     let RUT = req.query.RUT;
     try{
     let resultado = await controladorPersistencia.realizarCierreLotes(RUT, configApp.HORA_CIERRE_LOTES
        , configApp.MIN_CIERRE_LOTES);
        return resultado;
     } catch (error) {
         throw new Error(error.message);
     }
}; 

