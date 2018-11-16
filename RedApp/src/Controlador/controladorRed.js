var persistencia= require("../Persistencia/mongoDBConeccion");
var configApp=require('../Config/app');
 
exports.guardarTransaccion = async (req) => {
     if(await controlFraude(req)){
    var idTransaccion=await persistencia.guardarTransaccion(req);
    return idTransaccion;
    }else{
        throw new Error('limite Transacciones excedida');
    }
}; 
exports.realizarDevolucionTransaccion = async (req) => {
   var idTransaccion = await persistencia.realizarDevolucionTransaccion(req);
   return idTransaccion;
}; 
exports.revertirTransaccion = async (req) => {
    var idTransaccion=await persistencia.eliminarTransaccion(req);
    return idTransaccion;
}; 
controlFraude = async (req) => { 
    var cantTransacciones=await persistencia.controlFraude(req.body.tarjeta);
    //desmarcar esta linea para la entrega
    //return cantTransacciones<configApp.CANTIDADTRX;
    return true;
}; 

