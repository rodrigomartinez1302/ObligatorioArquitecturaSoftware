var controladorGateway= require("../Controlador/controladorGateway");

module.exports = function (app, db) {
  app.post('/Compras', async (req, res) => {
      try{
      let idCompra= await controladorGateway.guardarCompra(req);
      res.status(200).send(idCompra);
      }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
      }
    });
    app.delete("/Compras/:id", async (req, res) => {
        try{
        let idCompra= await controladorGateway.eliminarCompra(req);
        res.status(200).send(idCompra);
        }
        catch(error){
          res.status(500).send(error.message);
        }
    });
  }


