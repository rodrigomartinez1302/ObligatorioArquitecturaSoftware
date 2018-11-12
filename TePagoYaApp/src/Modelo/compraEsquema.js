var mongoose = require('mongoose');

var compraEsquema = new mongoose.Schema({
    tarjeta:{
        numero : {type: Number, required: true},
        vencimiento : {type: String, required: true},
        nombreTitular : {type: String, required: true},
        codigoSeguridad : {type: Number, required: true}
    },
    direccionEnvio:{
        calle : {type: String, required: true, maxlength: 250},
        numero : {type: Number, required: true, max: 999999999},
        ciudad : {type: String, required: true, maxlength: 100},
        pais : {type: String, required: true, maxlength: 100},
        codigoPostal : {type: Number, required: true, max: 9999999}
    },
    direccionFacturacion:{
        calle : {type: String, required: true, maxlength: 250},
        numero : {type: Number, required: true, max: 9999999},
        ciudad : {type: String, required: true, maxlength: 100},
        pais : {type: String, required: true, maxlength: 100},
        codigoPostal : {type: Number, required: true, max: 9999999}
    },
    producto : {
        nombre : {type: String, required: true, maxlength: 250},
        categoria : {type: String, required: true, maxlength: 250},
        cantidad : {type: Number, required: true, max: 99999999}
    },
    monto : {type: Number, required: true, max: 99999999},
    fechaCompra : {type: Date, required: true},
    RUT : {type: String, required: true}, 
    gateway : {type: String, required: true} ,
    idCompraGate : {type: String, required: true},
    idCompraRed : {type: String, required: true},
    idCompraEmisor : {type: String, required: true}
});
module.exports = mongoose.model('Compra', compraEsquema);
 
 