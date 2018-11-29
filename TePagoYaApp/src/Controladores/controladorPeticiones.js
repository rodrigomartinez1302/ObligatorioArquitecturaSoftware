var axios = require("axios");
var configAutenticacion = require("../Configuracion/autenticacion");

exports.enviarTransaccionGateway = async (transaccionAEnviar, URL) => {
  let header = { headers: { token: configAutenticacion.TOKEN } };
  try {
    let respuesta = await axios.post(URL, transaccionAEnviar, header);
    return respuesta.data;
  } catch (error) {
    throw new Error("Error al realizar la peticion a: " + URL);
  }
};

exports.enviarDevolucionTransaccionGateway = async (idTransaccion, URL) => {
  let header = { headers: { token: configAutenticacion.TOKEN } };
  let devolucionTransaccionEnviar = { idTransaccion: idTransaccion };
  let respuesta = await axios.put(URL, devolucionTransaccionEnviar, header);
  return respuesta.data;
};
exports.enviarChargeBackGateway = async (idTransaccion, URL) => {
  let header = { headers: { token: configAutenticacion.TOKEN } };
  let chargeBackEnviar = { idTransaccion: idTransaccion };
  let respuesta = await axios.put(URL, chargeBackEnviar, header);
  return respuesta.data;
};
exports.enviarTransaccionRed = async (solicitudInicial, URL) => {
  let transaccionEnviar = {
    fechaTransaccion: solicitudInicial.fechaTransaccion,
    tarjeta: solicitudInicial.tarjeta.numero
  };
  let header = { headers: { token: configAutenticacion.TOKEN } };
  try {
    let respuesta = await axios.post(URL, transaccionEnviar, header);
    return respuesta.data;
  } catch (error) {
    throw new Error("Error al realizar la peticion a: " + URL);
  }
};
exports.enviarDevolucionTransaccionRed = async (idTransaccion, URL) => {
  let header = { headers: { token: configAutenticacion.TOKEN } };
  let devolucionTransaccionEnviar = { idTransaccion: idTransaccion };
  let respuesta = await axios.put(URL, devolucionTransaccionEnviar, header);
  return respuesta.data;
};
exports.enviarChargeBackRed = async (idTransaccion, URL) => {
  let header = { headers: { token: configAutenticacion.TOKEN } };
  let chargeBackEnviar = { idTransaccion: idTransaccion };
  let respuesta = await axios.put(URL, chargeBackEnviar, header);
  return respuesta.data;
};
exports.enviarTransaccionEmisor = async (solicitudInicial, URL) => {
  let transaccionEnviar = {
    monto: solicitudInicial.monto,
    fechaTransaccion: solicitudInicial.fechaTransaccion,
    tarjeta: solicitudInicial.tarjeta.numero
  };
  let header = { headers: { token: configAutenticacion.TOKEN } };
  try {
    let respuesta = await axios.post(URL, transaccionEnviar, header);
    return respuesta.data;
  } catch (error) {
    throw new Error("Error al realizar la peticion a: " + URL);
  }
};
exports.enviarDevolucionTransaccionEmisor = async (idTransaccion, URL) => {
  let header = { headers: { token: configAutenticacion.TOKEN } };
  let devolucionTransaccionEnviar = { idTransaccion: idTransaccion };
  let respuesta = await axios.put(URL, devolucionTransaccionEnviar, header);
  return respuesta.data;
};
exports.enviarChargeBackComercio = async (idTransaccion, URL) => {
  let header = { headers: { token: configAutenticacion.TOKEN } };
  let chargeBackEnviar = { idTransaccion: idTransaccion };
  let respuesta = await axios.post(URL, chargeBackEnviar, header);
  return respuesta.data;
};
exports.comunicacionCierreLotes = async (req, URL) => {
  let RUT = req.query.RUT;
  let respuesta = await axios.get(URL + "?RUT=" + RUT);
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
