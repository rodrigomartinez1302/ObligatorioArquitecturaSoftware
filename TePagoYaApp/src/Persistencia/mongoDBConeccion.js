var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../Config/db');
var compras= require('../Modelo/compraEsquema');

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
   var esquemaAuxiliar = new compras(compraAGuardar);
    esquemaAuxiliar.save(function(error){
        if (error) {
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
    compras.deleteOne({ _id: compraAEliminar._id }, function (err) {
        if (err) {
            throw new Error('No se encontró la compra');
        }
      });
      console.log('Se eliminó la compra');    
}

/*
exports.cerrarLotes = function(fecha){
    var comprasAuxiliar = mongoose.model('Compra').findOne({ monto: 123 },'tarjeta.numero');
    comprasAuxiliar.tarjeta.numero;
}
*/


