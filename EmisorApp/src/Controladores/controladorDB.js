var mongoose = require('mongoose');
var Transaccion = require('../Modelo/transaccionEsquema');
var Tarjeta= require('../Modelo/tarjetaEsquema');
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
    try {
        var transaccion = new Transaccion(req.body);
        await transaccion.save();
        console.log('IDtransaccion:'+ transaccion._id);
        return transaccion._id;
     } catch (error) {
         throw new Error('Error al guardar la transacción')
     }   
  } 
exports.eliminarTransaccion = async function(req){
    try {
        let transaccion = await Transaccion.findByIdAndDelete({ _id:req.params.id});
        if(!transaccion){
            throw new Error('No se encontró el id');
        }
        console.log('IDTransaccion eliminado:'+ req.params.id);
        return req.params.id; 
    } catch (error) {
        throw new Error('Error al eliminar la transacción')
    } 
}
exports.realizarDevolucionTransaccion = async function(req){
    try {
        let transaccion = await Transaccion.findById(req.body.idTransaccion);
        if(!transaccion){
            throw new Error('No se encontró el id');
        }
        transaccion.devolucion = true;
        await transaccion.save();
        console.log('IDTransaccion devolución:'+ transaccion._id);
        return transaccion._id;
    } catch (error) {
        throw new Error('Error al registrar la devolución')
    }    
}
exports.realizarChargeBack = async function(idTransaccion){
    try {
        let transaccion = await Transaccion.findById(idTransaccion);
        if(!transaccion) {
            throw new Error('No se encontró el id');
        }
        transaccion.chargeBack = true;
        await transaccion.save();
        console.log('IDTransaccion chargeback:'+ transaccion._id);
        return transaccion._id;
    } catch (error) {
        throw new Error('Error al registrar el chargeBack')
    } 
}
 exports.altaTarjeta = async function(altatarjeta){
    let esquemaTarjeta= new Tarjeta(altatarjeta);
    await esquemaTarjeta.save();
    console.log('número tarjeta: '+ esquemaTarjeta.numero);   
}
exports.consultarTotalTransaccionesEnTarjeta = async function(req){
    let hasta = new Date();
    let desde = new Date();
    desde.setDate(1);
    desde.setHours(0,0,0,0);
    var esquemaTransaccion = mongoose.model('Transaccion');
    try {
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
exports.controlarExistenciatarjeta = async function(req){
    let esquemaTarjeta = mongoose.model('Tarjeta');
    let consulta= await esquemaTarjeta.findOne({ 'numero': req.body.tarjeta}).exec();
    return consulta.numero;
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