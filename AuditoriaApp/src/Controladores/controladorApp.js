var express = require("express");
var bodyParser = require("body-parser");
var servicios = require("../Rutas/rutasAuditoria");
var configApp = require("../Configuracion/app");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

servicios(app);

exports.inicializarApp = async () => {
  app
    .listen(configApp.PUERTO, function() {
      console.log("App corriendo");
    })
    .on("error", function(err) {
      if (err) {
        console.log("Error al levantar la app");
      }
    });
};
