var persistencia= require("../Persistencia/mongoDBConeccion");
var configApp=require('../Config/app');
 
exports.guardarCompra = async (req) => {
     if(await controlFraude(req)){
    var idCompra=await persistencia.guardarCompra(req);
    return idCompra;
    }else{
        throw new Error('limite compras excedida');
    }
}; 
exports.eliminarCompra = async (req) => {
    var idCompra=await persistencia.eliminarCompra(req);
    return idCompra;
}; 
controlFraude = async (req) => { 
    var cantCompras=await persistencia.controlFraude(req.body.tarjeta);
    //desmarcar esta linea para la entrega
    //return cantCompras<configApp.cantidadTrxs;
    return true;
}; 

