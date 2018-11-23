
var configError = require('../Configuracion/error');
var controladorPeticiones= require("./controladorPeticiones");
var configAppe = require('../Configuracion/app');

exports.registrarError = async (error) => { 
    try {
        let mensajeError = crearMensajeError(error);
        console.log(mensajeError);
        let respuesta = await controladorPeticiones.enviarError(mensajeError, configError.URL_ERRORAPP);
        console.log(respuesta);
    } catch (error) {
        console.log(error.message);
    }
}
 crearMensajeError = (error) => { 
     let mensajeError = {error: 'puerto app: '+ configAppe.PUERTO + ', error: ' + error};
     return mensajeError;
 }