var persistencia= require("../Persistencia/mongoDBConeccion");
 
exports.guardarTransaccion = async (req) => {
    var idTransaccion=await persistencia.guardarTransaccion(req);
    return idTransaccion;
}; 
exports.revertirTransaccion = async (req) => {
    var idTransaccion=await persistencia.eliminarTransaccion(req);
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

