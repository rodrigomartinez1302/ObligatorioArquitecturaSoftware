var persistencia= require("../Persistencia/mongoDBConeccion");
var configApp=require('../Config/app');
var configAutenticacion= require("../Config/autenticacion");
var peticiones= require("../Servicios/controladorPeticiones");
 
exports.guardarTransaccion = async (req) => {
    await validacionAutenticacion(req);
    await controlFraude(req);
    var idTransaccion = await persistencia.guardarTransaccion(req);
    return idTransaccion;
}; 
exports.realizarDevolucionTransaccion = async (req) => {
   var idTransaccion = await persistencia.realizarDevolucionTransaccion(req);
   return idTransaccion;
}; 
exports.revertirTransaccion = async (req) => {
    var idTransaccion = await persistencia.eliminarTransaccion(req);
    return idTransaccion;
}; 
exports.realizarChargeBack = async (req) => {
    var idTransaccion = await persistencia.realizarChargeBack(req);
    return idTransaccion;
 }; 
controlFraude = async (req) => { 
    let cantTransacciones = await persistencia.controlFraude(req.body.tarjeta);
    console.log(cantTransacciones);
    if(cantTransacciones > configApp.CANTIDADTRX) {
        throw new Error('Control Fraude: cantidad transacciones excedida');
    }
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

