const mongoose = require('mongoose');

const compraEsquema = new mongoose.Schema({
    tarjeta:{
        numero : {type: Number, required: true, max: 9999},
        vencimiento : {type: String, required: true},
        nombreTitular : {type: String, required: true},
        codigoSeguridad : {type: Number, required: true},
    },
    monto : {type: Number, required: true, max: 99999999},
    fechaCompra : {type: Date, required: true},
    producto : {
        nombre : {type: String, required: true, maxlength: 250},
        categoria : {type: String, required: true, maxlength: 250},
        cantidad : {type: Number, required: true, max: 99999999},
    }
});

module.exports = mongoose.model('Compra', compraEsquema);
 