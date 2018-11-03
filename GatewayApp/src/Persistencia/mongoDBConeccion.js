var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var compra= require('../Modelo/compraEsquema');
var db = require('../Config/db');

mongoose.Promise = global.Promise;

exports.Conectar = function() { 
  try {
    mongoose.connect(db.URL,
      { useNewUrlParser: true },)
    console.log('Connección a la base exitosa');
  } catch(error) {
    console.log('Error al conectar a la base');
  }
}
// Estos dos metodos moverlos a un aquete controlador
exports.guardarCompra = function(compraAGuardar){
    var esquemaAuxiliar = new compra(compraAGuardar);
     esquemaAuxiliar.save(function(error){
         if (error) {
             throw new Error('Error al guardar la compra');
            }
     });
     return esquemaAuxiliar;  
 }
    /*
        if (err) throw new handleError('No se encontró la compra');
      });
        let compraAux = mongoose.model('Compra');
        compraAux.aggregate(
            [
                {
                    total:{$sum: "$monto"}
                }
            ]
        ,function (err, total) {
            if (err) return handleError(err);
            console.log('Monto:' + total);
          });

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();
    let start = new Date(year, month, 1);
    let end = new Date(year, month, 30);

   */





