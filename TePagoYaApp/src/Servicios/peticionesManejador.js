var axios = require('axios');
var https = require('https');
var controlador= require("../Controlador/controladorTePagoYa");
var configGateway= require("../Config/gateway");
var configRed= require("../Config/red");
var configEmisor= require("../Config/emisor");

exports.enviarCompraGateway = async (req,URL) => { 
    let compraEnviar={monto:req.body.monto,fechaCompra:req.body.fechaCompra
        ,tarjeta:req.body.tarjeta.numero,RUT:req.body.RUT};
        let respuesta= await axios.post(URL,compraEnviar);
        return respuesta.data;
};  
exports.eliminarCompraGateway = async (idCompraAEliminar,URL) => { 
    let respuesta= await axios.delete(URL+'/'+idCompraAEliminar);
    return respuesta.data;
};
exports.enviarCompraRed= async (req) => { 
    let compraEnviar={fechaCompra:req.body.fechaCompra
        ,tarjeta:req.body.tarjeta.numero};
    var respuesta= await axios.post(configRed.URL,compraEnviar);
    return respuesta.data;
};   
exports.eliminarCompraRed = async (idCompraAEliminar) => {  
    let respuesta= await axios.delete(configRed.URL+'/'+idCompraAEliminar);
    return respuesta.data;
};
exports.enviarCompraEmisor= async (req) => { 
    let compraEnviar={monto:req.body.monto,fechaCompra:req.body.fechaCompra
        ,tarjeta:req.body.tarjeta.numero};
    var respuesta = await axios.post(configEmisor.URL,compraEnviar);
    return respuesta.data;
};   
exports.eliminarCompraEmisor = async (idCompraAEliminar) => {  
    let respuesta =await axios.delete(configEmisor.URL+'/'+idCompraAEliminar);
    return respuesta.data;
};


    
        