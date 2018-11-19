var axios = require('axios');
var configAutenticacion= require("../Configuracion/autenticacion");

exports.loginAutenticacion = async () => {  
    let usuario = {nombre: configAutenticacion.NOMBRE_USUARIO
        , contraseña: configAutenticacion.CONTRASEÑA};
        let respuesta = await axios.post(configAutenticacion.URL_LOGIN,usuario);
        return respuesta;
};
exports.validacionAutenticacion = async (req) => {
    let token = {token: req.headers['token']}
    let respuesta = await axios.post(configAutenticacion.URL_VALIDACION,token);
    return respuesta.data;
}




    
        