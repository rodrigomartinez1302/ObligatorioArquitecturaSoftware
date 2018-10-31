let mongoose = require('mongoose');

let compraEsquema = new mongoose.Schema({
  monto: { type: Number, required: true, max: 99999999 },
  fechaCompra: { type: Date, required: true 
},
});

module.exports = mongoose.model('Compra', compraEsquema);

