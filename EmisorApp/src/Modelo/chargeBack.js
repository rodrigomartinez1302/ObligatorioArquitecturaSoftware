var mongoose = require('mongoose');

var chargeBackEsquema = new mongoose.Schema({
    idCompra : {type: String, required: true},
});
module.exports = mongoose.model('ChargeBack', chargeBackEsquema);