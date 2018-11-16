var controladorGateway= require("../Controlador/controladorGateway");

module.exports = function (app, db) {
  app.post('/Transacciones', async (req, res) => {
      try{
      let idTransaccion= await controladorGateway.guardarTransaccion(req);
      res.status(200).send(idTransaccion);
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
  }


