let controladorApp = require("./src/Controladores/controladorApp");
try {
  controladorApp.inicializarApp();
} catch (error) {
  throw new Error(error.message);
}