var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../Config/db');
var compra= require('../Modelo/compraEsquema');
const CANTIDADEDIASACONTROLAR = 3;

mongoose.Promise = global.Promise;

exports.Conectar =   function (){ 
    try {
        mongoose.connect(db.url,
            { useNewUrlParser: true },)
            console.log('Connección a la base exitosa');
        }
        catch(error){
            console.log('Error al conectar a la base');
        }
}
//Estos dos metodos moverlos a un aquete controlador
exports.guardarCompra = function(compraAGuardar){
   var esquemaAuxiliar = new compra(compraAGuardar);
    esquemaAuxiliar.save(function(error){
        if (error){
            throw new Error('Error al guardar la compra');
        }
        else{
            console.log('Se guardó la compra con id'+ esquemaAuxiliar._id);
        }
    });
    return esquemaAuxiliar;  
}
exports.eliminarCompra = function(compraAEliminar){
    //console.log(compraAEliminar.id);
    compra.deleteOne({ _id: compraAEliminar._id }, function (err) {
        if (err) {
            throw new Error('No se encontró la compra');
        }
      });
      console.log('Se eliminó la compra');    
}

exports.controlFraude = async function(nroTarjeta){
    var esquemaAuxiliar = mongoose.model('Compra');
    var desde = new Date();
    var diaDelMes = desde.getDate();
    desde.setDate(diaDelMes - CANTIDADEDIASACONTROLAR);
    //var hasta = new Date();
    let retorno;
    var hasta = new Date("2018-12-12 03:00:00.000Z");
    await  esquemaAuxiliar.find(
      {
          "fechaCompra":{
                "$gte": desde,
                "$lte": hasta
            },
            "tarjeta": {
                "$eq":nroTarjeta
            }
        }
    ).exec().then((resultado)=>{
        retorno = resultado.length;
    })
    return retorno;
 }