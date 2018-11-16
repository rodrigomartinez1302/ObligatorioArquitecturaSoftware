var controladorTePagoYa= require("../Controlador/controladorTePagoYa");

module.exports  = function(app,db) {
  app.post('/Transacciones',async(req,res)=>{
    try{
    var respuesta = await controladorTePagoYa.comunicacionTransaccion(req);
    res.status(200).send('IDTransaccion guardada: '+respuesta);
    }catch(error){
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });
  /*app.delete("/Transacciones/:id", async (req, res) => {
    try{
    let idTransaccion = req.params.id;
    let respuesta = await controladorTePagoYa.comunicacionDevolucion(req);
    res.status(200).send('IDTransaccion eliminada: '+respuesta);
    }
    catch(error){
      res.status(500).send(error.message);
    }
    
  });*/
  app.put('/Transacciones/Devoluciones',async(req,res)=>{
    try{
      var respuesta = await controladorTePagoYa.realizarDevolucionTransaccion(req);
      res.status(200).send('Devolución IDTransaccion: ' + respuesta);
    }catch(error){
      res.status(500).send(error.message);
  }
  });
  app.post('/ChargeBacks',async(req,res)=>{
    try{
      var respuesta= await controladorTePagoYa.comunicacionChargeBack(req);
      res.status(200).send(respuesta);
    }catch(error){
      console.log(error.message);
      res.status(500).send(error.message);
  }
  });
}
    