var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "fdce151fa9024f6ea12e4fdc7073e506",
  captureUncaught: true,
  captureUnhandledRejections: true
});

exports.registrarError = async req => {
  try {
    rollbar.error(req.body.error);
  } catch (error) {
    throw new Error("Error al enviar el error al repositorio");
  }
};
exports.registrarLog = async req => {
  try {
    rollbar.log(req.body.log);
  } catch (error) {
    throw new Error("Error al enviar el error al repositorio");
  }
};
