var axios = require('axios');
var configGateway = require("../Config/gateway");
var configRed = require("../Config/red");
var configEmisor = require("../Config/emisor");
var configComercio = require("../Config/comercio");

exports.enviarTransaccionGateway = async (req,URL) => { 
    let transaccionEnviar = {monto:req.body.monto,fechaTransaccion:req.body.fechaTransaccion
        ,tarjeta:req.body.tarjeta.numero,RUT:req.body.RUT};
        let respuesta = await axios.post(URL,transaccionEnviar);
        return respuesta.data;
};  
exports.revertirTransaccionGateway = async (idTransaccion,URL) => { 
    let respuesta = await axios.delete(URL+'/'+idTransaccion);
    return respuesta.data;
};
exports.enviarDevolucionTransaccionGateway = async (idTransaccion) => {
    let devolucionTransaccionEnviar = {idTransaccion:idTransaccion}; 
    let respuesta = await axios.put(configGateway.URLDEVOLUCIONES,devolucionTransaccionEnviar);
    return respuesta.data;
};
exports.enviarDevolucionTransaccionGateway = async (idTransaccion) => {
    let devolucionTransaccionEnviar = {idTransaccion:idTransaccion}; 
    let respuesta = await axios.put(configGateway.URLDEVOLUCIONES,devolucionTransaccionEnviar);
    return respuesta.data;
};
exports.enviarChargeBackGateway = async (idTransaccion) => { 
    let chargeBackEnviar = {idTransaccion:idTransaccion};
    let respuesta = await axios.put(configGateway.URLCHARGEBACK,chargeBackEnviar);
    return respuesta.data;
};
exports.enviarTransaccionRed = async (req) => { 
    let transaccionEnviar = {fechaTransaccion:req.body.fechaTransaccion
        ,tarjeta:req.body.tarjeta.numero};
        let respuesta = await axios.post(configRed.URLTRANSACCION,transaccionEnviar);
    return respuesta.data;
};   
exports.revertirTransaccionRed = async (idTransaccion) => {  
    let respuesta = await axios.delete(configRed.URLTRANSACCION+'/'+idTransaccion);
    return respuesta.data;
};
exports.enviarDevolucionTransaccionRed = async (idTransaccion) => {
    let devolucionTransaccionEnviar = {idTransaccion:idTransaccion};  
    let respuesta = await axios.put(configRed.URLDEVOLUCIONES,devolucionTransaccionEnviar);
    return respuesta.data;
};
exports.enviarChargeBackRed = async (idTransaccion) => { 
    let chargeBackEnviar = {idTransaccion:idTransaccion};
    let respuesta = await axios.put(configRed.URLCHARGEBACK,chargeBackEnviar);
    return respuesta.data;
};
exports.enviarTransaccionEmisor = async (req) => { 
    let transaccionEnviar = {monto:req.body.monto,fechaTransaccion:req.body.fechaTransaccion
        ,tarjeta:req.body.tarjeta.numero};
        let respuesta = await axios.post(configEmisor.URLTRANSACCION,transaccionEnviar);
    return respuesta.data;
};   
exports.revertirTransaccionEmisor = async (idTransaccion) => {  
    let respuesta = await axios.delete(configEmisor.URLTRANSACCION +'/'+idTransaccion);
    return respuesta.data;
};
exports.enviarDevolucionTransaccionEmisor = async (idTransaccion) => {
    let devolucionTransaccionEnviar = {idTransaccion:idTransaccion};  
    let respuesta = await axios.put(configEmisor.URLDEVOLUCIONES,devolucionTransaccionEnviar);
    return respuesta.data;
};
exports.comunicacionChargeBackComercio = async (idTransaccion) => { 
    let chargeBackEnviar = {idTransaccion:idTransaccion};
    let respuesta = await axios.post(configComercio.URLCHARGEBACK,chargeBackEnviar);
    return respuesta.data;
};



    
        