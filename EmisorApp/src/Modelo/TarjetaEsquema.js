var mongoose = require("mongoose");

var tarjetaEsquema = new mongoose.Schema({
  limite: { type: Number, required: true, max: 99999999 },
  numero: { type: Number, required: true, unique: true },
  vencida: { type: Boolean, required: true },
  bloqueada: { type: Boolean, required: true },
  denunciada: { type: Boolean, required: true }
});
module.exports = mongoose.model("Tarjeta", tarjetaEsquema);
