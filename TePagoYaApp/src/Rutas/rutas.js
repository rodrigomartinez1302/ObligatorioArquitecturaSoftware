var controladorTransacciones= require("../Controladores/controladorTransacciones");

module.exports  = function(app,db) {
  app.post('/Transacciones', async(req,res) => {
    try {
      var respuesta = await controladorTransacciones.comunicacionTransaccion(req);
      res.status(200).send('IDTransacción guardada: ' + respuesta);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
    }
  });
  app.put('/Transacciones/Devoluciones', async(req,res) => {
    try {
      var respuesta = await controladorTransacciones.ComunicacionDevolucion(req);
      res.status(200).send('Devolución IDTransacción: ' + respuesta);
    }catch(error){
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
  }
  });
  app.put('/ChargeBacks', async(req,res) => {
    try {
      var idTransaccionEmisor = await controladorTransacciones.comunicacionChargeBack(req);
      res.status(200).send(idTransaccionEmisor);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
    }
  });
  app.get('/Transacciones/CierreLotes', async(req,res) => {
    try {
      var respuesta = await controladorTransacciones.comunicacionCierreLotes(req);
      console.log(respuesta);
      res.status(200).send(respuesta);
    } catch(error) {
      console.log(error.message);
      res.status(500).send('No se pudo realizar la petición');
    }
  });
}
    