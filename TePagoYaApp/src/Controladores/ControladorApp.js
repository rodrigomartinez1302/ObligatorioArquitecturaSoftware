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

/*
var json={nombre:'emisor1', recurso: 'Transacciones',
verbo: 'POST', URL:'http://localhost:12000/Transacciones'};
controladorPersistencia.guardarDatosAplicativo(json);

var json={nombre:'emisor1', recurso: 'Transacciones',
verbo: 'DELETE', URL:'http://localhost:12000/Transacciones'};
controladorPersistencia.guardarDatosAplicativo(json);

var json={nombre:'emisor1', recurso: 'Transacciones/Devoluciones',
verbo: 'PUT', URL:'http://localhost:12000/Transacciones/Devoluciones'};
controladorPersistencia.guardarDatosAplicativo(json);

var json={nombre:'emisor1', recurso: 'Transacciones/ChargeBacks',
verbo: 'PUT', URL:'http://localhost:12000/Transacciones/ChargeBacks'};
controladorPersistencia.guardarDatosAplicativo(json);

------------

var json={nombre:'red1', recurso: 'Transacciones',
verbo: 'POST', URL:'http://localhost:11000/Transacciones'};
controladorPersistencia.guardarDatosAplicativo(json);

var json={nombre:'red1', recurso: 'Transacciones',
verbo: 'DELETE', URL:'http://localhost:11000/Transacciones'};
controladorPersistencia.guardarDatosAplicativo(json);

var json={nombre:'red1', recurso: 'Transacciones/Devoluciones',
verbo: 'PUT', URL:'http://localhost:11000/Transacciones/Devoluciones'};
controladorPersistencia.guardarDatosAplicativo(json);

var json={nombre:'red1', recurso: 'Transacciones/ChargeBacks',
verbo: 'PUT', URL:'http://localhost:11000/Transacciones/ChargeBacks'};
controladorPersistencia.guardarDatosAplicativo(json);

-----------

var json={nombre:'gateway1', recurso: 'Transacciones',
verbo: 'POST', URL:'http://localhost:10000/Transacciones'};

controladorPersistencia.guardarDatosAplicativo(json);
var json={nombre:'gateway1', recurso: 'Transacciones',
verbo: 'DELETE', URL:'http://localhost:10000/Transacciones'};

controladorPersistencia.guardarDatosAplicativo(json);
var json={nombre:'gateway1', recurso: 'Transacciones/CierreLotes',
verbo: 'GET', URL:'http://localhost:10000/Transacciones/CierreLotes'};
controladorPersistencia.guardarDatosAplicativo(json);

var json={nombre:'gateway1', recurso: 'Transacciones/Devoluciones',
verbo: 'PUT', URL:'http://localhost:10000/Transacciones/Devoluciones'};
controladorPersistencia.guardarDatosAplicativo(json);

var json={nombre:'gateway1', recurso: 'Transacciones/ChargeBacks',
verbo: 'PUT', URL:'http://localhost:10000/Transacciones/ChargeBacks'};
controladorPersistencia.guardarDatosAplicativo(json);

---------

var json={nombre:'comercio1', recurso: 'Transacciones/ChargeBacks',
verbo: 'PUT', URL:'http://localhost:8000/Transacciones/ChargeBacks'};
controladorPersistencia.guardarDatosAplicativo(json);

*/
