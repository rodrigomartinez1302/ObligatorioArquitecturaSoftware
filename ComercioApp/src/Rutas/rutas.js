var controladorTransacciones= require("../Controladores/controladorTransacciones");

module.exports = function(app,db) {
  app.post('/Transacciones' , async (req , res) => {
    try {
      var respuesta = await controladorTransacciones.enviarTransaccion(req);
      res.status(200).send(respuesta);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
    }
  });
  app.put('/Transacciones/Devoluciones', async (req , res) => {
    try {
      var respuesta = await controladorTransacciones.realizarDevolucionTransaccion(req);
      res.status(200).send(respuesta);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
  }
});
  app.post('/Transacciones/ChargeBacks', async (req, res) => {
    try {
      var respuesta = await controladorTransacciones.procesarChargeBack(req);
      res.status(200).send(respuesta);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
    }
  });
  app.get('/Transacciones/CierreLotes/:gateway', async(req,res) => {
    try {
      var idTransaccionEmisor = await controladorTransacciones.solicitarCierreLotes(req);
      res.status(200).send(idTransaccionEmisor);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
    }
  });
}
