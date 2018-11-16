var axios = require('axios');
var configTePagoya= require("../Config/TePagoYa");

exports.enviarChargeBackTePagoYa = async (req) => { 
    let chargeBackEnviar = {idTransaccion:req.body.idTransaccion};
    let respuesta = await axios.put(configTePagoya.URLCHARGEBACK,chargeBackEnviar);
    return respuesta.data;
};
