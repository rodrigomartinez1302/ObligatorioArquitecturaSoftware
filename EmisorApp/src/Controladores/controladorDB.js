var mongoose = require('mongoose');
var transaccion= require('../Modelo/transaccionEsquema');
var tarjeta= require('../Modelo/tarjetaEsquema');
var configDB = require('../Configuracion/db');

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
exports.guardarTransaccion = async function(req){
    let esquemaTransaccion = new transaccion(req.body);
    await esquemaTransaccion.save();
    console.log('IDTransaccion:'+ esquemaTransaccion._id);
    return esquemaTransaccion._id;
}
exports.eliminarTransaccion = async function(req){
     let eliminado=await transaccion.findByIdAndDelete({ _id:req.params.id});
     if(!eliminado){
         throw new Error('No se encontró el id');
     }
     console.log('IDTransaccion eliminado:'+ req.params.id);
     return req.params.id;
}
exports.realizarDevolucionTransaccion = async function(req){
    let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
    esquemaAuxiliar.devolucion = true;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion devolución:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.realizarChargeBack = async function(idTransaccion){
    let esquemaAuxiliar = await transaccion.findById(idTransaccion);
    esquemaAuxiliar.chargeBack = true;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion chargeback:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.revertirDevolucionTransaccion = async function(req){
    let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
    esquemaAuxiliar.devolucion = false;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion devolución:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
 exports.altaTarjeta = async function(altatarjeta){
    let esquemaTarjeta= new tarjeta(altatarjeta);
    await esquemaTarjeta.save();
    console.log('número tarjeta: '+ esquemaTarjeta.numero);   
}
exports.consultarTotalTransaccionesEnTarjeta = async function(req){
    let hasta = new Date();
    let desde = new Date();
    desde.setDate(1);
    desde.setHours(0,0,0,0);
    var esquemaTransaccion = mongoose.model('Transaccion');
    try{
        let resultado = await esquemaTransaccion.aggregate([
            {$match:{
                tarjeta:req.body.tarjeta,
                fechaTransaccion:{$gte:desde,
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
exports.consultarFechaTransaccion = async function(idTransaccion){
    let transaccionAuxiliar = mongoose.model('Transaccion');
    let consulta= await transaccionAuxiliar.findOne({ '_id': idTransaccion}).exec();
    return consulta.fechaTransaccion;
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