var controladorAutenticacion= require("../Controladores/controladorErrores");

module.exports = function (app, db) {
  app.post('/Errores/', async (req, res) => {
    try {
      await controladorAutenticacion.registrarError(req);
      res.status(200).send('Error registrado');
    } catch(error) {
      console.log(error.message);
      res.status(500).send('Error al realizar la petición intente más tarde');
    }
  });
}


