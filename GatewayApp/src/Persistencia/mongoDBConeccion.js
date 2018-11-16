var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var transaccion= require('../Modelo/TransaccionEsquema');
var db = require('../Config/db');

mongoose.Promise = global.Promise;

exports.Conectar= async function() { 
  try {
    await mongoose.connect(db.URL,
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
exports.eliminarTransaccion =async function(req){
     let eliminado=await transaccion.findByIdAndDelete({ _id:req.params.id});
     if(!eliminado){
         throw new Error('No se encontró el id');
     }
     console.log('IDTransaccion eliminado:'+ req.params.id);
     return req.params.id;
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
    ).exec().then((resultado)=>{
        console.log(resultado);
      
    })
 } 




