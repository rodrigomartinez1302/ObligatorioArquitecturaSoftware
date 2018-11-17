var peticiones= require("../Servicios/controladorPeticiones");
var persistencia= require("../Persistencia/controladorDB");
var configAutenticacion= require("../Config/autenticacion");

exports.enviarTransaccion = async (req) => {
    let transaccionAEnviarConGateway = await seleccionarGateway(req);
    req.body = transaccionAEnviarConGateway;
    let respuesta= await peticiones.enviarTransaccionTePagoYa(req);
    return respuesta;
};   
seleccionarGateway = async (req) => {
    let transaccionEnviar = req.body;
    let gateway = await persistencia.buscarGatewayPorCategoria(req.body.producto.categoria)
    transaccionEnviar.gateway= gateway;
    return transaccionEnviar;
};  
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

