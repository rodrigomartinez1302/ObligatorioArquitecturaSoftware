var moment = require("moment");
var controladorPeticiones = require("./controladorPeticiones");
var controladorPersistencia = require("./controladorDB");
var controladorAutenticacion = require("./controladorAutenticacion");
var controladorEventos = require("./controladorEventos");
var cuerpoSolicitudInicial;
var idTransaccionGateway;
var gateway;
var idTransaccionRed;
var red;
var idTransaccionEmisor;
var emisor;
var comercio;

exports.comunicacionTransaccion = async req => {
  let idTransaccionTePagoYa;
  await controladorAutenticacion.validacionAutenticacion(req);
  await controlarFechaPeticion(req);
  await controlarCantidad(req);
  cuerpoSolicitudInicial = req.body;
  gateway = req.body.nombreGateway;
  await comunicacionTransaccionGateway(req);
  try {
    idTransaccionTePagoYa = await guardarTransaccion(req);
    controladorEventos.registrarLog("IDtransaccion:" + idTransaccionTePagoYa);
    return idTransaccionTePagoYa;
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
comunicacionTransaccionGateway = async req => {
  let transaccionEnviar;
  let respuesta;
  let URL;
  const RECURSO = "Transacciones";
  const VERBO = "POST";
  red = req.body.nombreRed;
  try {
    URL = await buscarURLAplicativo(gateway, RECURSO, VERBO);
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
  try {
    transaccionEnviar = await crearCuerpoTransaccionGateway(
      cuerpoSolicitudInicial
    );
    respuesta = await controladorPeticiones.enviarTransaccionGateway(
      transaccionEnviar,
      URL
    );
    idTransaccionGateway = respuesta;
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
exports.comunicacionTransaccionRed = async req => {
  await controladorAutenticacion.validacionAutenticacion(req);
  let URL;
  let respuesta;
  const RECURSO = "Transacciones";
  const VERBO = "POST";
  red = req.body.nombreRed;
  try {
    URL = await buscarURLAplicativo(red, RECURSO, VERBO);
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
  try {
    respuesta = await controladorPeticiones.enviarTransaccionRed(
      cuerpoSolicitudInicial,
      URL
    );
    idTransaccionRed = respuesta;
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
exports.comunicacionTransaccionEmisor = async req => {
  await controladorAutenticacion.validacionAutenticacion(req);
  let URL;
  emisor = req.body.nombreEmisor;
  const RECURSO = "Transacciones";
  const VERBO = "POST";
  try {
    URL = await buscarURLAplicativo(emisor, RECURSO, VERBO);
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
  try {
    let respuesta = await controladorPeticiones.enviarTransaccionEmisor(
      cuerpoSolicitudInicial,
      URL
    );
    idTransaccionEmisor = respuesta;
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
buscarURLAplicativo = async (nombreAplicativo, recurso, verbo) => {
  let URL;
  try {
    URL = await controladorPersistencia.buscarURLAplicativo(
      nombreAplicativo,
      recurso,
      verbo
    );
    return URL;
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
guardarTransaccion = async req => {
  let transaccionAGuardar;
  let idTransaccion;
  transaccionAGuardar = crearTransaccionTePagoYa(cuerpoSolicitudInicial);
  idTransaccion = await controladorPersistencia.guardarTransaccion(
    transaccionAGuardar
  );
  return idTransaccion;
};
exports.ComunicacionDevolucion = async req => {
  let idDevolucion;
  idTransaccionTePagoYa = req.body.idTransaccion;
  await buscarAplicativos();
  await comunicacionDevolucionTransaccionGateway();
  await comunicacionDevolucionTransaccionRed();
  await comunicacionDevolucionTransaccionEmisor();
  try {
    idDevolucion = await controladorPersistencia.realizarDevolucionTransaccion(
      idTransaccionTePagoYa
    );
    controladorEventos.registrarLog("IDTransaccion devolución:" + idDevolucion);
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.respuesta);
  }
  return idTransaccionTePagoYa;
};
comunicacionDevolucionTransaccionGateway = async () => {
  let URL;
  const RECURSO = "Transacciones/Devoluciones";
  const VERBO = "PUT";
  try {
    await consultarIDTransaccionGateway();
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
  try {
    URL = await buscarURLAplicativo(gateway, RECURSO, VERBO);
    await controladorPeticiones.enviarDevolucionTransaccionGateway(
      idTransaccionGateway,
      URL
    );
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
comunicacionDevolucionTransaccionRed = async () => {
  let URL;
  const RECURSO = "Transacciones/Devoluciones";
  const VERBO = "PUT";
  try {
    await consultarIDTransaccionRed();
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
  try {
    URL = await buscarURLAplicativo(red, RECURSO, VERBO);
    await controladorPeticiones.enviarDevolucionTransaccionGateway(
      idTransaccionRed,
      URL
    );
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
comunicacionDevolucionTransaccionEmisor = async () => {
  let URL;
  const RECURSO = "Transacciones/Devoluciones";
  const VERBO = "PUT";
  try {
    await consultarIDTransaccionEmisor();
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
  try {
    URL = await buscarURLAplicativo(emisor, RECURSO, VERBO);
    await controladorPeticiones.enviarDevolucionTransaccionGateway(
      idTransaccionEmisor,
      URL
    );
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
consultarIDTransaccionGateway = async () => {
  idTransaccionGateway = await controladorPersistencia.consultarIDTransaccionGateway(
    idTransaccionTePagoYa
  );
};
consultarIDTransaccionRed = async () => {
  idTransaccionRed = await controladorPersistencia.consultarIDTransaccionRed(
    idTransaccionTePagoYa
  );
};
consultarIDTransaccionEmisor = async () => {
  idTransaccionEmisor = await controladorPersistencia.consultarIDTransaccionEmisor(
    idTransaccionTePagoYa
  );
};
exports.comunicacionChargeBack = async req => {
  let idChargeBack;
  idTransaccionTePagoYa = req.body.idTransaccion;
  await buscarAplicativos();
  await comunicacionChargeBackGateway();
  await comunicacionChargeBackRed();
  await comunicacionChargeBackComercio();
  await consultarIDTransaccionEmisor();
  try {
    idChargeBack = await controladorPersistencia.realizarChargeBack(
      idTransaccionTePagoYa
    );
    controladorEventos.registrarLog("IDTransaccion chargeBack:" + idChargeBack);
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.respuesta);
  }
  return idTransaccionEmisor;
};
comunicacionChargeBackGateway = async req => {
  try {
    let URL;
    const RECURSO = "Transacciones/ChargeBacks";
    const VERBO = "PUT";
    URL = await buscarURLAplicativo(gateway, RECURSO, VERBO);
    await consultarIDTransaccionGateway();
    await controladorPeticiones.enviarChargeBackGateway(
      idTransaccionGateway,
      URL
    );
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
comunicacionChargeBackRed = async req => {
  try {
    let URL;
    const RECURSO = "Transacciones/ChargeBacks";
    const VERBO = "PUT";
    URL = await buscarURLAplicativo(red, RECURSO, VERBO);
    await consultarIDTransaccionRed();
    await controladorPeticiones.enviarChargeBackGateway(idTransaccionRed, URL);
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
comunicacionChargeBackComercio = async req => {
  try {
    let URL;
    const RECURSO = "Transacciones/ChargeBacks";
    const VERBO = "PUT";
    URL = await buscarURLAplicativo(comercio, RECURSO, VERBO);
    await controladorPeticiones.enviarChargeBackComercio(
      idTransaccionTePagoYa,
      URL
    );
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
exports.comunicacionCierreLotes = async req => {
  try {
    let URL;
    let respuesta;
    let gateway = req.query.gateway;
    const RECURSO = "Transacciones/CierreLotes";
    const VERBO = "GET";
    URL = await buscarURLAplicativo(gateway, RECURSO, VERBO);
    respuesta = await controladorPeticiones.comunicacionCierreLotes(req, URL);
    return respuesta;
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
buscarAplicativos = async () => {
  try {
    let aplicativos;
    aplicativos = await controladorPersistencia.buscarAplicativos(
      idTransaccionTePagoYa
    );
    gateway = aplicativos.gateway;
    red = aplicativos.red;
    emisor = aplicativos.emisor;
    comercio = aplicativos.comercio;
  } catch (error) {
    controladorEventos.registrarError(error.message);
    throw new Error(error.message);
  }
};
crearTransaccionTePagoYa = cuerpoSolicitudInicial => {
  cuerpoSolicitudInicial.gateway = gateway;
  cuerpoSolicitudInicial.idTransaccionGateway = idTransaccionGateway;
  cuerpoSolicitudInicial.red = red;
  cuerpoSolicitudInicial.idTransaccionRed = idTransaccionRed;
  cuerpoSolicitudInicial.emisor = emisor;
  cuerpoSolicitudInicial.idTransaccionEmisor = idTransaccionEmisor;
  return cuerpoSolicitudInicial;
};
crearCuerpoTransaccionGateway = async cuerpoSolicitudInicial => {
  let prefijoTarjeta;
  let transaccionEnviar;
  prefijoTarjeta = cuerpoSolicitudInicial.tarjeta.numero
    .toString()
    .substring(0, 1);
  prefijoTarjeta = parseInt(prefijoTarjeta);
  transaccionEnviar = {
    monto: cuerpoSolicitudInicial.monto,
    fechaTransaccion: cuerpoSolicitudInicial.fechaTransaccion,
    prefijoTarjeta: prefijoTarjeta,
    RUT: cuerpoSolicitudInicial.RUT
  };
  return transaccionEnviar;
};
controlarFechaPeticion = async req => {
  let mensajeError = "error en formato fecha";
  let control;
  try {
    control = moment(req.body.fechaTransaccion).isValid();
  } catch (error) {
    controladorEventos.registrarError(mensajeError);
    throw new Error(mensajeError);
  }
  if (!control) {
    controladorEventos.registrarError(mensajeError);
    throw new Error(mensajeError);
  }
};
controlarCantidad = async req => {
  let mensajeError;
  if (isNaN(req.body.monto)) {
    mensajeError = "el monto no puede ser texto";
    controladorEventos.registrarError(mensajeError);
    throw new Error(mensajeError);
  }
  console.log(req.body.monto);
  if (req.body.monto < 1) {
    mensajeError = "el monto no puede ser un valor negativo";
    controladorEventos.registrarError(mensajeError);
    throw new Error(mensajeError);
  }
};
