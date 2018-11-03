var axios = require('axios');
var https = require('https');
var persistencia= require("../Persistencia/mongoDBConeccion");

/*
exports.buscarGatewayPorCategoria = function(categoria){
    var gatewayAuxiliar = mongoose.model('CategoriaCompraGatewayEsquema');
    gatewayAuxiliar.findOne({ 'categoriaCompra': categoria}, 'nombreGateway', function (err, gateway) {
        if (err) return handleError(err);
        console.log('Gateway:'+ gateway.nombreGateway);
      });
}
*/
/*
exports.enviarCompraGateway = async (compraGuardada) => {
    var response; 
    try {
        var compraEnviar={monto:compraGuardada.monto,fechaCompra:compraGuardada.fechaCompra
            ,tarjeta:compraGuardada.tarjeta.numero};
        response = await axios.post('http://localhost:10000/Compras',compraEnviar);
        if(response.status=400){
            console.log('Entre al status 400');
            await persistencia.eliminarCompra(compraGuardada);
          }
          return response;
    }catch (error){
        await persistencia.eliminarCompra(compraGuardada);
        console.log('Error al  enviar la petición');
        return response;
             } 

        };
        
*/
exports.enviarCompraGateway = async (compraGuardada) => { 
    try {
        var compraEnviar={monto:compraGuardada.monto,fechaCompra:compraGuardada.fechaCompra
        ,tarjeta:compraGuardada.tarjeta.numero};
        //console.log(compraEnviar);
        var response =await axios.post('http://localhost:10000/Compras',compraEnviar)
        return response;
    } catch (error) {
        throw new handleError('Error en la request');
    }
};   

    
        