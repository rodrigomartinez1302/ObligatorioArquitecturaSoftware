var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var transaccion= require('../Modelo/transaccionEsquema');
var configDB=require('../Config/db');
var configApp=require('../Config/app');

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
    var esquemaAuxiliar = new transaccion(req.body);
    await esquemaAuxiliar.save();
    console.log('IDTransaccion:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.realizarDevolucionTransaccion = async function(req){
    let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
    esquemaAuxiliar.devolucion = true;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion devolución:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.eliminarTransaccion =async function(req){
     let eliminado=await transaccion.findByIdAndDelete({ _id:req.params.id});
     if(!eliminado){
         throw new Error('No se encontró el id');
     }
     console.log('IDTransaccion eliminado:'+ req.params.id);
     return req.params.id;
}
exports.controlFraude = async function(nroTarjeta){
    var resultado;
    var esquemaAuxiliar = mongoose.model('Transaccion');
    var desde = new Date();
    desde.setDate(desde.getDate() - configApp.DIASCONTROLFRAUDE);
    var hasta = new Date();
    //console.log(desde);
    //console.log(hasta);
    //console.log(nroTarjeta);
    resultado= await esquemaAuxiliar.find(
      {
          "fechaTransaccion":{
                "$gte": desde,
                "$lte": hasta
            },
            "tarjeta": {
                "$eq":nroTarjeta
            }
        }
    ).exec();
    return resultado.length;
 }



