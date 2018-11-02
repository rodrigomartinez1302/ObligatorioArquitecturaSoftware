const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
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
    /*const esquemaAuxiliar = new compraEsquema(compraAGuardar);
    esquemaAuxiliar.save(function(err){
        if (err) {
            throw new handleError('Error al guardar la compra');
        } 
    });
    */
}
/*exports.cerrarLotes = function(fecha){
    var comprasAuxiliar = mongoose.model('Compra');
    var instancia=new comprasAuxiliar();

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();

const start = new Date(year, month, 1);
const end = new Date(year, month, 30);

instancia.aggregate([{
        $match : { $and :[fechaCompra: { $gte: start, $lt: end } ] },
    },{
        $group : {
            _id : null,
            total : {
                $sum : "$monto"
            }
        }
    }],callback);
}
*/




