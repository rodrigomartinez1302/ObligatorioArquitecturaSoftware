var express = require('express');
var bodyParser = require('body-parser');
var controladorPersistencia = require('./src/Controladores/controladorDB');
var servicios = require('./src/Rutas/rutas');
var configApp = require('./src/configuracion/app');
let controladorApp =  require("./src/Controladores/ControladorApp");
controladorApp.inicializarApp();

