var controladorPeticiones = require("../Controladores/controladorPeticiones");
var configAutenticacion = require("../Configuracion/autenticacion");

exports.loginAutenticacion = async () => {
  try {
    let respuesta = await controladorPeticiones.loginAutenticacion();
    configAutenticacion.TOKEN = respuesta.data.token;
    if (!respuesta.data.auth) {
      throw new Error("Usuario no autenticado");
    } else {
      console.log("Autenticación exitosa");
    }
  } catch (error) {
    console.log(error.message);
  }
};
exports.validacionAutenticacion = async req => {
  try {
    let respuesta = await controladorPeticiones.validacionAutenticacion(req);
    if (
      !respuesta.auth ||
      respuesta.rol != configAutenticacion.ROL_AUTORIZADO
    ) {
      throw new Error("Error en autenticación");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
