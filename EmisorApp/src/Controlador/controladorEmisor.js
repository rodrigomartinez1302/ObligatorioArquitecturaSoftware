var persistencia= require("../Persistencia/mongoDBConeccion");
var luhn = require('luhn-alg');

exports.guardarCompra = async (req) => {
    await controlarSaldoTarjeta(req);
    await controlarValidezTarjeta(req);
    var idCompra=await persistencia.guardarCompra(req);
    await persistencia.actualizarSaldoTarjeta(req);
    return idCompra;
}; 
exports.eliminarCompra = async (req) => {
    let idCompra=await persistencia.eliminarCompra(req);
    return idCompra;
}; 
controlarValidezTarjeta= (req) => {
    let control= luhn(req.body.tarjeta.toString());
    if(control){
        return control;
    }
    throw new Error('Tarjeta Inválida');
}
controlarSaldoTarjeta=async (req) => {
    let saldo= await persistencia.consultarSaldoTarjeta(req);
    let control= saldo - req.body.monto > 0;
    if(control){
        return control;
    }
    throw new Error('Saldo insuficiente');
}
actualizarSaldoTarjeta=async (req) => {
    let saldo= await persistencia.actualizarSaldoTarjeta(req);
}
    

