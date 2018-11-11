const peticiones= require("../Servicios/peticionesManejador");
var persistencia= require("../Persistencia/mongoDBConeccion");

exports.enviarCompraTePagoYa = async (req) => {
    let compraAEnviar= await seleccionarGateway(req);
    req.body=compraAEnviar;
<<<<<<< HEAD
    var respuesta= await peticiones.enviarCompraTePagoYa(req);
    return respuesta;
=======
    var response= await peticiones.enviarCompraTePagoYa(req);
    //return response;
>>>>>>> c51b9c289e691451397b38ae626339284da33249
};   
seleccionarGateway = async (req) => {
    let compraEnviar= req.body;
    let gateway= await persistencia.buscarGatewayPorCategoria(req.body.producto.categoria)
    compraEnviar.gateway= gateway;
    return compraEnviar;
};  