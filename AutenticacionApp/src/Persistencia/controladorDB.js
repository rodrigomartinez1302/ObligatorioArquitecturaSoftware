var mongoose = require('mongoose');
var usuario = require('../Modelo/usuarioEsquema');
var db = require('../Config/db');
var bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

exports.Conectar = async function() { 
  try {
    await mongoose.connect(db.URL,
      { useNewUrlParser: true },)
    console.log('Connección a la base exitosa');
  } catch(error) {
    console.log('Error al conectar a la base');
  }
}
exports.registrarUsuario = async function(datosUsuario){
    datosUsuario.contraseña = bcrypt.hashSync(datosUsuario.contraseña);
    var esquemaAuxiliar = new usuario(datosUsuario);
    await esquemaAuxiliar.save();
    console.log('ID usuario registrado: '+ esquemaAuxiliar._id)
    return esquemaAuxiliar._id;
  }   
exports.controlLogin = async function(req){
    let esquemaAuxiliar = await usuario.findOne({ 'nombre': req.body.nombre})
    if(!esquemaAuxiliar) {
        throw new Error('No existe el usuario')
    }
    let control = bcrypt.compareSync(req.body.contraseña, esquemaAuxiliar.contraseña);
    if (!control) {
        throw new Error ('Error en contraseña')
    }
}
exports.controlUsuario = async function(nombreUsuario){
  let esquemaAuxiliar = await usuario.findOne({ 'nombre': nombreUsuario})
  console.log(esquemaAuxiliar);
  if(!esquemaAuxiliar) {
      throw new Error('No existe el usuario')
  }
}
