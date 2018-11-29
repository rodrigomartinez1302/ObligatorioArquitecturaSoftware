var mongoose = require("mongoose");
var configDB = require("../Configuracion/db");
var Transaccion = require("../Modelo/transaccionEsquema");
var Aplicativo = require("../Modelo/URLAplicativoEsquema");

mongoose.Promise = global.Promise;

exports.Conectar = async function() {
  try {
    await mongoose.connect(configDB.URL, { useNewUrlParser: true });
    console.log("Connección a la base exitosa");
  } catch (error) {
    console.log("Error al conectar a la base");
  }
};
exports.guardarTransaccion = async function(transaccionAGuardar) {
  try {
    var transaccion = new Transaccion(transaccionAGuardar);
    await transaccion.save();
    console.log("IDtransaccion:" + transaccion._id);
    return transaccion._id;
  } catch (error) {
    throw new Error("Error al guardar la transacción");
  }
};
exports.eliminarTransaccion = async function(idTransaccionAEliminar) {
  try {
    let transaccion = await Transaccion.findByIdAndDelete(
      idTransaccionAEliminar
    );
    if (!transaccion) {
      throw new Error("No se encontró el ID");
    }
    console.log("IDTransaccion eliminado:" + idTransaccionAEliminar);
    return idTransaccionAEliminar;
  } catch (error) {
    throw new Error("Error al eliminar la transacción");
  }
};
exports.realizarDevolucionTransaccion = async function(idTransaccion) {
  try {
    let transaccion = await Transaccion.findById(idTransaccion);
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
exports.realizarChargeBack = async function(idTransaccion) {
  try {
    let transaccion = await Transaccion.findById(idTransaccion);
    if (!transaccion) {
      throw new Error("No se encontró el ID");
    }
    transaccion.chargeBack = true;
    await transaccion.save();
    console.log("IDTransaccion chargeback:" + transaccion._id);
    return transaccion._id;
  } catch (error) {
    throw new Error("Error al registrar la devolución");
  }
};
exports.consultarIDTransaccionGateway = async function(idTransaccion) {
  let transaccion = mongoose.model("Transaccion");
  let consulta = await transaccion.findById(idTransaccion).exec();
  if (!consulta) {
    throw new Error("No existe la transacción");
  }
  return consulta.idTransaccionGateway;
};
exports.consultarIDTransaccionRed = async function(idTransaccion) {
  let transaccion = mongoose.model("Transaccion");
  let consulta = await transaccion.findById(idTransaccion).exec();
  if (!consulta) {
    throw new Error("No existe la transacción");
  }
  return consulta.idTransaccionRed;
};
exports.consultarIDTransaccionEmisor = async function(idTransaccion) {
  let transaccion = mongoose.model("Transaccion");
  let consulta = await transaccion.findById(idTransaccion).exec();
  if (!consulta) {
    throw new Error("No existe la transacción");
  }
  return consulta.idTransaccionEmisor;
};
exports.guardarDatosAplicativo = async function(aplicativo) {
  var aplicativo = new Aplicativo(aplicativo);
  await aplicativo.save(function(error, respuesta) {
    if (error) {
      throw new Error("Error al guardar el aplicativo");
    } else {
      console.log(respuesta);
    }
  });
};
exports.buscarURLAplicativo = async function(nombreAplicativo, recurso, verbo) {
  let aplictivo = mongoose.model("URLAplicativo");
  let consulta = await aplictivo
    .findOne({
      nombre: nombreAplicativo,
      recurso: recurso,
      verbo: verbo
    })
    .exec();
  if (!consulta) {
    throw new Error(
      "Error al buscar la URL del apicativo: " + nombreAplicativo
    );
  }
  return consulta.URL;
};
exports.buscarAplicativos = async function(idTransaccion) {
  let transaccion = await Transaccion.findById(idTransaccion);
  let aplicativos;
  if (!transaccion) {
    throw new Error("No se encontró el id");
  }
  aplicativos = {
    gateway: transaccion.gateway,
    red: transaccion.red,
    emisor: transaccion.emisor,
    comercio: transaccion.comercio
  };
  return aplicativos;
};
