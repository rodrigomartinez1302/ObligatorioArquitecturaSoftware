var mongoose = require('mongoose');

var transaccionEsquema = new mongoose.Schema({
    monto : {type: Number, required: true, max: 99999999},
    fechaTransaccion : {type: Date, required: true},
    tarjeta : {type: Number, required: true},
    RUT : {type: String, required: true}  
});

module.exports = mongoose.model('Transaccion', transaccionEsquema);