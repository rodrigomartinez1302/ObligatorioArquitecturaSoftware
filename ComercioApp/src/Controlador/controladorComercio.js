var peticiones= require("../Servicios/controladorPeticiones");
var persistencia= require("../Persistencia/controladorDB");
var configAutenticacion= require("../Config/autenticacion");
var cache = require("../Persistencia/controladorCache");

exports.enviarTransaccion = async (req) => {
    let categoria = req.body.producto.categoria;
    let nombreGateway = await cache.cache(categoria);
    if(!nombreGateway) {
        nombreGateway = await seleccionarGateway(categoria);
        cache.guardarEnCache(categoria, nombreGateway);
    }
    req.body.gateway = nombreGateway;
    let respuesta= await peticiones.enviarTransaccionTePagoYa(req);
    return respuesta;
};   
seleccionarGateway = async (categoria) => {
    let gateway = await persistencia.buscarGatewayPorCategoria(categoria);
    return gateway;
};  
/*
seleccionarGateway = async (req) => {
    let transaccionEnviar = req.body;
    let gateway = await persistencia.buscarGatewayPorCategoria(req.body.producto.categoria)
    transaccionEnviar.gateway= gateway;
    return transaccionEnviar;
};  
*/
exports.realizarDevolucionTransaccion = async (req) => {
    let respuesta = await peticiones.enviarDevolucionTePagoYa(req);
    return respuesta;
}; 
exports.procesarChargeBack = async (req) => {
    console.log('ChargeBack solicitado IDTransaccion:'+ req.body.idTransaccion);
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

