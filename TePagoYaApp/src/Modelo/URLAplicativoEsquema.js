const mongoose = require("mongoose");

const URLAplicativoEsquema = new mongoose.Schema({
  nombre: { type: String, required: true },
  recurso: { type: String, required: true },
  verbo: { type: String, required: true },
  URL: { type: String, required: true }
});
module.exports = mongoose.model("URLAplicativo", URLAplicativoEsquema);
