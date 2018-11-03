var persistencia = require('../Persistencia/mongoDBConeccion');

module.exports = function (app, db) {
  app.post('/Compras', async (req, res) => {
    try{
    var compraGuardada= await persistencia.guardarCompra(req.body);
     }catch(error){
      res.status(400).send('No se pudo guardar la compra');
    }
    console.log(compraGuardada);
    res.status(200).send('Se guardó la compra');
  });
};


