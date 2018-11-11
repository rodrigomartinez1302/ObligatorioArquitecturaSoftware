var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var compra= require('../Modelo/compraEsquema');
var configDB=require('../Config/db');
var configApp=require('../Config/app');

mongoose.Promise = global.Promise;

exports.Conectar= async function (){ 
    try {
        await mongoose.connect(configDB.url,
            { useNewUrlParser: true },)
            console.log('Connección a la base exitosa');
        }
        catch(error){
            console.log('Error al conectar a la base');
        }
}
exports.guardarCompra = async function(req){
    var esquemaAuxiliar = new compra(req.body);
    await esquemaAuxiliar.save();
    console.log('guarde el id:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.eliminarCompra =async function(req){
     let eliminado=await compra.findByIdAndDelete({ _id:req.params.id});
     if(!eliminado){
         throw new Error('No se encontró el id');
     }
     console.log('Borre el id:'+ req.params.id);
     return req.params.id;
}
exports.controlFraude = async function(nroTarjeta){
    var resultado;
    var esquemaAuxiliar = mongoose.model('Compra');
    var desde = new Date();
    desde.setDate(desde.getDate() - configApp.diasControlFraude);
    var hasta = new Date();
    //console.log(desde);
    //console.log(hasta);
    //console.log(nroTarjeta);
    resultado= await esquemaAuxiliar.find(
      {
          "fechaCompra":{
                "$gte": desde,
                "$lte": hasta
            },
            "tarjeta": {
                "$eq":nroTarjeta
            }
        }
    ).exec();//.then((resultado)=>{
    return resultado.length;
//})
 }



