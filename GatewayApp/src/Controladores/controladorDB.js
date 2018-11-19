var mongoose = require('mongoose');
var transaccion = require('../Modelo/TransaccionEsquema');
var red = require('../Modelo/redEsquema');
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
        var esquemaAuxiliar = new transaccion(req.body);
        await esquemaAuxiliar.save();
        console.log('IDtransaccion:'+ esquemaAuxiliar._id);
        return esquemaAuxiliar._id;
     } catch (error) {
         throw new Error('Error al guardar la transacción')
     }   
  } 
exports.eliminarTransaccion = async function(req) {
    try {
        let esquemaAuxiliar = await transaccion.findByIdAndDelete({ _id:req.params.id});
        if(!esquemaAuxiliar) { 
            throw new Error('No se encontró el id');
        }
        console.log('IDTransaccion eliminada:'+ req.params.id);
        return req.params.id;
    } catch (error) {
        throw new Error('Error al eliminar la transacción')
    } 
}
exports.realizarDevolucionTransaccion = async function(req){
    try {
        let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
        if(!esquemaAuxiliar) {
            throw new Error('No se encontró el id');
        }
        esquemaAuxiliar.devolucion = true;
        await esquemaAuxiliar.save();
        console.log('IDTransaccion devolución:'+ esquemaAuxiliar._id);
        return esquemaAuxiliar._id;
    } catch (error) {
        throw new Error('Error al registrar la devolución')
    }    
}
exports.realizarChargeBack = async function(req){
    let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
    esquemaAuxiliar.chargeBack = true;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion chargeback:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
 exports.realizarCierreLotes = async function(RUT, hora, minutos) {
    console.log(RUT,hora,minutos);
    var esquemaAuxiliar = mongoose.model('Transaccion');
    var desde = new Date();
    desde.setUTCHours(0,0,0,0);
    var hasta = new Date(); 
    hasta.setUTCHours(hora, minutos);
    console.log(desde);
    console.log(hasta);
    let  resultado = await esquemaAuxiliar.find(
        {
            "fechaTransaccion":{
                "$gte": desde,
                "$lte": hasta
            },
            "RUT": {
                "$eq": RUT
            }
        }
    );/*.then((resultado) => {
        console.log(resultado);
    })*/
    console.log(resultado);
 } 
 exports.guardarRed = async function(redAGuardar){
    var esquemaAuxiliar = new red(redAGuardar);
    await esquemaAuxiliar.save(function(error,respuesta){
        if (error) {
            throw new Error(error.message);
        }
    });
}
exports.buscarRedPorPrefijoTarjeta = async function(idRed) {
    let redAuxiliar = await mongoose.model('Red');
    let emisorRetorno = await redAuxiliar.findOne({ 'idRed': idRed}, 'nombreRed').exec();
    if(!emisorRetorno) {
        throw new Error ('Error en busqueda de Red');
    }
    return emisorRetorno.nombreRed;
}




