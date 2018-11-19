var controladorPeticiones= require("../Controladores/controladorPeticiones");
var configAutenticacion= require("../Configuracion/autenticacion");

exports.loginAutenticacion = async () => {
    try {
        let respuesta = await controladorPeticiones.loginAutenticacion();
        configAutenticacion.TOKEN = respuesta.data.token;
        if(!respuesta.data.auth) {
            throw new Error('Usuario no autenticado')
        } else {
            console.log('Autenticación exitosa');
        }
    }
    catch(error) {
        console.log(error.message);
    } 
};
exports.validacionAutenticacion = async (req) => {
    let respuesta = await controladorPeticiones.validacionAutenticacion(req);
    if (!respuesta.auth) {
        throw new Error(respuesta.message);
    }
} 