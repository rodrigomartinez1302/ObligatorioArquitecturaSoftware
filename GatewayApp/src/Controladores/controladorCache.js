var redis = require ('redis');
var configCache= require("../Configuracion/cache");
var cliente = redis.createClient(configCache.PUERTO);

exports.cache = function(idRed) {
let promesa = new Promise (function(resolver, denegar) {
    cliente.get(idRed, function(err, dato) {
        if (err) {
            denegar(err);
        }
        resolver(dato);
    });
});
return promesa;
}
exports.guardarEnCache = function(idRed, nombreRed) {
    try{
        cliente.setex(idRed, configCache.TIEMPO_EXPIRACION, nombreRed);
    } catch (error) {
        throw new Error ('Error al guardar en cache');
    }
}