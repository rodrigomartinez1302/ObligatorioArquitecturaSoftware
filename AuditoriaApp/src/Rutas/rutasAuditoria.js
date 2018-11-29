let controladorEventos = require("../Controladores/controladorEventos");

module.exports = function(app) {
  app.post("/Auditorias/Errores/", async (req, res) => {
    try {
      await controladorEventos.registrarError(req);
      res.status(200).send("Error registrado en el repositorio");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error al realizar la petición intente más tarde");
    }
  });
  app.post("/Auditorias/Logs/", async (req, res) => {
    try {
      await controladorEventos.registrarLog(req);
      res.status(200).send("log registrado en el repositorio");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error al realizar la petición intente más tarde");
    }
  });
};
