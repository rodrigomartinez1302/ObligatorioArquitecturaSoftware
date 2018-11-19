var axios = require('axios');
var configTePagoYa = require("../Configuracion/tePagoYa");
var configApp = require("../Configuracion/app");
var configAutenticacion = require("../Configuracion/autenticacion");

exports.enviarTransaccionTePagoYa = async (req) => {
    let transaccionEnviar = req.body;
    transaccionEnviar.RUT = configApp.RUT;
    let header = {headers: {token: configAutenticacion.TOKEN}}; 
    var respuesta = await axios.post(configTePagoYa.URLTRANSACCION, transaccionEnviar, header);
    return respuesta.data;
};
exports.enviarDevolucionTePagoYa = async (req) => {  
    let devolucionEnviar = req.body;
    let respuesta = await axios.put(configTePagoYa.URLDEVOLUCION, devolucionEnviar);
    return respuesta.data;
};
exports.enviarChargeBackTePagoYa = async (req) => {  
    let chargeBackEnviar = req.body;
    let respuesta = await axios.post(configTePagoYa.URLCHARGEBACK, chargeBackEnviar);
    return respuesta.data;
};
exports.loginAutenticacion = async () => {  
    let usuario = {nombre: configAutenticacion.NOMBRE_USUARIO
        , contraseña: configAutenticacion.CONTRASEÑA};
        let respuesta = await axios.post(configAutenticacion.URL_LOGIN, usuario);
        return respuesta;
};

