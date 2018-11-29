var axios = require("axios");
var configTePagoYa = require("../Configuracion/tePagoYa");
var configApp = require("../Configuracion/app");
var configAutenticacion = require("../Configuracion/autenticacion");

exports.enviarTransaccionTePagoYa = async req => {
  let transaccionEnviar = req.body;
  transaccionEnviar.RUT = configApp.RUT;
  transaccionEnviar.comercio = configApp.NOMBRE_COMERCIO;
  let header = { headers: { token: configAutenticacion.TOKEN } };
  var respuesta = await axios.post(
    configTePagoYa.URLTRANSACCION,
    transaccionEnviar,
    header
  );
  return respuesta.data;
};
exports.enviarDevolucionTePagoYa = async req => {
  let devolucionEnviar = req.body;
  let respuesta = await axios.put(
    configTePagoYa.URLDEVOLUCION,
    devolucionEnviar
  );
  return respuesta.data;
};
exports.loginAutenticacion = async () => {
  let usuario = {
    nombre: configAutenticacion.NOMBRE_USUARIO,
    contraseña: configAutenticacion.CONTRASEÑA
  };
  let respuesta = await axios.post(configAutenticacion.URL_LOGIN, usuario);
  return respuesta;
};
exports.solicitarCierreLotes = async req => {
  let parametro1 = configApp.RUT;
  let parametro2 = req.params.gateway;
  let respuesta = await axios.get(
    configTePagoYa.URLCIERRELOTES +
      "?RUT=" +
      parametro1 +
      "&gateway=" +
      parametro2
  );
  return respuesta.data;
};