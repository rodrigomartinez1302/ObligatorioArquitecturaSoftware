var axios = require('axios');
var configGateway = require("../Configuracion/gateway");
var configRed = require("../Configuracion/red");
var configEmisor = require("../Configuracion/emisor");
var configComercio = require("../Configuracion/comercio");
var configAutenticacion= require("../Configuracion/autenticacion");

exports.enviarTransaccionGateway = async (req,URL) => { 
    let prefijoTarjeta = req.body.tarjeta.numero.toString().substring(0,1);
    prefijoTarjeta = parseInt(prefijoTarjeta);
    let transaccionEnviar = {monto: req.body.monto, fechaTransaccion: req.body.fechaTransaccion
        , prefijoTarjeta: prefijoTarjeta, RUT: req.body.RUT};
        let header = {headers: {token: configAutenticacion.TOKEN}};
        let respuesta = await axios.post(URL, transaccionEnviar, header);
        return respuesta.data;   
};  
exports.revertirTransaccionGateway = async (idTransaccion,URL) => { 
    let respuesta = await axios.delete(URL+'/'+idTransaccion);
    return respuesta.data;
};
exports.enviarDevolucionTransaccionGateway = async (idTransaccion) => {
    let devolucionTransaccionEnviar = {idTransaccion:idTransaccion}; 
    let respuesta = await axios.put(configGateway.URLDEVOLUCIONES, devolucionTransaccionEnviar);
    return respuesta.data;
};
exports.enviarDevolucionTransaccionGateway = async (idTransaccion) => {
    let devolucionTransaccionEnviar = {idTransaccion:idTransaccion}; 
    let respuesta = await axios.put(configGateway.URLDEVOLUCIONES, devolucionTransaccionEnviar);
    return respuesta.data;
};
exports.enviarChargeBackGateway = async (idTransaccion) => { 
    let chargeBackEnviar = {idTransaccion:idTransaccion};
    let respuesta = await axios.put(configGateway.URLCHARGEBACK, chargeBackEnviar);
    return respuesta.data;
};
exports.enviarTransaccionRed = async (req, URL) => { 
    let transaccionEnviar = {fechaTransaccion:req.body.fechaTransaccion
        ,tarjeta:req.body.tarjeta.numero};
        let header = {headers: {token: configAutenticacion.TOKEN}}; 
        let respuesta = await axios.post(URL, transaccionEnviar, header);
    return respuesta.data;
};   
exports.revertirTransaccionRed = async (idTransaccion, URL) => {  
    let respuesta = await axios.delete(URL +'/'+idTransaccion);
    return respuesta.data;
};
exports.enviarDevolucionTransaccionRed = async (idTransaccion) => {
    let devolucionTransaccionEnviar = {idTransaccion:idTransaccion};  
    let respuesta = await axios.put(configRed.URLDEVOLUCIONES, devolucionTransaccionEnviar);
    return respuesta.data;
};
exports.enviarChargeBackRed = async (idTransaccion) => { 
    let chargeBackEnviar = {idTransaccion:idTransaccion};
    let respuesta = await axios.put(configRed.URLCHARGEBACK, chargeBackEnviar);
    return respuesta.data;
};
exports.enviarTransaccionEmisor = async (req) => { 
    let transaccionEnviar = {monto:req.body.monto,fechaTransaccion:req.body.fechaTransaccion
        ,tarjeta:req.body.tarjeta.numero};
        let header = {headers: {token: configAutenticacion.TOKEN}}; 
        let respuesta = await axios.post(configEmisor.URLTRANSACCION, transaccionEnviar, header);
        return respuesta.data;
};   
exports.revertirTransaccionEmisor = async (idTransaccion) => {  
    let respuesta = await axios.delete(configEmisor.URLTRANSACCION +'/'+idTransaccion);
    return respuesta.data;
};
exports.enviarDevolucionTransaccionEmisor = async (idTransaccion) => {
    let devolucionTransaccionEnviar = {idTransaccion:idTransaccion};  
    let respuesta = await axios.put(configEmisor.URLDEVOLUCIONES, devolucionTransaccionEnviar);
    return respuesta.data;
};
exports.comunicacionChargeBackComercio = async (idTransaccion) => { 
    let chargeBackEnviar = {idTransaccion:idTransaccion};
    let respuesta = await axios.post(configComercio.URLCHARGEBACK, chargeBackEnviar);
    return respuesta.data;
};
exports.loginAutenticacion = async () => {  
    let usuario = {nombre: configAutenticacion.NOMBRE_USUARIO
        , contraseña: configAutenticacion.CONTRASEÑA};
        let respuesta = await axios.post(configAutenticacion.URL_LOGIN,usuario);
        return respuesta;
};
exports.validacionAutenticacion = async (req) => {
    let token = {token: req.headers['token']}
    let respuesta = await axios.post(configAutenticacion.URL_VALIDACION, token);
    return respuesta.data;
}
exports.comunicacionCierreLotes = async (req, URL) => {
    let RUT = req.query.RUT;
    let respuesta = await axios.get(URL + '?RUT=' + RUT);
    return respuesta.data;
};
exports.enviarError= async (error, URL) => { 
    let respuesta = await axios.post(URL, error);
    return respuesta.data;
};   




    
        