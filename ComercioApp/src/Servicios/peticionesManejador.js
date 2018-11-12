var axios = require('axios');
var configTePagoYa= require("../Config/tePagoYa");
var configApp= require("../Config/app");

exports.enviarCompraTePagoYa = async (req) => {
    let compraEnviar= req.body;
    compraEnviar.RUT=configApp.RUT;
    var respuesta = await axios.post(configTePagoYa.URLCOMPRAS,compraEnviar);
    return respuesta.data;
};
exports.enviarDenunciaTePagoYa = async (req) => {  
    let idCompra=req.params.id;
    let respuesta =await axios.delete(configTePagoYa.URLCOMPRAS+'/'+idCompra);
    return respuesta.data;
};

