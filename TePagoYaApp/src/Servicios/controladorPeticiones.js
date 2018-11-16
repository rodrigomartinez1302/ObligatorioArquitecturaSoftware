var axios = require('axios');
var configGateway= require("../Config/gateway");
var configRed= require("../Config/red");
var configEmisor= require("../Config/emisor");

exports.enviarTransaccionGateway = async (req,URL) => { 
    let transaccionEnviar = {monto:req.body.monto,fechaTransaccion:req.body.fechaTransaccion
        ,tarjeta:req.body.tarjeta.numero,RUT:req.body.RUT};
        let respuesta = await axios.post(URL,transaccionEnviar);
        return respuesta.data;
};  
exports.revertirTransaccionGateway = async (idTransaccionAEliminar,URL) => { 
    let respuesta = await axios.delete(URL+'/'+idTransaccionAEliminar);
    return respuesta.data;
};
exports.enviarTransaccionRed = async (req) => { 
    let transaccionEnviar = {fechaTransaccion:req.body.fechaTransaccion
        ,tarjeta:req.body.tarjeta.numero};
    var respuesta = await axios.post(configRed.URLTRANSACCION,transaccionEnviar);
    return respuesta.data;
};   
exports.revertirTransaccionRed = async (idTransaccionAEliminar) => {  
    let respuesta = await axios.delete(configRed.URLTRANSACCION+'/'+idTransaccionAEliminar);
    return respuesta.data;
};
exports.enviarDevolucionTransaccionRed = async (idTransaccionDevolucion) => {
    let devolucionTransaccionEnviar = {idTransaccion:idTransaccionDevolucion};  
    console.log(devolucionTransaccionEnviar);
    let respuesta = await axios.put(configRed.URLDEVOLUCIONES,devolucionTransaccionEnviar);
    return respuesta.data;
};
exports.enviarTransaccionEmisor = async (req) => { 
    let transaccionEnviar = {monto:req.body.monto,fechaTransaccion:req.body.fechaTransaccion
        ,tarjeta:req.body.tarjeta.numero};
    var respuesta = await axios.post(configEmisor.URLTRANSACCION,transaccionEnviar);
    return respuesta.data;
};   
exports.revertirTransaccionEmisor = async (idTransaccionAEliminar) => {  
    let respuesta =await axios.delete(configEmisor.URLTRANSACCION +'/'+idTransaccionAEliminar);
    return respuesta.data;
};
exports.enviarChargeBackEmisor = async (idTransaccionEmisor) => { 
    let chargeBackEnviar={idTransaccion:idTransaccionEmisor};
    var respuesta = await axios.post(configEmisor.URLCHARGEBACK,chargeBackEnviar);
    return respuesta.data;
};




    
        