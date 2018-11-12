const persistencia= require("../Persistencia/controladorDB");
const peticiones= require("./controladorPeticiones");
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
app.delete("/Compras/:id", async (req, res) => {
  try{
  let idCompra= await controladorComercio.enviarDenunciaTePagoYa(req);
  res.status(200).send(idCompra);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});
app.post('/ChargeBack',async(req,res)=>{
  try{
    var respuesta= await controladorComercio.enviarChargeTePagoYa(req);
    res.status(200).send(respuesta);
  }catch(error){
    console.log(error.message);
    res.status(500).send(error.message);
}
});
}
