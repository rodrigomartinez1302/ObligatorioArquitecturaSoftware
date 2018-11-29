var controladorTransacciones = require("../Controladores/controladorTransacciones");

module.exports = function(app) {
  app.post("/Transacciones", async (req, res) => {
    try {
      var respuesta = await controladorTransacciones.comunicacionTransaccion(
        req
      );
      res.status(200).send("IDTransacción guardada: " + respuesta);
    } catch (error) {
      res.status(500).send("No se pudo realizar la petición intente más tarde");
    }
  });
  app.put("/Transacciones/Devoluciones", async (req, res) => {
    try {
      var respuesta = await controladorTransacciones.ComunicacionDevolucion(
        req
      );
      res.status(200).send("Devolución IDTransacción: " + respuesta);
    } catch (error) {
      res.status(500).send("No se pudo realizar la petición intente más tarde");
    }
  });
  app.put("/Transacciones/ChargeBacks", async (req, res) => {
    try {
      var idTransaccionTePagoYa = await controladorTransacciones.comunicacionChargeBack(
        req
      );
      res.status(200).send(idTransaccionTePagoYa);
    } catch (error) {
      res.status(500).send("No se pudo realizar la petición intente más tarde");
    }
  });
  app.get("/Transacciones/CierreLotes", async (req, res) => {
    try {
      var respuesta = await controladorTransacciones.comunicacionCierreLotes(
        req
      );
      res.status(200).send(respuesta);
    } catch (error) {
      res.status(500).send("No se pudo realizar la petición intente más tarde");
    }
  });
  app.post("/Transacciones/Gateways", async (req, res) => {
    try {
      var respuesta = await controladorTransacciones.comunicacionTransaccionRed(
        req
      );
      res.status(200).send("IDTransacción guardada: " + respuesta);
    } catch (error) {
      res.status(500).send("No se pudo realizar la petición intente más tarde");
    }
  });
  app.post("/Transacciones/Reds", async (req, res) => {
    try {
      var respuesta = await controladorTransacciones.comunicacionTransaccionEmisor(
        req
      );
      res.status(200).send("IDTransacción guardada: " + respuesta);
    } catch (error) {
      res.status(500).send("No se pudo realizar la petición intente más tarde");
    }
  });
};
