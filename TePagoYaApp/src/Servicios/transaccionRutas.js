var controladorTePagoYa= require("../Controlador/controladorTePagoYa");

module.exports  = function(app,db) {
  app.post('/Transacciones', async(req,res) => {
    try {
      var respuesta = await controladorTePagoYa.comunicacionTransaccion(req);
      res.status(200).send('IDTransacción guardada: ' + respuesta);
    } catch(error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });
  app.put('/Transacciones/Devoluciones', async(req,res) => {
    try {
      var respuesta = await controladorTePagoYa.ComunicacionDevolucion(req);
      res.status(200).send('Devolución IDTransacción: ' + respuesta);
    }catch(error){
      res.status(500).send(error.message);
  }
  });
  app.put('/ChargeBacks', async(req,res) => {
    try {
      var idTransaccionEmisor = await controladorTePagoYa.comunicacionChargeBack(req);
      res.status(200).send(idTransaccionEmisor);
    } catch(error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });
}
    