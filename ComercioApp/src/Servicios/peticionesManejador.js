var axios = require('axios');
var configTePagoYa= require("../Config/tePagoYa");
var configApp= require("../Config/app");

exports.enviarCompraTePagoYa = async (req) => {
    let compraEnviar= req.body;
    compraEnviar.RUT=configApp.RUT;
    var respuesta = await axios.post(configTePagoYa.URL,compraEnviar);
    return respuesta.data;
};

