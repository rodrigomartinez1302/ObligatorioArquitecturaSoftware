var controladorTransacciones= require("../Controladores/controladorTransacciones");

module.exports = function (app) {
  app.post('/Transacciones', async (req, res) => {
    try {
      var idTransaccion = await controladorTransacciones.comunicacionTransaccion(req);
      res.status(200).send(idTransaccion);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
    }
  });
  app.put('/Transacciones/Devoluciones', async(req, res) => {
    try {
      var respuesta = await controladorTransacciones.realizarDevolucionTransaccion(req);
      res.status(200).send(respuesta);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
    }
  });
  app.put('/Transacciones/ChargeBacks', async(req, res) => {
    try {
      var respuesta = await controladorTransacciones.realizarChargeBack(req);
      res.status(200).send(respuesta);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
    }
  });
}