var mongoose = require('mongoose');

var compraEsquema = new mongoose.Schema({
    fechaCompra : {type: Date, required: true},
    tarjeta : {type: Number, required: true}
});

module.exports = mongoose.model('Compra', compraEsquema);