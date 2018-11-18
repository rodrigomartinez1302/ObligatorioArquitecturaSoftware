var controladorGateway= require("../Controlador/controladorGateway");

module.exports = function (app, db) {
  app.post('/Transacciones', async (req, res) => {
      try{
      let respuesta = await controladorGateway.guardarTransaccion(req);
      res.status(200).send(respuesta);
      }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
      }
    });
    app.delete("/Transacciones/:id", async (req, res) => {
        try{
        let idTransaccion= await controladorGateway.revertirTransaccion(req);
        res.status(200).send(idTransaccion);
        }
        catch(error){
          res.status(500).send(error.message);
        }
    });
    app.put('/Transacciones/Devoluciones', async(req,res) => {
      try{
        var respuesta= await controladorGateway.realizarDevolucionTransaccion(req);
        res.status(200).send(respuesta);
      }catch(error){
        res.status(500).send(error.message);
    }
    });
    app.put('/Transacciones/ChargeBacks', async(req,res) => {
      try{
        var respuesta= await controladorGateway.realizarChargeBack(req);
        res.status(200).send(respuesta);
      }catch(error){
        res.status(500).send(error.message);
      }
    });
  }


