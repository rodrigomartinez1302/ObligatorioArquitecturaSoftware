var redis = require ('redis');
var configCache= require('../Configuracion/cache');
var cliente = redis.createClient(configCache.PUERTO);

exports.cache = function(categoria) {
let promesa = new Promise (function(resolver, denegar) {
    cliente.get(categoria, function(err, dato) {
        if (err) {
            denegar(err);
        }
        resolver(dato);
    });
});
return promesa;
}
exports.guardarEnCache = function(categoria, nombreGateway) {
    try{
        cliente.setex(categoria, configCache.TIEMPO_EXPIRACION, nombreGateway);
    } catch (error) {
        throw new Error ('Error al guardar en cache');
    }
}