var persistencia = require("./controladorDB");
var luhn = require("luhn-alg");
var configApp = require("../Configuracion/app");
var controladorPeticiones = require("./controladorPeticiones");
var controladorAutenticacion = require("./controladorAutenticacion");
var controladorEventos = require("./controladorEventos");
var moment = require("moment");

exports.guardarTransaccion = async req => {
  await controladorAutenticacion.validacionAutenticacion(req);
  await controlarValidezTarjeta(req);
  await controlarSaldoTarjeta(req);
  await controlarBloqueoTarjeta(req);
  await controlarVencidaTarjeta(req);
  await controlarDenunciadaTarjeta(req);
  await controlarExistenciatarjeta(req);
  let idTransaccion = await persistencia.guardarTransaccion(req);
  controladorEventos.registrarLog("IDtransaccion:" + idTransaccion);
  return idTransaccion;
};
exports.realizarDevolucionTransaccion = async req => {
  await controladorAutenticacion.validacionAutenticacion(req);
  await controlarCantidadDiasTransaccion(req);
  let idTransaccion = await persistencia.realizarDevolucionTransaccion(req);
  return idTransaccion;
};
exports.realizarChargeBack = async req => {
  let idTransaccion;
  try {
    let respuesta = await controladorPeticiones.enviarChargeBackTePagoYa(req);
    idTransaccion = respuesta;
  } catch (error) {
    throw new Error(error.message);
  }
  try {
    await persistencia.realizarChargeBack(idTransaccion);
  } catch (error) {
    throw new Error(error.message);
  }
  return req.body.idTransaccion;
};
controlarCantidadDiasTransaccion = async req => {
  let fechaTransaccion = await persistencia.consultarFechaTransaccion(
    req.body.idTransaccion
  );
  fechaTransaccion = moment(fechaTransaccion);
  let hoy = moment();
  let diasTranscurridos = hoy.diff(fechaTransaccion, "days");
  let control = diasTranscurridos < configApp.DIASDEVOLUCION;
  if (!control) {
    throw new Error("Cantidad días superado");
  }
};
controlarValidezTarjeta = req => {
  let control = luhn(req.body.tarjeta.toString());
  if (!control) {
    throw new Error("Tarjeta Inválida");
  }
};
controlarSaldoTarjeta = async req => {
  let montoTransaccion = req.body.monto;
  let limite = await persistencia.consultarLimiteTarjeta(req);
  let totalTransaccionesTarjeta = await persistencia.consultarTotalTransaccionesEnTarjeta(
    req
  );
  let control = totalTransaccionesTarjeta + montoTransaccion < limite;
  if (!control) {
    throw new Error("Saldo insuficiente");
  }
};
controlarBloqueoTarjeta = async req => {
  let bloqueada = await persistencia.consultarBloqueoTarjeta(req);
  if (bloqueada) {
    throw new Error("Tarjeta bloqueada ");
  }
};
controlarVencidaTarjeta = async req => {
  let vencida = await persistencia.consultarVencidaTarjeta(req);
  if (vencida) {
    throw new Error("Tarjeta vencida");
  }
};
controlarDenunciadaTarjeta = async req => {
  let denunciada = await persistencia.consultarDenunciadaTarjeta(req);
  if (denunciada) {
    throw new Error("Tarjeta denunciada");
  }
};
controlarExistenciatarjeta = async req => {
  let tarjeta = await persistencia.controlarExistenciatarjeta(req);
  if (!tarjeta) {
    throw new Error("No existe la tarjeta");
  }
};
