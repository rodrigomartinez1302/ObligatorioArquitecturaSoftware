var mongoose = require('mongoose');

var tarjetaEsquema = new mongoose.Schema({
    saldo : {type: Number, required: true, max: 99999999},
    limite : {type: Number, required: true, max: 99999999},
    numero : {type: Number, required: true}
});
module.exports = mongoose.model('Tarjeta', tarjetaEsquema);
