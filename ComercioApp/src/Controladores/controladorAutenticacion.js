var peticiones = require("../Controladores/controladorPeticiones");
var configAutenticacion = require("../Configuracion/autenticacion");

exports.loginAutenticacion = async () => {
  try {
    let respuesta = await peticiones.loginAutenticacion();
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