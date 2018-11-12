var peticiones= require("../Servicios/controladorPeticiones");
var persistencia= require("../Persistencia/controladorDB");

exports.enviarCompraTePagoYa = async (req) => {
    let compraAEnviar= await seleccionarGateway(req);
    req.body=compraAEnviar;
    var respuesta= await peticiones.enviarCompraTePagoYa(req);
    return respuesta;
};   
seleccionarGateway = async (req) => {
    let compraEnviar= req.body;
    let gateway= await persistencia.buscarGatewayPorCategoria(req.body.producto.categoria)
    compraEnviar.gateway= gateway;
    return compraEnviar;
};  
exports.enviarDenunciaTePagoYa = async (req) => {
    var respuesta= await peticiones.enviarDenunciaTePagoYa(req);
    return respuesta;
}; 
exports.enviarChargeTePagoYa = async (req) => {
    var respuesta= await peticiones.enviarChargeBackTePagoYa(req);
    return respuesta;
}; 
