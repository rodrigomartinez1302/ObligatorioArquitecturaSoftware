var controladorAutenticacion = require("../Controladores/controladorAutenticacion");

module.exports = function(app) {
  app.post("/Autenticaciones/Logueos", async (req, res) => {
    try {
      let respuesta = await controladorAutenticacion.login(req);
      res.status(200).send(respuesta);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  app.post("/Autenticaciones/Validaciones", async (req, res) => {
    try {
      let respuesta = await controladorAutenticacion.validar(req);
      res.status(200).send(respuesta);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};
