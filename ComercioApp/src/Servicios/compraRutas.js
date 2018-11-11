const persistencia= require("../Persistencia/mongoDBConeccion");
const peticiones= require("../Servicios/peticionesManejador");
var controladorComercio= require("../Controlador/controladorComercio");

module.exports  =  function(app,db) {
  app.post('/Compras',async(req,res)=>{
    try{
      var respuesta= await controladorComercio.enviarCompraTePagoYa(req);
      res.status(200).send(respuesta);
    }catch(error){
      console.log(error.message);
      res.status(500).send(error.message);
  }
});
}
