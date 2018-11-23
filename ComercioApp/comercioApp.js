let controladorApp =  require("./src/Controladores/ControladorApp");
try {
    controladorApp.inicializarApp();
} catch (error) {
    throw new Error (error.message);
}


