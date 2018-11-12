var peticiones= require("../Servicios/peticionesManejador");
var persistencia= require("../Persistencia/mongoDBConeccion");
var idCompraGateWay;
var idCompraRed;
var idCompraEmisor;
var idCompraTePagoYa;

exports.comunicacionCompra= async (req) => {
    try{
        let respuesta= await comunicacionCompraGateway(req);
        idCompraGateWay=respuesta;
    }catch(error){
        console.error(error.message);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta= await comunicacionCompraRed(req);
        idCompraRed=respuesta;
    }catch(error){
        let idborradoGate=await revertirCompraGateway(req.body.gateway,idCompraGateWay);
        console.error(error.message);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta= await comunicacionCompraEmisor(req);
        idCompraEmisor=respuesta;
    }catch(error){
        let idborradoGate= await revertirCompraGateway(req.body.gateway,idCompraGateWay);
        let idborradoRed= await revertirCompraRed(idCompraRed);
        console.error(error.message);
        throw new Error(error.respuesta);
    }
    try{
        //throw new Error('Probando el roll back');
        idCompraTePagoYa= await guardarCompra(req);
    }catch(error){
        let idborradoGate= await revertirCompraGateway(req,idCompraGateWay);
        let idborradoRed= await revertirCompraRed(idCompraRed);
        let idborradoEmisor= await revertirCompraEmisor(idCompraEmisor);
        console.log(error);
        throw new Error(error.respuesta.data);
    }
    return idCompraTePagoYa;
};   
exports.buscarURLGateway = async (nombreGate) => {
    let URL= await persistencia.buscarURLGateway(nombreGate);
    return URL;
}; 
comunicacionCompraGateway= async (req) => {
    let URL= await buscarURLGateway(req.body.gateway);
    let respuesta=await peticiones.enviarCompraGateway(req,URL);
    return respuesta;
};
revertirCompraGateway= async (nombreGate) => {
    let URL= await buscarURLGateway(nombreGate);
    let respuesta= await peticiones.eliminarCompraGateway(idCompraGateWay,URL);
    return respuesta;
};
buscarURLGateway= async (nombreGate) => {
    let URL= await persistencia.buscarURLGateway(nombreGate);
    return URL;
};
comunicacionCompraRed= async (req) => {
    let respuesta=await peticiones.enviarCompraRed(req);
    return respuesta;
};
revertirCompraRed= async (idCompraEliminar) => {
    let respuesta=await peticiones.eliminarCompraRed(idCompraEliminar);
    return respuesta;
};
comunicacionCompraEmisor= async (req) => {
    let respuesta=await peticiones.enviarCompraEmisor(req);
    return respuesta;
}; 
revertirCompraEmisor= async (idCompraEliminar) => {y
    let respuesta=await peticiones.eliminarCompraEmisor(idCompraEliminar);
    return respuesta;
};
guardarCompra = async (req) => {
    req.body.idCompraGate = idCompraGateWay;
    req.body.idCompraRed = idCompraRed;
    req.body.idCompraEmisor = idCompraEmisor;
    let idCompra= await persistencia.guardarCompra(req);
    return idCompra;
}; 
eliminarCompra = async (idComraAEliminarTePagoYa) => {
    let idCompra= await persistencia.eliminarCompra(idComraAEliminarTePagoYa);
    return idCompra;
}; 
exports.comunicacionDevolucion= async (req) => {
    idCompraTePagoYa = req.params.id;
    try{
        let respuesta = await comunicacionDevolucionEmisor(req);
        idCompraEmisor=respuesta;
    }catch(error){
        console.log(error.respuesta);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta = await comunicacionDevolucionRed(req);
        idCompraRed=respuesta;
    }catch(error){
        console.log(error.respuesta);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta = await comunicacionDevolucionGateway(req);
        idCompraGateWay=respuesta;
    }catch(error){
        throw new Error(error.respuesta);
    }
    return idCompraTePagoYa;
};  
comunicacionDevolucionEmisor= async (req) => {
    await consultarIDCompraEmisor(idCompraTePagoYa);
    let respuesta= await revertirCompraEmisor(idCompraEmisor);
    return respuesta;
};
comunicacionDevolucionRed= async (req) => {
    await consultarIDCompraRed(idCompraTePagoYa);
    let respuesta= await revertirCompraRed(idCompraRed);
    return respuesta;
};
comunicacionDevolucionGateway= async (req) => {
    await consultarIDCompraGateway(idCompraTePagoYa);
    let nombreGate = await buscarNombreGateway(idCompraTePagoYa);
    let respuesta = await revertirCompraGateway(nombreGate);
    return respuesta;
};
consultarIDCompraEmisor= async (idCompra) => {
    idCompraEmisor = await persistencia.consultarIDCompraEmisor(idCompra);
};
consultarIDCompraRed= async (idCompra) => {
    idCompraRed = await persistencia.consultarIDCompraRed(idCompra);
};
consultarIDCompraGateway= async (idCompra) => {
    idCompraGateWay = await persistencia.consultarIDCompraGateway(idCompra);
};
buscarNombreGateway = async (idCompra) => {
    let gateway = await persistencia.buscarNombreGateway(idCompra);
    return gateway;
};
exports.comunicacionChargeBack =  async (req) => {
    try{
        let respuesta = await comunicacionChargeBackEmisor(req);
        idCompraEmisor=respuesta;
    }catch(error){
        console.log(error.respuesta);
        throw new Error(error.respuesta);
    }
}
comunicacionChargeBackEmisor= async (req) => {
    idCompraEmisor = await persistencia.consultarIDCompraEmisor(req.body.idCompra);
    let respuesta = await peticiones.enviarChargeBackEmisor(idCompraEmisor);
    return respuesta;
};

