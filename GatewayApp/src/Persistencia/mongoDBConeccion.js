const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const compraEsquema= require('../Modelo/compraEsquema.js');
const db = require('../Config/db');

mongoose.Promise = global.Promise;

exports.Conectar =   function (){ 
 mongoose.connect(
    db.url,
    { useNewUrlParser: true },).then(() => {
    console.log(`Connección a la base exitosa`);
  }).catch(() => {
    console.log('Error al conectar a la base');
  });
}

//Estos dos metodos moverlos a un aquete controlador
exports.guardarCompra = function(compraAGuardar){
   /* console.log(compraAGuardar);
    const esquemaAuxiliar = new compraEsquema(compraAGuardar);
    esquemaAuxiliar.save(function(err){
        if (err) {
            throw new handleError('Error al guardar la compra');
        } 
    });
    */
}

exports.cerrarLotes = function(fecha){
    var comprasAuxiliar = mongoose.model('Compra');
    var variable=comprasAuxiliar.countDocuments();
    console.log(variable);
}




