var mongoose = require('mongoose');

var UsuarioEsquema = new mongoose.Schema({
    nombre : {type: String, required: true},
    contraseña : {type: String, required: true},
    token : {type: String}
});
module.exports = mongoose.model('Usuario', UsuarioEsquema);