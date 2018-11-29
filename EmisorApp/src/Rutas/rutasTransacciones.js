var controladorTransacciones = require("../Controladores/controladorTransacciones");

module.exports = function(app) {
  app.post("/Transacciones", async (req, res) => {
    try {
      let idTransaccion = await controladorTransacciones.guardarTransaccion(
        req
      );
      res.status(200).send(idTransaccion);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("No se pudo realizar la petición");
    }
  });
  app.put("/Transacciones/Devoluciones", async (req, res) => {
    try {
      var respuesta = await controladorTransacciones.realizarDevolucionTransaccion(
        req
      );
      res.status(200).send(respuesta);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("No se pudo realizar la petición");
    }
  });
  app.put("/Transacciones/ChargeBacks", async (req, res) => {
    try {
      var idTransaccionChargeBack = await controladorTransacciones.realizarChargeBack(
        req
      );
      res
        .status(200)
        .send(
          "ChargeBack solicitado IDTransacción: " + idTransaccionChargeBack
        );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("No se pudo realizar la petición");
    }
  });
};
