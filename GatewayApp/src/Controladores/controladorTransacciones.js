var persistencia = require("./controladorDB");
var controldadorCache = require("./controladorCache");
var controladorAutenticacion = require("./controladorAutenticacion");

exports.guardarTransaccion = async (req) => {
    await controladorAutenticacion.validacionAutenticacion(req);
    let idTransaccion = await persistencia.guardarTransaccion(req);
    let prefijoTarjeta = req.body.prefijoTarjeta;
    let nombreRed = await controldadorCache.cache(prefijoTarjeta);
    if(!nombreRed) {
        nombreRed = await persistencia.buscarRedPorPrefijoTarjeta(prefijoTarjeta);
        controldadorCache.guardarEnCache(prefijoTarjeta, nombreRed);
    }
    let respuesta = {idTransaccion: idTransaccion, nombreRed: nombreRed};
    return respuesta;
}; 
exports.revertirTransaccion = async (req) => {
    var idTransaccion = await persistencia.eliminarTransaccion(req);
    return idTransaccion;
}; 
exports.realizarDevolucionTransaccion = async (req) => {
    var idTransaccion = await persistencia.realizarDevolucionTransaccion(req);
    return idTransaccion;
 }; 
 exports.realizarChargeBack = async (req) => {
    var idTransaccion = await persistencia.realizarChargeBack(req);
    return idTransaccion;
 }; 
 /*
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
*/


