var mongoose = require("mongoose");
var Usuario = require("../Modelo/usuarioEsquema");
var configdb = require("../Configuracion/db");
var bcrypt = require("bcryptjs");

mongoose.Promise = global.Promise;

exports.Conectar = async function() {
  try {
    await mongoose.connect(
      configdb.URL,
      { useNewUrlParser: true }
    );
    console.log("Connección a la base exitosa");
  } catch (error) {
    console.log("Error al conectar a la base");
  }
};
exports.registrarUsuario = async function(datosUsuario) {
  datosUsuario.contraseña = bcrypt.hashSync(datosUsuario.contraseña);
  var usuario = new Usuario(datosUsuario);
  await usuario.save();
  console.log("ID usuario registrado: " + usuario._id);
  return usuario._id;
};
exports.controlLogin = async function(req) {
  let usuario = await Usuario.findOne({ nombre: req.body.nombre });
  if (!usuario) {
    throw new Error("No existe el usuario");
  }
  let control = bcrypt.compareSync(req.body.contraseña, usuario.contraseña);
  if (!control) {
    throw new Error("Error en contraseña");
  }
};
exports.controlUsuario = async function(nombreUsuario) {
  let usuario = await Usuario.findOne({ nombre: nombreUsuario });
  if (!usuario) {
    throw new Error("No existe el usuario");
  }
};
exports.obtenerRol = async function(nombreUsuario) {
  let usuario = await Usuario.findOne({ nombre: nombreUsuario });
  return usuario.rol;
};
