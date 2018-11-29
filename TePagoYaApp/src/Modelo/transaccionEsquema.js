var mongoose = require("mongoose");

var transaccionEsquema = new mongoose.Schema({
  monto: { type: Number, required: true, max: 99999999 },
  fechaTransaccion: { type: String, required: true },
  RUT: { type: String, required: true },
  comercio: { type: String, required: true },
  gateway: { type: String, required: true },
  idTransaccionGateway: { type: String, required: true },
  red: { type: String, required: true },
  idTransaccionRed: { type: String, required: true },
  emisor: { type: String, required: true },
  idTransaccionEmisor: { type: String, required: true },
  devolucion: { type: Boolean, default: false },
  chargeBack: { type: Boolean, default: false }
});
module.exports = mongoose.model("Transaccion", transaccionEsquema);
