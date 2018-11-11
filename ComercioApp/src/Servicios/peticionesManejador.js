var axios = require('axios');
var configTePagoYa= require("../Config/tePagoYa");
var configApp= require("../Config/app");

exports.enviarCompraTePagoYa = async (req) => {
    let compraEnviar= req.body;
    compraEnviar.RUT=configApp.RUT;
<<<<<<< HEAD
    var respuesta = await axios.post(configTePagoYa.URL,compraEnviar);
    return respuesta.data;
=======
    var response = await axios.post(configTePagoYa.URL,compraEnviar);
    return response.data;
>>>>>>> c51b9c289e691451397b38ae626339284da33249
};

