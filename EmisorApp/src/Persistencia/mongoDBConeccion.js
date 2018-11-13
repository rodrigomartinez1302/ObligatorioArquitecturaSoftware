var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var compra= require('../Modelo/compraEsquema');
var tarjeta= require('../Modelo/TarjetaEsquema');
var chargeBack= require('../Modelo/chargeBack');
var configDB = require('../Config/db');
var configapp = require('../Config/app');

mongoose.Promise = global.Promise;

exports.Conectar = async function() { 
  try {
    await mongoose.connect(configDB.URL,
      { useNewUrlParser: true },)
    console.log('Connección a la base exitosa');
  } catch(error) {
    console.log('Error al conectar a la base');
  }
}
exports.guardarCompra = async function(req){
    let esquemaCompra = new compra(req.body);
    await esquemaCompra.save();
    console.log('IDCompra:'+ esquemaCompra._id);
    return esquemaCompra._id;
}
exports.eliminarCompra = async function(req){
     let eliminado=await compra.findByIdAndDelete({ _id:req.params.id});
     if(!eliminado){
         throw new Error('No se encontró el id');
     }
     console.log('IDCompra eliminado:'+ req.params.id);
     return req.params.id;
}
 exports.altaTarjeta = async function(altatarjeta){
    let esquemaTarjeta= new tarjeta(altatarjeta);
    await esquemaTarjeta.save();
    console.log('número tarjeta: '+ esquemaTarjeta.numero);   
}
exports.consultarTotalComprasEnTarjeta = async function(req){
    let hasta = new Date();
    let desde = new Date();
    desde.setDate(1);
    desde.setHours(0,0,0,0);
    var esquemaCompra = mongoose.model('Compra');
    try{
        let resultado = await esquemaCompra.aggregate([
            {$match:{
                tarjeta:req.body.tarjeta,
                fechaCompra:{$gte:desde,
                    $lte:hasta
                },
            }
        },
        {$group:{
            _id:'$tarjeta',
            suma:{$sum:'$monto'},
        }}]);
        return resultado[0].suma;
    }catch(error){
        return 0;
    }
} 
exports.consultarLimiteTarjeta = async function(req){
    let esquemaTarjeta = mongoose.model('Tarjeta');
    let consulta= await esquemaTarjeta.findOne({ 'numero': req.body.tarjeta}).exec();
    return consulta.limite;
}   
exports.consultarBloqueoTarjeta = async function(req){
    let esquemaTarjeta = mongoose.model('Tarjeta');
    let consulta= await esquemaTarjeta.findOne({ 'numero': req.body.tarjeta}).exec();
    return consulta.bloqueada;
}   
exports.consultarVencidaTarjeta = async function(req){
    let esquemaTarjeta = mongoose.model('Tarjeta');
    let consulta= await esquemaTarjeta.findOne({ 'numero': req.body.tarjeta}).exec();
    return consulta.vencida;
} 
exports.consultarDenunciadaTarjeta = async function(req){
    let esquemaTarjeta = mongoose.model('Tarjeta');
    let consulta= await esquemaTarjeta.findOne({ 'numero': req.body.tarjeta}).exec();
    return consulta.denunciada;
}
exports.guardarChargeBack = async function(req){
    let esquemaChargeBack = new chargeBack(req.body);
    await esquemaChargeBack.save();
    console.log('IDchargeBack:'+ esquemaChargeBack._id);
    return esquemaChargeBack._id;
}
exports.consultarFechaCompra = async function(idCompra){
    let compraAuxiliar = mongoose.model('Compra');
    let consulta= await compraAuxiliar.findOne({ '_id': idCompra}).exec();
    return consulta.fechaCompra;
} 

/* 
Desuso
exports.actualizarSaldoTarjeta =async function(req){
    let esquemaTarjeta = mongoose.model('Tarjeta');
    let consulta= await esquemaTarjeta.findOne({ 'numero': req.body.tarjeta}).exec();
    consulta.saldo=consulta.saldo - req.body.monto;
    consulta.save();
} 
*/  