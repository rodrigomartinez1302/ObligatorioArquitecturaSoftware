const persistencia= require("../Persistencia/controladorDB");
const peticiones= require("./controladorPeticiones");
var controladorComercio= require("../Controlador/controladorComercio");

module.exports = function(app,db) {
  app.post('/Transacciones' , async (req , res) => {
    try {
      var respuesta = await controladorComercio.enviarTransaccion(req);
      res.status(200).send(respuesta);
    } catch(error) {
      console.log(error.message);
      res.status(500).send(error.message);
  }
});
app.put('/Transacciones/Devoluciones', async (req , res) => {
  try {
    var respuesta = await controladorComercio.realizarDevolucionTransaccion(req);
    res.status(200).send(respuesta);
  } catch(error) {
    res.status(500).send(error.message);
}
});
app.post('/Transacciones/ChargeBacks', async (req, res) => {
  try {
    console.log(req.body);
    var respuesta = await controladorComercio.procesarChargeBack(req);
    res.status(200).send(respuesta);
  } catch(error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
}
