var peticiones= require("../Servicios/controladorPeticiones");
var persistencia= require("../Persistencia/mongoDBConeccion");
var idTransaccionGateWay;
var idTransaccionRed;
var idTransaccionEmisor;
var idTransaccionTePagoYa;

exports.comunicacionTransaccion= async (req) => {
    try{
        let respuesta= await comunicacionTransaccionGateway(req);
        idTransaccionGateWay=respuesta;
    }catch(error){
        console.error(error.message);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta= await comunicacionTransaccionRed(req);
        idTransaccionRed=respuesta;
    }catch(error){
        let idborradoGate=await revertirTransaccionGateway(req.body.gateway,idTransaccionGateWay);
        console.error(error.message);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta= await comunicacionTransaccionEmisor(req);
        idTransaccionEmisor=respuesta;
    }catch(error){
        let idborradoGate= await revertirTransaccionGateway(req.body.gateway,idTransaccionGateWay);
        let idborradoRed= await revertirTransaccionRed(idTransaccionRed);
        console.error(error.message);
        throw new Error(error.respuesta);
    }
    try{
        //throw new Error('Probando el roll back');
        idTransaccionTePagoYa= await guardarTransaccion(req);
    }catch(error){
        let idborradoGate= await revertirTransaccionGateway(req,idTransaccionGateWay);
        let idborradoRed= await revertirTransaccionRed(idTransaccionRed);
        let idborradoEmisor= await revertirTransaccionEmisor(idTransaccionEmisor);
        console.log(error);
        throw new Error(error.respuesta.data);
    }
    return idTransaccionTePagoYa;
};   
exports.buscarURLGateway = async (nombreGate) => {
    let URL= await persistencia.buscarURLGateway(nombreGate);
    return URL;
}; 
comunicacionTransaccionGateway= async (req) => {
    let URL= await buscarURLGateway(req.body.gateway);
    let respuesta=await peticiones.enviarTransaccionGateway(req,URL);
    return respuesta;
};
revertirTransaccionGateway= async (nombreGate) => {
    let URL= await buscarURLGateway(nombreGate);
    let respuesta= await peticiones.revertirTransaccionGateway(idTransaccionGateWay,URL);
    return respuesta;
};
buscarURLGateway= async (nombreGate) => {
    let URL= await persistencia.buscarURLGateway(nombreGate);
    return URL;
};
comunicacionTransaccionRed= async (req) => {
    let respuesta=await peticiones.enviarTransaccionRed(req);
    return respuesta;
};
revertirTransaccionRed= async (idTransaccionEliminar) => {
    let respuesta=await peticiones.revertirTransaccionRed(idTransaccionEliminar);
    return respuesta;
};
comunicacionTransaccionEmisor= async (req) => {
    let respuesta=await peticiones.enviarTransaccionEmisor(req);
    return respuesta;
}; 
revertirTransaccionEmisor= async (idTransaccionEliminar) => {
    let respuesta=await peticiones.revertirTransaccionEmisor(idTransaccionEliminar);
    return respuesta;
};
guardarTransaccion = async (req) => {
    req.body.idTransaccionGate = idTransaccionGateWay;
    req.body.idTransaccionRed = idTransaccionRed;
    req.body.idTransaccionEmisor = idTransaccionEmisor;
    let idTransaccion = await persistencia.guardarTransaccion(req);
    return idTransaccion;
}; 
revertirTransaccion = async (idTransaccionEliminarTePagoYa) => {
    let idTransaccion = await persistencia.eliminarTransaccion(idTransaccionEliminarTePagoYa);
    return idTransaccion;
}; 
exports.realizarDevolucionTransaccion = async (req) => {
    await consultarIDTransaccionRed(req.body.idTransaccion);
    var idTransaccionRed = await peticiones.enviarDevolucionTransaccionRed(idTransaccionRed);
    //Corregir el id que retorna, no es este el que hay que retornar, es el de tepagoya
    return idTransaccionRed;
 }; 
 consultarIDTransaccionRed= async (idTransaccion) => {
    idTransaccionRed = await persistencia.consultarIDTransaccionRed(idTransaccion);
};
/*
exports.comunicacionRevertirTransaccion = async (req) => {
    idTransaccionTePagoYa = req.params.id;
    try{
        let respuesta = await comunicacionRevertirTransaccionEmisor(req);
        idTransaccionEmisor = respuesta;
    }catch(error){
        console.log(error.respuesta);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta = await comunicacionRevertirTransaccionRed(req);
        idTransaccionRed=respuesta;
    }catch(error){
        console.log(error.respuesta);
        throw new Error(error.respuesta);
    }
    try{
        let respuesta = await comunicacionRevertirTransaccionGateway(req);
        idTransaccionGateWay=respuesta;
    }catch(error){
        throw new Error(error.respuesta);
    }
    return idTransaccionTePagoYa;
};  

comunicacionRevertirTransaccionEmisor= async (req) => {
    await consultarIDTransaccionEmisor(idTransaccionTePagoYa);
    let respuesta= await revertirTransaccionEmisor(idTransaccionEmisor);
    return respuesta;
};
comunicacionRevertirTransaccionRed= async (req) => {
    await consultarIDTransaccionRed(idTransaccionTePagoYa);
    let respuesta= await revertirTransaccionRed(idTransaccionRed);
    return respuesta;
};
comunicacionRevertirTransaccionGateway= async (req) => {
    await consultarIDTransaccionGateway(idTransaccionTePagoYa);
    let nombreGate = await buscarNombreGateway(idTransaccionTePagoYa);
    let respuesta = await revertirTransaccionGateway(nombreGate);
    return respuesta;
};
consultarIDTransaccionEmisor= async (idTransaccion) => {
    idTransaccionEmisor = await persistencia.consultarIDTransaccionEmisor(idTransaccion);
};
consultarIDTransaccionRed= async (idTransaccion) => {
    idTransaccionRed = await persistencia.consultarIDTransaccionRed(idTransaccion);
};
consultarIDTransaccionGateway= async (idTransaccion) => {
    idTransaccionGateWay = await persistencia.consultarIDTransaccionGateway(idTransaccion);
};
buscarNombreGateway = async (idTransaccion) => {
    let gateway = await persistencia.buscarNombreGateway(idTransaccion);
    return gateway;
};
exports.comunicacionChargeBack =  async (req) => {
    try{
        let respuesta = await comunicacionChargeBackEmisor(req);
        idTransaccionEmisor=respuesta;
    }catch(error){
        console.log(error.respuesta);
        throw new Error(error.respuesta);
    }
}
comunicacionChargeBackEmisor= async (req) => {
    idTransaccionEmisor = await persistencia.consultarIDTransaccionEmisor(req.body.idTransaccion);
    let respuesta = await peticiones.enviarChargeBackEmisor(idTransaccionEmisor);
    return respuesta;
};
*/
