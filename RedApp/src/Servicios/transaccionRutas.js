
var peticiones= require("./controladorPeticiones");
var controladorRed= require("../Controlador/controladorRed");

module.exports = function (app, db) {
  app.post('/Transacciones', async (req, res) => {
    try{
      var idTransaccion= await controladorRed.guardarTransaccion(req);
      res.status(200).send(idTransaccion);
    }catch(error){
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });
  app.delete("/Transacciones/:id", async (req, res) => {
    try{
      let idTransaccion= await controladorEmisor.revertirTransaccion(req);
      res.status(200).send(idTransaccion);
    }
    catch(error){
      res.status(500).send(error.message);
    }
  });
  app.put('/Transacciones/Devoluciones',async(req,res)=>{
    try{
      console.log(req.body);
      var respuesta= await controladorRed.realizarDevolucionTransaccion(req);
      res.status(200).send(respuesta);
    }catch(error){
      res.status(500).send(error.message);
  }
  });
}