var peticiones= require("../Servicios/peticionesManejador");
var persistencia= require("../Persistencia/mongoDBConeccion");
var idCompraGateWay;
var idCompraRed;
var idCompraEmisor;
var idCompraTePagoYa;

exports.comunicacion= async (req) => {
    try{
        let respuesta= await comunicacionGateway(req);
        idCompraGateWay=respuesta;
    }catch(error){
        console.error(error.message);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta= await comunicacionRed(req);
        idCompraRed=respuesta;
    }catch(error){
        console.error(error.message);
        let idborradoGate=await revertirCompraGateway(req,idCompraGateWay);
        console.log('Borre en gateway'+idborradoGate);
        throw new Error(error.respuesta);
    }
    try{
        let idCompraEmisor= await comunicacionEmisor(req);
    }catch(error){
        console.error(error);
        let idborradoGate= await revertirCompraGateway(req,idCompraGateWay);
        console.log('Borre en gate:'+idborradoGate);
        let idborradoRed= await revertirCompraRed(idCompraRed);
        console.log('Borre en red:'+idborradoRed);
        throw new Error(error.respuesta);
    }
    try{
        //throw new Error('Probando el roll back');
        idCompraTePagoYa= await persistencia.guardarCompra(req);
        console.log('guarde el id: '+ idCompraTePagoYa);
    }catch(error){
        console.log(error);
        let idborradoGate= await revertirCompraGateway(req,idCompraGateWay);
        console.log('Borre en gateway'+idborradoGate);
        let idborradoRed= await revertirCompraRed(idCompraRed);
        console.log('Borre en red'+idborradoRed);
        let idborradoEmisor= await revertirCompraEmisor(idCompraEmisor);
        console.log('Borre en emisor'+idborradoEmisor);
        throw new Error(error.respuesta.data);
    }
    return idCompraTePagoYa;
};   
exports.buscarURLGateway = async (nombreGate) => {
    let URL= await persistencia.buscarURLGateway(nombreGate);
    return URL;
}; 
exports.buscarNombreGateway = async (idCompra) => {
    let gateway= await persistencia.buscarNombreGateway(idCompra);
    console.log('En control'+gateway);
    return gateway;
}; 
comunicacionGateway= async (req) => {
    let URL= await persistencia.buscarURLGateway(req.body.gateway);
    let respuesta= await peticiones.enviarCompraGateway(req,URL);
    return respuesta;
};
revertirCompraGateway= async (req,idCompraEliminarGateway) => {
    let URL= await persistencia.buscarURLGateway(req.body.gateway);
    let respuesta= await peticiones.eliminarCompraGateway(idCompraEliminarGateway,URL);
    return respuesta;
};
comunicacionRed= async (req) => {
    let respuesta=await peticiones.enviarCompraRed(req);
    return respuesta;
};
revertirCompraRed= async (idCompraEliminar) => {
    let respuesta=await peticiones.eliminarCompraRed(idCompraEliminar);
    return respuesta;
};
comunicacionEmisor= async (req) => {
    let respuesta=await peticiones.enviarCompraEmisor(req);
    return respuesta;
}; 
revertirCompraEmisor= async (idCompraEliminar) => {
    let respuesta=await peticiones.eliminarCompraEmisor(idCompraEliminar);
    return respuesta;
};
guardarCompra = async (req) => {
    let idCompra= await persistencia.guardarCompra(req);
    return idCompra;
}; 
eliminarCompra = async (idComraAEliminarTePagoYa) => {
    let idCompra= await persistencia.eliminarCompra(idComraAEliminarTePagoYa);
    return idCompra;
}; 


