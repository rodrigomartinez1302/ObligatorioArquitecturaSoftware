const peticiones= require("../Servicios/peticionesManejador");
var persistencia= require("../Persistencia/mongoDBConeccion");

exports.enviarCompraTePagoYa = async (req) => {
    let compraAEnviar= await seleccionarGateway(req);
    req.body=compraAEnviar;
    var response= await peticiones.enviarCompraTePagoYa(req);
    //return response;
};   
seleccionarGateway = async (req) => {
    let compraEnviar= req.body;
    let gateway= await persistencia.buscarGatewayPorCategoria(req.body.producto.categoria)
    compraEnviar.gateway= gateway;
    return compraEnviar;
};  