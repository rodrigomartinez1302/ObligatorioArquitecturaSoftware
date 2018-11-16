var mongoose = require('mongoose');

var transaccionEsquema = new mongoose.Schema({
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
    fechaTransaccion : {type: Date, required: true},
    RUT : {type: String, required: true}, 
    gateway : {type: String, required: true} ,
    idTransaccionGate : {type: String, required: true},
    idTransaccionRed : {type: String, required: true},
    idTransaccionEmisor : {type: String, required: true},
    devolucion : {type: Boolean, default: false},
    chargeBack : {type: Boolean, default: false}
});
module.exports = mongoose.model('Transaccion', transaccionEsquema);
 
 