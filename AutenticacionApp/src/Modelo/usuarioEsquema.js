var mongoose = require('mongoose');

var UsuarioEsquema = new mongoose.Schema({
    idUsuario : {type: String, required: true},
    contraseña : {type: String, required: true}  
});

module.exports = mongoose.model('Usuario', UsuarioEsquema);