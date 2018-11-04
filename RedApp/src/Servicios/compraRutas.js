var persistencia= require("../Persistencia/mongoDBConeccion");
var axios = require('axios');
var https = require('https');
const peticiones= require("../Servicios/peticionesManejador");

module.exports  = function(app,db) {
  app.post('/Compras',async(req,res)=>{
    try{
    var compraGuardada=await persistencia.guardarCompra(req.body);
  }catch(error){
    res.status(400).send('No se pudo guardar la compra');
  }
    res.status(200).send(compraGuardada);
  });
  app.delete("/Compras/", async (req, res) => {
    try{
      await persistencia.eliminarCompra(req);
      res.status(200).send('Se eliminó la compra'); 
    }
    catch(Err){
      res.status(400).send('No se encontró la compra');
    }
  });
};