var peticiones= require("../Servicios/peticionesManejador");
var controladorTePagoYa= require("../Controlador/controladorTePagoYa");

module.exports  = function(app,db) {
  app.post('/Compras',async(req,res)=>{
    try{
    var respuesta= await controladorTePagoYa.comunicacion(req);
    res.status(200).send('Compra enviada');
    }catch(error){
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });
}
    