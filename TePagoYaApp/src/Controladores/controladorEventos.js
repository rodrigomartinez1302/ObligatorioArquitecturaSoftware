var configEvento = require("../Configuracion/evento");
var controladorPeticiones = require("./controladorPeticiones");
var configApp = require("../Configuracion/app");

exports.registrarError = async error => {
  try {
    console.log(error);
    let mensajeError = crearMensajeError(error);
    await controladorPeticiones.enviarEvento(
      mensajeError,
      configEvento.URL_ERROR_APP
    );
  } catch (error) {
    console.log(error.message);
  }
};
exports.registrarLog = async log => {
  try {
    let mensajeLog = crearMensajeLog(log);
    await controladorPeticiones.enviarEvento(
      mensajeLog,
      configEvento.URL_LOG_APP
    );
  } catch (error) {
    console.log(error.message);
  }
};
crearMensajeError = error => {
  let mensajeError = {
    error: "puerto app: " + configApp.PUERTO + ", descripcion: " + error
  };
  return mensajeError;
};
crearMensajeLog = log => {
  let mensajeLog = {
    log: "puerto app: " + configApp.PUERTO + ", log:  " + log
  };
  return mensajeLog;
};
