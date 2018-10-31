var axios = require('axios');
var https = require('https');

/*
exports.buscarGatewayPorCategoria = function(categoria){
    var gatewayAuxiliar = mongoose.model('CategoriaCompraGatewayEsquema');
    gatewayAuxiliar.findOne({ 'categoriaCompra': categoria}, 'nombreGateway', function (err, gateway) {
        if (err) return handleError(err);
        console.log('Gateway:'+ gateway.nombreGateway);
      });
}
*/
exports.enviarCompraGateway = async (req,res) => {
    try {
        var compraEnviar={monto:req.body.monto,fechaCompra:req.body.fechaCompra};
        var response = await axios.post('http://localhost:10000/Compras',compraEnviar);
        return response;
    }catch (error){
          throw new handleError('Error en la request');
             } 
        };