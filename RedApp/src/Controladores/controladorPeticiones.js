var axios = require("axios");
var configAutenticacion = require("../Configuracion/autenticacion");
var configTePagoYa = require("../Configuracion/tePagoYa");

exports.enviarTransaccionTePagoYa = async cuerpoMensaje => {
  let header = { headers: { token: configAutenticacion.TOKEN } };
  let respuesta = await axios.post(
    configTePagoYa.URLTRANSACCION,
    cuerpoMensaje,
    header
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
exports.validacionAutenticacion = async req => {
  let token = { token: req.headers["token"] };
  let respuesta = await axios.post(configAutenticacion.URL_VALIDACION, token);
  return respuesta.data;
};
exports.enviarEvento = async (evento, URL) => {
  let respuesta = await axios.post(URL, evento);
  return respuesta.data;
};
