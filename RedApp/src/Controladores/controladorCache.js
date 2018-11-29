var redis = require("redis");
var configCache = require("../Configuracion/cache");
var cliente = redis.createClient(configCache.PUERTO);

exports.cache = function(idEmisor) {
  let promesa = new Promise(function(resolver, denegar) {
    cliente.get(idEmisor, function(err, dato) {
      if (err) {
        denegar(err);
      }
      resolver(dato);
    });
  });
  return promesa;
};
exports.guardarEnCache = function(idEmisor, nombreEmisor) {
  try {
    cliente.setex(idEmisor, configCache.TIEMPO_EXPIRACION, nombreEmisor);
  } catch (error) {
    throw new Error("Error al guardar en cache");
  }
};
