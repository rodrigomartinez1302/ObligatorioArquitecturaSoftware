var mongoose = require("mongoose");
var Transaccion = require("../Modelo/TransaccionEsquema");
var Red = require("../Modelo/redEsquema");
var configDB = require("../Configuracion/db");
var moment = require("moment");

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
    let transaccion = new Transaccion(req.body);
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
    console.log("IDTransaccion eliminada:" + req.params.id);
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
exports.realizarCierreLotes = async function(RUT, hora, minutos) {
  let transaccion = mongoose.model("Transaccion");
  let desde = moment().startOf("day").format();
  let hasta = moment().set({ hour: hora, minute: minutos }).format();
  try {
    let resultado = await transaccion.aggregate([
      {
        $match: {
          RUT: RUT,
          devolucion: false,
          fechaTransaccion: {
            $gte: desde,
            $lte: hasta
          }
        }
      },
      {
        $group: {
          _id: "$RUT",
          suma: { $sum: "$monto" }
        }
      }
    ]);
    return "Cierre de lote para RUT " + RUT + ": $" + resultado[0].suma;
  } catch (error) {
    return "Cierre de lote para RUT " + RUT + ": $0";
  }
};
exports.guardarRed = async function(redAGuardar) {
  let red = new Red(redAGuardar);
  await red.save(function(error, respuesta) {
    if (error) {
      throw new Error(error.message);
    }
  });
};
exports.buscarRedPorPrefijoTarjeta = async function(idRed) {
  let red = await mongoose.model("Red");
  let retorno = await red.findOne({ idRed: idRed }, "nombreRed").exec();
  if (!retorno) {
    throw new Error("Error en busqueda de Red");
  }
  return retorno.nombreRed;
};
