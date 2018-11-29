var jwt = require("jsonwebtoken");
var controladorPersistencia = require("./controladorDB");
var configApp = require("../Configuracion/app");

exports.login = async req => {
  try {
    await controladorPersistencia.controlLogin(req);
  } catch (error) {
    throw new Error(error.message);
  }
  try {
    let respuesta = generarRespuestaLogin(req.body.nombre);
    return respuesta;
  } catch (error) {
    throw new Error("Error al generar el token");
  }
};
generarRespuestaLogin = nombreUsuario => {
  let token = jwt.sign({ id: nombreUsuario }, configApp.CLAVE, {
    expiresIn: 86400
  });
  let respuesta = { auth: true, token: token };
  return respuesta;
};
obtenerUsuario = token => {
  let usuario = jwt.verify(token, configApp.CLAVE);
  return usuario.id;
};
exports.validar = async req => {
  let usuario;
  let respuesta;
  try {
    usuario = obtenerUsuario(req.body.token);
  } catch (error) {
    throw new Error("Error en token");
  }
  try {
    await controladorPersistencia.controlUsuario(usuario);
  } catch (error) {
    throw new Error(error.message);
  }
  respuesta = generarRespuestaValidar(usuario);
  return respuesta;
};
generarRespuestaValidar = async usuario => {
  let rol = await controladorPersistencia.obtenerRol(usuario);
  let respuesta = { auth: true, rol: rol };
  return respuesta;
};
