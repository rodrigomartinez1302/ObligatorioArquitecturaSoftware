var persistencia = require('../Persistencia/mongoDBConeccion');

module.exports = function (app, db) {
  app.post('/Compras', async (req, res) => {
    var compraGuardada= await persistencia.guardarCompra(req.body);
    console.log(compraGuardada);
    res.status(200).send('Se guardó la compra');
  });
};


