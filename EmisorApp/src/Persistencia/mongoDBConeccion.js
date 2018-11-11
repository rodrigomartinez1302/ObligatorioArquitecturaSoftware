var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var compra= require('../Modelo/compraEsquema');
var tarjeta= require('../Modelo/TarjetaEsquema');
var configDB = require('../Config/db');
var configapp = require('../Config/app');

mongoose.Promise = global.Promise;

<<<<<<< HEAD
exports.Conectar= async function() { 
  try {
    await mongoose.connect(configDB.URL,
=======
exports.Conectar = function() { 
  try {
    mongoose.connect(configDB.URL,
>>>>>>> c51b9c289e691451397b38ae626339284da33249
      { useNewUrlParser: true },)
    console.log('Connección a la base exitosa');
  } catch(error) {
    console.log('Error al conectar a la base');
  }
}
exports.guardarCompra = async function(req){
    let esquemaCompra = new compra(req.body);
    await esquemaCompra.save();
    console.log('guarde el id:'+ esquemaCompra._id);
    return esquemaCompra._id;
}
exports.eliminarCompra =async function(req){
     let eliminado=await compra.findByIdAndDelete({ _id:req.params.id});
     if(!eliminado){
         throw new Error('No se encontró el id');
     }
     console.log('Borre el id:'+ req.params.id);
     return req.params.id;
}
 exports.altaTarjeta = async function(altatarjeta){
    let esquemaTarjeta= new tarjeta(altatarjeta);
    await esquemaTarjeta.save();
    console.log('alta de tarjeta número: '+ esquemaTarjeta.numero);
}
/*
Quedó desuso para este modulo, en la red seguramente se use
exports.consultarTotalComprasEnTarjeta = async function(req){
    var desde = new Date();
    desde.setDate(desde.getDate() - configapp.diasDesdeTotalCompras);
    var esquemaCompra = mongoose.model('Compra');
    var resultado= await esquemaCompra.aggregate([
        {$match:{
            tarjeta:req.body.tarjeta,
            fechaCompra:{$gte:desde},
        }},
    {$group:{
        _id:'$tarjeta',
        suma:{$sum:'$monto'},
            }
        }
    ]);
    return resultado[0].suma;
} 
*/
exports.consultarSaldoTarjeta =async function(req){
    let esquemaTarjeta = mongoose.model('Tarjeta');
    let consulta= await esquemaTarjeta.findOne({ 'numero': req.body.tarjeta}).exec();
    return consulta.saldo;
}   
exports.actualizarSaldoTarjeta =async function(req){
    let esquemaTarjeta = mongoose.model('Tarjeta');
    let consulta= await esquemaTarjeta.findOne({ 'numero': req.body.tarjeta}).exec();
    consulta.saldo=consulta.saldo - req.body.monto;
    consulta.save();
}   



   