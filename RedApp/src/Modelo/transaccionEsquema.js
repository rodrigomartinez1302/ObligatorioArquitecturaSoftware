var mongoose = require('mongoose');

var transaccionEsquema = new mongoose.Schema({
    fechaTransaccion : {type: Date, required: true},
    tarjeta : {type: Number, required: true},
    devolucion : {type: Boolean, default: false},
    chargeBack : {type: Boolean, default: false}
});

module.exports = mongoose.model('Transaccion', transaccionEsquema);