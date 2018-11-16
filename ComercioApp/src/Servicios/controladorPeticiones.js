var axios = require('axios');
var configTePagoYa= require("../Config/tePagoYa");
var configApp= require("../Config/app");

exports.enviarTransaccionTePagoYa = async (req) => {
    let transaccionEnviar= req.body;
    transaccionEnviar.RUT=configApp.RUT;
    var respuesta = await axios.post(configTePagoYa.URLTRANSACCION,transaccionEnviar);
    return respuesta.data;
};
exports.enviarDevolucionTePagoYa = async (req) => {  
    let devolucionEnviar=req.body;
    let respuesta =await axios.put(configTePagoYa.URLTRANSACCION,devolucionEnviar);
    return respuesta.data;
};
exports.enviarChargeBackTePagoYa = async (req) => {  
    let chargeBackEnviar= req.body;
    var respuesta = await axios.post(configTePagoYa.URLCHARGEBACK,chargeBackEnviar);
    return respuesta.data;
};

