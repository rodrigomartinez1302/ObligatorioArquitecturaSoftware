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
    var esquemaAuxiliar = new transaccion(req.body);
    await esquemaAuxiliar.save();
    console.log('IDTransaccion:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.eliminarTransaccion = async function(req){
     let eliminado = await transaccion.findByIdAndDelete({ _id:req.params.id});
     if(!eliminado){
         throw new Error('No se encontró el id');
     }
     console.log('IDTransaccion revertida:'+ req.params.id);
     return req.params.id;
}
exports.realizarDevolucionTransaccion = async function(req){
    let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
    esquemaAuxiliar.devolucion = true;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion devolución:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.realizarChargeBack = async function(req){
    let esquemaAuxiliar = await transaccion.findById(req.body.idTransaccion);
    esquemaAuxiliar.chargeBack = true;
    await esquemaAuxiliar.save();
    console.log('IDTransaccion chargeback:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
 exports.cerrarLotes = function(fechaCierre,RUT){
    var esquemaAuxiliar = mongoose.model('Transaccion');
    var hoy = new Date();
    hoy.setHours(0,0,0,0); 
    esquemaAuxiliar.find(
        {
            "fechaTransaccion":{
                "$gte": hoy,
                "$lte": fechaCierre
            },
            "RUT": {
                "$eq":RUT
            }
        }
    ).exec().then((resultado) => {
        console.log(resultado);
      
    })
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




