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
exports.enviarCompraTePagoYa = async (req,res) => {
    try {
        var response = await axios.post('http://localhost:9000/Compras',req.body);
        return response;
    } catch (error) {
        throw new handleError('Error en la request')
    }
};   
