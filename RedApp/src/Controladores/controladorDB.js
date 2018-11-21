var mongoose = require('mongoose');
var Transaccion = require('../Modelo/transaccionEsquema');
var configDB = require('../Configuracion/db');
var configApp = require('../Configuracion/app');

mongoose.Promise = global.Promise;

exports.Conectar =async   function (){ 
    try {
        await mongoose.connect(configDB.URL,
            { useNewUrlParser: true },)
            console.log('Connección a la base exitosa');
        }
        catch(error){
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
        let transaccion=await transaccion.findByIdAndDelete({ _id:req.params.id});
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
        let transaccion = await transaccion.findById(req.body.idTransaccion);
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
exports.realizarChargeBack = async function(req){
    let transaccion = await transaccion.findById(req.body.idTransaccion);
    transaccion.chargeBack = true;
    await transaccion.save();
    console.log('IDTransaccion chargeback:'+ transaccion._id);
    return transaccion._id;
}
exports.controlFraude = async function(nroTarjeta){
    var resultado;
    var transaccion = mongoose.model('Transaccion');
    var desde = new Date();
    desde.setDate(desde.getDate() - configApp.DIASCONTROLFRAUDE);
    var hasta = new Date();
    //console.log(desde);
    //console.log(hasta);
    //console.log(nroTarjeta);
    resultado = await transaccion.find(
      {
          "fechaTransaccion":{
                "$gte": desde,
                "$lte": hasta
            },
            "tarjeta": {
                "$eq": nroTarjeta
            }
        }
    ).exec();
    return resultado.length;
 }



