var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

var persistencia= require("../Persistencia/mongoDBConeccion");
 
exports.guardarCompra = async (req) => {
    var idCompra=await persistencia.guardarCompra(req);
    return idCompra;
}; 
exports.eliminarCompra = async (req) => {
    var idCompra=await persistencia.eliminarCompra(req);
    return idCompra;
}; 

