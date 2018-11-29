var mongoose = require("mongoose");
var Transaccion = require("../Modelo/transaccionEsquema");
var configDB = require("../Configuracion/db");
//var configApp = require('../Configuracion/app');
var Emisor = require("../Modelo/emisorEsquema");
var Control = require("../Modelo/controlesEsquema");
//var moment = require('moment');

mongoose.Promise = global.Promise;

exports.Conectar = async function() {
  try {
    await mongoose.connect(configDB.URL, { useNewUrlParser: true });
    console.log("Connección a la base exitosa");
  } catch (error) {
    console.log("Error al conectar a la base");
  }
};
exports.guardarTransaccion = async function(req) {
  try {
    var transaccion = new Transaccion(req.body);
    await transaccion.save();
    console.log("IDtransaccion:" + transaccion._id);
    return transaccion._id;
  } catch (error) {
    throw new Error("Error al guardar la transacción");
  }
};
exports.eliminarTransaccion = async function(req) {
  try {
    let transaccion = await Transaccion.findByIdAndDelete({
      _id: req.params.id
    });
    if (!transaccion) {
      throw new Error("No se encontró el id");
    }
    console.log("IDTransaccion eliminado:" + req.params.id);
    return req.params.id;
  } catch (error) {
    throw new Error("Error al eliminar la transacción");
  }
};
exports.realizarDevolucionTransaccion = async function(req) {
  try {
    let transaccion = await Transaccion.findById(req.body.idTransaccion);
    if (!transaccion) {
      throw new Error("No se encontró el id");
    }
    transaccion.devolucion = true;
    await transaccion.save();
    console.log("IDTransaccion devolución:" + transaccion._id);
    return transaccion._id;
  } catch (error) {
    throw new Error("Error al registrar la devolución");
  }
};
exports.realizarChargeBack = async function(req) {
  let transaccion = await Transaccion.findById(req.body.idTransaccion);
  transaccion.chargeBack = true;
  await transaccion.save();
  console.log("IDTransaccion chargeback:" + transaccion._id);
  return transaccion._id;
};
exports.cantidadTransacciones = async function(nroTarjeta, desde) {
  var resultado;
  var transaccion = mongoose.model("Transaccion");
  resultado = await transaccion
    .find({
      fechaTransaccion: {
        $gte: desde
      },
      tarjeta: {
        $eq: nroTarjeta
      },
      devolucion: {
        $eq: false
      }
    })
    .exec();
  return resultado.length;
};
exports.guardarEmisor = async function(emisorAGuardar) {
  let emisor = new Emisor(emisorAGuardar);
  await emisor.save(function(error, respuesta) {
    if (error) {
      throw new Error(error.message);
    }
  });
};
exports.buscarEmisorPorPrefijoTarjeta = async function(idEmisor) {
  let emisor = await mongoose.model("Emisor");
  let retorno = await emisor
    .findOne({ idEmisor: idEmisor }, "nombreEmisor")
    .exec();
  if (!retorno) {
    throw new Error("Error en busqueda de Emisor");
  }
  return retorno.nombreEmisor;
};
exports.guardarControl = async function(unControl) {
  let control = new Control(unControl);
  await control.save(function(error, respuesta) {
    if (error) {
      throw new Error(error.message);
    }
  });
};
exports.cantidadTRXPermitidas = async function() {
  let control = await mongoose.model("Control");
  let retorno = await control.findOne({ descripcion: "controlFraude" }).exec();
  if (!retorno) {
    throw new Error("Error en busqueda de Emisor");
  }
  return retorno.cantidad;
};
