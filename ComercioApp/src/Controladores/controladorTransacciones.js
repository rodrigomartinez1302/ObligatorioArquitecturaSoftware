var controladorPeticiones = require("../Controladores/controladorPeticiones");
var persistencia = require("../Controladores/controladorDB");
var cache = require("../Controladores/controladorCache");

exports.enviarTransaccion = async req => {
  let categoria = req.body.producto.categoria;
  let nombreGateway = await cache.cache(categoria);
  if (!nombreGateway) {
    nombreGateway = await seleccionarGateway(categoria);
    cache.guardarEnCache(categoria, nombreGateway);
  }
  req.body.nombreGateway = nombreGateway;
  let respuesta = await controladorPeticiones.enviarTransaccionTePagoYa(req);
  return respuesta;
};
seleccionarGateway = async categoria => {
  let gateway = await persistencia.buscarGatewayPorCategoria(categoria);
  return gateway;
};
exports.realizarDevolucionTransaccion = async req => {
  let respuesta = await controladorPeticiones.enviarDevolucionTePagoYa(req);
  return respuesta;
};
exports.procesarChargeBack = async req => {
  console.log("ChargeBack solicitado IDTransaccion:" + req.body.idTransaccion);
};
exports.solicitarCierreLotes = async req => {
  let respuesta = await controladorPeticiones.solicitarCierreLotes(req);
  return respuesta;
};