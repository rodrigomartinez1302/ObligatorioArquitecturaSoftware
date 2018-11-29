var controladorPersistencia = require("./controladorDB");
var configApp = require("../Configuracion/app");
var controladorAutenticacion = require("./controladorAutenticacion");
var controldadorCache = require("./controladorCache");
var controladorPeticiones = require("../Controladores/controladorPeticiones");
var controladorEventos = require("./controladorEventos");
var moment = require("moment");

exports.comunicacionTransaccion = async req => {
  let nombreEmisor;
  let cuerpoMensaje;
  let idTransaccion;
  await controladorAutenticacion.validacionAutenticacion(req);
  await controlFraude(req);
  nombreEmisor = await buscarRedPorPrefijoTarjeta(req);
  cuerpoMensaje = { nombreEmisor: nombreEmisor };
  await controladorPeticiones.enviarTransaccionTePagoYa(cuerpoMensaje);
  idTransaccion = await controladorPersistencia.guardarTransaccion(req);
  controladorEventos.registrarLog("IDtransaccion:" + idTransaccion);
  return idTransaccion;
};
buscarRedPorPrefijoTarjeta = async req => {
  let prefijoTarjeta = obtenerPrefijoTarjeta(req);
  let nombreEmisor = await controldadorCache.cache(prefijoTarjeta);
  if (!nombreEmisor) {
    try {
      nombreEmisor = await controladorPersistencia.buscarEmisorPorPrefijoTarjeta(
        prefijoTarjeta
      );
      controldadorCache.guardarEnCache(prefijoTarjeta, nombreEmisor);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return nombreEmisor;
};
obtenerPrefijoTarjeta = req => {
  let prefijoTarjeta = req.body.tarjeta.toString().substring(1, 4);
  prefijoTarjeta = parseInt(prefijoTarjeta);
  return prefijoTarjeta;
};
exports.realizarDevolucionTransaccion = async req => {
  await controladorAutenticacion.validacionAutenticacion(req);
  let idTransaccion = await controladorPersistencia.realizarDevolucionTransaccion(
    req
  );
  return idTransaccion;
};
exports.realizarChargeBack = async req => {
  let idTransaccion = await controladorPersistencia.realizarChargeBack(req);
  return idTransaccion;
};
controlFraude = async req => {
  let desde = moment();
  let tarjeta;
  let cantTransaccionesPermitidas;
  let cantTransacciones;
  desde.subtract(configApp.DIASCONTROL_FRAUDE, "d");
  desde = desde.format();
  tarjeta = req.body.tarjeta;
  cantTransacciones = await controladorPersistencia.cantidadTransacciones(
    tarjeta,
    desde
  );
  cantTransaccionesPermitidas = await controladorPersistencia.cantidadTRXPermitidas();
  if (cantTransacciones >= cantTransaccionesPermitidas) {
    throw new Error("Control Fraude: cantidad transacciones excedida");
  }
};
