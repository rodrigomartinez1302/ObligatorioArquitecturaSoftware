var controladorPersistencia = require("./controladorDB");
var controldadorCache = require("./controladorCache");
var controladorAutenticacion = require("./controladorAutenticacion");
var configApp = require("../Configuracion/app");
var controladorPeticiones = require("../Controladores/controladorPeticiones");
var controladorEventos = require("./controladorEventos");

exports.comunicacionTransaccion = async req => {
  await controladorAutenticacion.validacionAutenticacion(req);
  let nombreRed = await buscarRedPorPrefijoTarjeta(req);
  let cuerpoMensaje = { nombreRed: nombreRed };
  await controladorPeticiones.enviarTransaccionTePagoYa(cuerpoMensaje);
  let idTransaccion = await controladorPersistencia.guardarTransaccion(req);
  controladorEventos.registrarLog("IDtransaccion:" + idTransaccion);
  return idTransaccion;
};
buscarRedPorPrefijoTarjeta = async req => {
  let prefijoTarjeta = req.body.prefijoTarjeta;
  let nombreRed = await controldadorCache.cache(prefijoTarjeta);
  if (!nombreRed) {
    nombreRed = await controladorPersistencia.buscarRedPorPrefijoTarjeta(
      prefijoTarjeta
    );
    controldadorCache.guardarEnCache(prefijoTarjeta, nombreRed);
  }
  return nombreRed;
};
exports.realizarDevolucionTransaccion = async req => {
  await controladorAutenticacion.validacionAutenticacion(req);
  var idTransaccion = await controladorPersistencia.realizarDevolucionTransaccion(
    req
  );
  return idTransaccion;
};
exports.realizarChargeBack = async req => {
  var idTransaccion = await controladorPersistencia.realizarChargeBack(req);
  return idTransaccion;
};
exports.realizarCierreLotes = async req => {
  var idTransaccion = await controladorPersistencia.realizarCierreLotes(req);
  return idTransaccion;
};
exports.solicitarCierreLotes = async req => {
  let RUT = req.query.RUT;
  try {
    let resultado = await controladorPersistencia.realizarCierreLotes(
      RUT,
      configApp.HORA_CIERRE_LOTES,
      configApp.MIN_CIERRE_LOTES
    );
    return resultado;
  } catch (error) {
    throw new Error(error.message);
  }
};
