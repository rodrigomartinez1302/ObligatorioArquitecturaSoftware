const mongoose = require("mongoose");

const categoriaTransaccionGatewayEsquema = new mongoose.Schema({
  categoriaTransaccion: { type: String, required: true, maxlength: 250 },
  nombreGateway: { type: String, required: true }
});

module.exports = mongoose.model(
  "CategoriaTransaccionGatewayEsquema",
  categoriaTransaccionGatewayEsquema
);
