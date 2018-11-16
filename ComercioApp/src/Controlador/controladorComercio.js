var peticiones= require("../Servicios/controladorPeticiones");
var persistencia= require("../Persistencia/controladorDB");

exports.enviarTransaccionTePagoYa = async (req) => {
    let transaccionAEnviar = await seleccionarGateway(req);
    req.body = transaccionAEnviar;
    var respuesta= await peticiones.enviarTransaccionTePagoYa(req);
    return respuesta;
};   
seleccionarGateway = async (req) => {
    let transaccionEnviar = req.body;
    let gateway = await persistencia.buscarGatewayPorCategoria(req.body.producto.categoria)
    transaccionEnviar.gateway= gateway;
    return transaccionEnviar;
};  
exports.enviarDevolucionTePagoYa = async (req) => {
    var respuesta = await peticiones.enviarDevolucionTePagoYa(req);
    return respuesta;
}; 
exports.enviarChargeTePagoYa = async (req) => {
    var respuesta = await peticiones.enviarChargeBackTePagoYa(req);
    return respuesta;
}; 
