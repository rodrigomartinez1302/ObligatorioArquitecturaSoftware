var axios = require('axios');
var configTePagoYa= require("../Config/tePagoYa");
var configApp= require("../Config/app");
var configAutenticacion= require("../Config/autenticacion");

exports.enviarTransaccionTePagoYa = async (req) => {
    let transaccionEnviar = req.body;
    transaccionEnviar.RUT = configApp.RUT;
    let header = {headers: {token: configAutenticacion.TOKEN}}; 
    console.log(header.headers);
    var respuesta = await axios.post(configTePagoYa.URLTRANSACCION, transaccionEnviar, header);
    return respuesta.data;
};
exports.enviarDevolucionTePagoYa = async (req) => {  
    let devolucionEnviar=req.body;
    let respuesta =await axios.put(configTePagoYa.URLDEVOLUCION,devolucionEnviar);
    return respuesta.data;
};
exports.enviarChargeBackTePagoYa = async (req) => {  
    let chargeBackEnviar= req.body;
    let respuesta = await axios.post(configTePagoYa.URLCHARGEBACK,chargeBackEnviar);
    return respuesta.data;
};
exports.loginAutenticacion = async () => {  
    let usuario = {nombre: configAutenticacion.NOMBRE_USUARIO
        , contraseña: configAutenticacion.CONTRASEÑA};
        let respuesta = await axios.post(configAutenticacion.URL_LOGIN,usuario);
        return respuesta;
};

