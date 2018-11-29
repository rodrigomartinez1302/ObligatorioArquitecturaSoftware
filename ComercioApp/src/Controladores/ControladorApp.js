var express = require("express");
var bodyParser = require("body-parser");
var controladorPersistencia = require("./controladorDB");
var servicios = require("../Rutas/rutasTransacciones");
var configApp = require("../Configuracion/app");
var controladorAutenticacion = require("./controladorAutenticacion");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

servicios(app);

exports.inicializarApp = async () => {
  try {
    await controladorPersistencia.Conectar();
  } catch (error) {
    throw new Error("Error en la conexión a la base de datos");
  }
  app
    .listen(configApp.PUERTO, function() {
      console.log("App corriendo");
    })
    .on("error", function(err) {
      if (err) {
        throw new Error("Error al iniciar la aplicación");
      }
    });
  controladorAutenticacion.loginAutenticacion();
};
