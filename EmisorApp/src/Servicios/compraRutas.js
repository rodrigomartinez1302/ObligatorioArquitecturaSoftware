var controladorEmisor= require("../Controlador/controladorEmisor");

module.exports = function (app, db) {
  app.post('/Compras', async (req, res) => {
    try{
      let idCompra= await controladorEmisor.guardarCompra(req);
      res.status(200).send(idCompra);
      }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
      }
    });
    app.delete("/Compras/:id", async (req, res) => {
      try{
      console.log(req.body);
      let idCompra= await controladorEmisor.eliminarCompra(req);
      res.status(200).send(idCompra);
      }
      catch(error){
        res.status(500).send(error.message);
      }
    });
    app.post('/ChargeBack',async(req,res)=>{
      try{
        var respuesta= await controladorEmisor.guardarChargeBack(req);
        res.status(200).send(respuesta);
      }catch(error){
        res.status(500).send(error.message);
    }
    });
  }


