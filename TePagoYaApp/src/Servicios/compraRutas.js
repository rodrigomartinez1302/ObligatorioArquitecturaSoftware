var peticiones= require("../Servicios/peticionesManejador");
var controladorTePagoYa= require("../Controlador/controladorTePagoYa");

module.exports  = function(app,db) {
  app.post('/Compras',async(req,res)=>{
    try{
    var respuesta= await controladorTePagoYa.comunicacionCompra(req);
    res.status(200).send('idCompra guardada: '+respuesta);
    }catch(error){
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });
  app.delete("/Compras/:id", async (req, res) => {
    try{
    let respuesta= await controladorTePagoYa.enviarDenuncia(req);
    res.status(200).send('idCompra eliminada: '+respuesta);
    }
    catch(error){
      res.status(500).send(error.message);
    }
  });
}
    