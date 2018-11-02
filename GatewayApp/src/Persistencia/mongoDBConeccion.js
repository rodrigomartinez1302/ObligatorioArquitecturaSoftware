const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const compraEsquema= require('../Modelo/compraEsquema.js');
const db = require('../Config/db');

mongoose.Promise = global.Promise;

exports.Conectar = function() { 
  try {
    mongoose.connect(db.url,
      { useNewUrlParser: true },)
    console.log('Connección a la base exitosa');
  } catch(error) {
    console.log('Error al conectar a la base');
  }
}
// Estos dos metodos moverlos a un aquete controlador
exports.guardarCompra = function(compraAGuardar) {
  /* const esquemaAuxiliar = new compraEsquema(compraAGuardar);
    esquemaAuxiliar.save(function(err){
        if (err) {
            throw new handleError('Error al guardar la compra');
        } 
    });
    */
}
exports.cerrarLotes = function(){
        var compraAux = mongoose.model('Compra');
        compraAux. aggregate(
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

const start = new Date(year, month, 1);
const end = new Date(year, month, 30);

/*
comprasAuxiliar.aggregate([{
        $match : { "$and" :fechaCompra: { "$gte": start, "$lt": end } },
    },{
        "$group" : {
            _id : null,
            total : {
                "$sum" : "$monto"
            }
        }
    }],callback);
    */
    
}




