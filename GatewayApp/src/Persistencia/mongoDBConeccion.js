var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var compra= require('../Modelo/compraEsquema');
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
// Estos dos metodos moverlos a un aquete controlador
exports.guardarCompra = async function(req){
    var esquemaAuxiliar = new compra(req.body);
    await esquemaAuxiliar.save();
    console.log('IDCompra:'+ esquemaAuxiliar._id);
    return esquemaAuxiliar._id;
}
exports.eliminarCompra =async function(req){
     let eliminado=await compra.findByIdAndDelete({ _id:req.params.id});
     if(!eliminado){
         throw new Error('No se encontró el id');
     }
     console.log('IDCompra eliminado:'+ req.params.id);
     return req.params.id;
}
 exports.cerrarLotes = function(fechaCierre,RUT){
    var esquemaAuxiliar = mongoose.model('Compra');
    var hoy = new Date();
    hoy.setHours(0,0,0,0); 
    esquemaAuxiliar.find(
        {
            "fechaCompra":{
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





