var mongoose = require('mongoose');
var transaccion = require('../Modelo/transaccionEsquema');
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
        var esquemaAuxiliar = new transaccion(req.body);
        await esquemaAuxiliar.save();
        console.log('IDtransaccion:'+ esquemaAuxiliar._id);
        return esquemaAuxiliar._id;
     } catch (error) {
         throw new Error('Error al guardar la transacción')
     }   
  } 
  exports.eliminarTransaccion = async function(req){
    try { 
        let esquemaAuxiliar=await transaccion.findByIdAndDelete({ _id:req.params.id});
        if(!esquemaAuxiliar){
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
        let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
        if(!esquemaAuxiliar){
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
/*
exports.revertirDevolucionTransaccion = async function(req){
    let esquemaAuxiliar = await transaccion.findById({ _id:req.body.idTransaccion});
    esquemaAuxiliar.devolucion = false;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion devolución:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
*/

exports.controlFraude = async function(nroTarjeta){
    var resultado;
    var esquemaAuxiliar = mongoose.model('Transaccion');
    var desde = new Date();
    desde.setDate(desde.getDate() - configApp.DIASCONTROLFRAUDE);
    var hasta = new Date();
    //console.log(desde);
    //console.log(hasta);
    //console.log(nroTarjeta);
    resultado = await esquemaAuxiliar.find(
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



