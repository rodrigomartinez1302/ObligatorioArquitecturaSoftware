const mongoose = require('mongoose');

const categoriaCompraGatewayEsquema = new mongoose.Schema({
    categoriaCompra : {type: String, required: true,maxlength:250 },
    nombreGateway : {type: String, required: true}
});

module.exports = mongoose.model('CategoriaCompraGatewayEsquema', categoriaCompraGatewayEsquema);

