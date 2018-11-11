
var peticiones= require("../Servicios/peticionesManejador");
var controladorRed= require("../Controlador/controladorRed");

module.exports = function (app, db) {
  app.post('/Compras', async (req, res) => {
    try{
      var idCompra= await controladorRed.guardarCompra(req);
      res.status(200).send(idCompra);
    }catch(error){
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });
  app.delete("/Compras/:id", async (req, res) => {
    try{
      let idCompra= await controladorRed.eliminarCompra(req);
      res.status(200).send(idCompra);
    }
    catch(error){
      res.status(500).send(error.message);
    }
  });
}