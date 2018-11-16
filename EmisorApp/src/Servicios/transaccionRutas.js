var controladorEmisor= require("../Controlador/controladorEmisor");

module.exports = function (app, db) {
  app.post('/Transacciones', async (req, res) => {
    try {
      let idTransaccion = await controladorEmisor.guardarTransaccion(req);
      res.status(200).send(idTransaccion);
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
    });
    app.delete("/Transacciones/:id", async (req, res) => {
      try {
      let idTransaccion = await controladorEmisor.revertirTransaccion(req);
      res.status(200).send(idTransaccion);
      }
      catch (error) {
        res.status(500).send(error.message);
      }
    });
    app.put('/Transacciones/Devoluciones',async(req,res)=>{
      try {
        var respuesta = await controladorEmisor.realizarDevolucionTransaccion(req);
        res.status(200).send(respuesta);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
    app.put('/Transacciones/ChargeBacks',async(req,res)=>{
      try {
        var idTransaccionChargeBack = await controladorEmisor.realizarChargeBack(req);
        res.status(200).send('ChargeBack solicitado IDTransacción: '+ idTransaccionChargeBack);
      } catch(error) {
        res.status(500).send(error.message);
      }
    });
  }


