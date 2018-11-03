var mongoose = require('mongoose');

var compraEsquema = new mongoose.Schema({
    monto : {type: Number, required: true, max: 99999999},
    fechaCompra : {type: Date, required: true},
    tarjeta : {type: Number, required: true, max: 9999}
});

module.exports = mongoose.model('Compra', compraEsquema);