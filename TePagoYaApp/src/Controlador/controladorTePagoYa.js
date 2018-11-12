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
        console.error(error.message);
        let idborradoGate=await revertirCompraGateway(req.body.gateway,idCompraGateWay);
        console.log('Borre en gateway'+idborradoGate);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta= await comunicacionCompraEmisor(req);
        idCompraEmisor=respuesta;
    }catch(error){
        console.error(error);
        let idborradoGate= await revertirCompraGateway(req,idCompraGateWay);
        console.log('Borre en gate: '+idborradoGate);
        let idborradoRed= await revertirCompraRed(idCompraRed);
        console.log('Borre en red: '+idborradoRed);
        throw new Error(error.respuesta);
    }
    try{
        //throw new Error('Probando el roll back');
        idCompraTePagoYa= await guardarCompra(req);
        console.log('guarde el id: '+ idCompraTePagoYa);
    }catch(error){
        console.log(error);
        let idborradoGate= await revertirCompraGateway(req,idCompraGateWay);
        console.log('Borre en gateway: '+idborradoGate);
        let idborradoRed= await revertirCompraRed(idCompraRed);
        console.log('Borre en red: '+idborradoRed);
        let idborradoEmisor= await revertirCompraEmisor(idCompraEmisor);
        console.log('Borre en emisor: '+idborradoEmisor);
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
revertirCompraEmisor= async (idCompraEliminar) => {
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
exports.enviarDenuncia= async (req) => {
    idCompraTePagoYa = req.params.id;
    try{
        let respuesta = await comunicacionDenunciaEmisor(req);
        idCompraEmisor=respuesta;
    }catch(error){
        console.log(error.respuesta);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta = await comunicacionDenunciaRed(req);
        idCompraRed=respuesta;
    }catch(error){
        console.log(error.respuesta);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta = await comunicacionDenunciaGateway(req);
        idCompraGateWay=respuesta;
    }catch(error){
        throw new Error(error.respuesta);
    }
    return idCompraTePagoYa;
};  
comunicacionDenunciaEmisor= async (req) => {
    await consultarIDCompraEmisor(idCompraTePagoYa);
    let respuesta= await revertirCompraEmisor(idCompraEmisor);
    return respuesta;
};
comunicacionDenunciaRed= async (req) => {
    await consultarIDCompraRed(idCompraTePagoYa);
    let respuesta= await revertirCompraRed(idCompraRed);
    return respuesta;
};
comunicacionDenunciaGateway= async (req) => {
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

