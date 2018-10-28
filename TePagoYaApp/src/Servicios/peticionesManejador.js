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
        var response = await axios.post('http://localhost:10000/Compras',req.body);
        res.status(200).send(JSON.stringify(response.data));
    } catch (error) {
        res.status(400).send({'Error':'An error has ocurred'});
    }
};