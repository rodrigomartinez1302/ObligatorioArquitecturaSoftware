var controladorPeticiones= require("./controladorPeticiones");
var controladorPersistencia= require("./controladorDB");
var controladorAutenticacion = require("./controladorAutenticacion");
var idTransaccionGateway;
var nombreRed;
var idTransaccionRed;
var idTransaccionEmisor;

exports.comunicacionTransaccion= async (req) => {
    await controladorAutenticacion.validacionAutenticacion(req);
    try {
        let respuesta= await comunicacionTransaccionGateway(req);
        idTransaccionGateway = respuesta.idTransaccion;
        nombreRed = respuesta.nombreRed;
    } catch (error) {
        throw new Error(error.respuesta);
    }
    try {
        let respuesta = await comunicacionTransaccionRed(req);
        idTransaccionRed = respuesta;
    } catch(error) {
        await revertirTransaccionGateway(req.body.gateway, idTransaccionGateway);
        throw new Error(error.respuesta);
    }
    try {
        let respuesta = await comunicacionTransaccionEmisor(req);
        idTransaccionEmisor = respuesta;
    } catch (error) {
        await revertirTransaccionGateway(req.body.gateway
            , idTransaccionGateway);
            await revertirTransaccionRed(idTransaccionRed);
        throw new Error(error.respuesta);
    }
    try {
        idTransaccionTePagoYa = await guardarTransaccion(req);
    } catch(error) {
        await revertirTransaccionGateway(req, idTransaccionGateway);
        await revertirTransaccionRed(idTransaccionRed);
        await revertirTransaccionEmisor(idTransaccionEmisor);
        throw new Error(error.message);
    }
    return idTransaccionTePagoYa;
};   
exports.buscarURLGateway = async (nombreGate) => {
    let URL= await controladorPersistencia.buscarURLGateway(nombreGate);
    return URL;
}; 
comunicacionTransaccionGateway = async (req) => {
    let URL = await buscarURLGateway(req.body.gateway);
    let respuesta = await controladorPeticiones.enviarTransaccionGateway(req,URL);
    return respuesta;
};
revertirTransaccionGateway = async (nombreGate) => {
    let URL = await buscarURLGateway(nombreGate);
    let respuesta = await controladorPeticiones.revertirTransaccionGateway(idTransaccionGateway, URL);
    return respuesta;
};
buscarURLGateway = async (nombreGate) => {
    let URL = await controladorPersistencia.buscarURLGateway(nombreGate);
    return URL;
};
comunicacionTransaccionRed = async (req) => {
    const RECURSO = 'Transacciones';
    const VERBO = 'POST';
    let URL = await buscarURLRed(nombreRed, RECURSO, VERBO);
    let respuesta = await controladorPeticiones.enviarTransaccionRed(req, URL);
    return respuesta;
};
revertirTransaccionRed = async () => {
    const RECURSO = 'Transacciones';
    const VERBO = 'DELETE';
    let URL = await buscarURLRed(nombreRed, RECURSO, VERBO);
    let respuesta = await controladorPeticiones.revertirTransaccionRed(idTransaccionRed, URL);
    return respuesta;
};
buscarURLRed = async (nombreRed, recurso, verbo) => {
    let URL = await controladorPersistencia.buscarURLRed(nombreRed, recurso, verbo);
    return URL;
};
comunicacionTransaccionEmisor = async (req) => {
    let respuesta = await controladorPeticiones.enviarTransaccionEmisor(req);
    return respuesta;
}; 
revertirTransaccionEmisor = async () => {
    let respuesta = await controladorPeticiones.revertirTransaccionEmisor(idTransaccionEmisor);
    return respuesta;
};
guardarTransaccion = async (req) => {
    req.body.idTransaccionGate = idTransaccionGateway;
    req.body.idTransaccionRed = idTransaccionRed;
    req.body.idTransaccionEmisor = idTransaccionEmisor;
    let idTransaccion = await controladorPersistencia.guardarTransaccion(req);
    return idTransaccion;
}; 
revertirTransaccion = async (idTransaccionEliminarTePagoYa) => {
    let idTransaccion = await controladorPersistencia.eliminarTransaccion(idTransaccionEliminarTePagoYa);
    return idTransaccion;
}; 
exports.ComunicacionDevolucion = async (req) => {
    idTransaccionTePagoYa = req.body.idTransaccion;
    await comunicacionDevolucionTransaccionGateway();
    await comunicacionDevolucionTransaccionRed();
    await comunicacionDevolucionTransaccionEmisor();
    try {
        await controladorPersistencia.realizarDevolucionTransaccion(idTransaccionTePagoYa);
    } catch(error) {
        throw new Error(error.respuesta);
    }
    return idTransaccionTePagoYa;
 };
 comunicacionDevolucionTransaccionGateway = async () => {
    try { 
        await consultarIDTransaccionGateway();
    } catch (error){
        throw new Error(error.message);
    }
    try {
        await controladorPeticiones.enviarDevolucionTransaccionGateway(idTransaccionGateway);
    } catch (error){
        throw new Error(error.message);
    }   
 };
 comunicacionDevolucionTransaccionRed = async () => {
    try { 
        await consultarIDTransaccionRed();
    } catch (error){
        throw new Error(error.message);
    }
    try {
        await controladorPeticiones.enviarDevolucionTransaccionRed(idTransaccionRed);
    } catch (error){
        throw new Error(error.message); 
    }    
 };
comunicacionDevolucionTransaccionEmisor = async () => {
    try { 
        await consultarIDTransaccionEmisor();
    } catch (error){
        throw new Error(error.message);
    }
    try{
        await controladorPeticiones.enviarDevolucionTransaccionEmisor(idTransaccionEmisor);
    } catch (error) {
        throw new Error(error.message);
    }
};
 consultarIDTransaccionEmisor = async () => {
     idTransaccionEmisor = await controladorPersistencia.consultarIDTransaccionEmisor(idTransaccionTePagoYa); 
};
consultarIDTransaccionRed = async () => {
    idTransaccionRed = await controladorPersistencia.consultarIDTransaccionRed(idTransaccionTePagoYa);
};
consultarIDTransaccionGateway = async () => {
    idTransaccionGateway = await controladorPersistencia.consultarIDTransaccionGateway(idTransaccionTePagoYa);
};

exports.comunicacionChargeBack =  async (req) => {
    idTransaccionTePagoYa = req.body.idTransaccion;
    try { 
        await consultarIDTransaccionGateway();
    } catch (error){
        throw new Error(error.message);
    }
    try { 
        await consultarIDTransaccionRed();
    } catch (error){
        throw new Error(error.message);
    }
    try { 
        await consultarIDTransaccionEmisor();
    } catch (error){
        throw new Error(error.message);
    }
    try {
        await comunicacionChargeBackGateway();
    } catch(error){
        throw new Error(error.respuesta);
    }
    try {
        await comunicacionChargeBackRed();
    } catch(error){
        throw new Error(error.respuesta);
    }
    try {
        await comunicacionChargeBackComercio();
    } catch(error){
        throw new Error(error.respuesta);
    }
    try {
        await controladorPersistencia.realizarChargeBack(idTransaccionTePagoYa);
    } catch(error) {
        throw new Error(error.respuesta);
    }
    
    return idTransaccionEmisor;
}
comunicacionChargeBackGateway= async (req) => {
    await controladorPeticiones.enviarChargeBackGateway(idTransaccionGateway);
};
comunicacionChargeBackRed= async (req) => {
    await controladorPeticiones.enviarChargeBackRed(idTransaccionRed);
};
comunicacionChargeBackComercio= async (req) => {
    await controladorPeticiones.comunicacionChargeBackComercio(idTransaccionTePagoYa);
};
exports.comunicacionCierreLotes= async (req) => {
    let URL = await buscarURLGateway(req.query.gateway);
    let respuesta = await controladorPeticiones.comunicacionCierreLotes(req, 
        'http://localhost:10000/Transacciones/CierreLotes' );
        return respuesta;
};
/*
exports.loginAutenticacion = async () => {
    try {
        let respuesta = await controladorPeticiones.loginAutenticacion();
        configAutenticacion.TOKEN = respuesta.data.token;
        if(!respuesta.data.auth) {
            throw new Error('Usuario no autenticado')
        } else {
            console.log('Autenticación exitosa');
        }
    }
    catch(error) {
        console.log(error.message);
    } 
};

validacionAutenticacion = async (req) => {
    let respuesta = await controladorPeticiones.validacionAutenticacion(req);
    if (!respuesta.auth) {
        throw new Error(respuesta.message);
    }
}



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
        idTransaccionGateway=respuesta;
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
    await consultaridTransaccionGateway(idTransaccionTePagoYa);
    let nombreGate = await buscarNombreGateway(idTransaccionTePagoYa);
    let respuesta = await revertirTransaccionGateway(nombreGate);
    return respuesta;
};
consultarIDTransaccionEmisor= async (idTransaccion) => {
    idTransaccionEmisor = await controladorPersistencia.consultarIDTransaccionEmisor(idTransaccion);
};
consultarIDTransaccionRed= async (idTransaccion) => {
    idTransaccionRed = await controladorPersistencia.consultarIDTransaccionRed(idTransaccion);
};
consultaridTransaccionGateway= async (idTransaccion) => {
    idTransaccionGateway = await controladorPersistencia.consultaridTransaccionGateway(idTransaccion);
};
buscarNombreGateway = async (idTransaccion) => {
    let gateway = await controladorPersistencia.buscarNombreGateway(idTransaccion);
    return gateway;
};
exports.comunicacionChargeBack =  async (req) => {
    try {
        let respuesta = await comunicacionChargeBackEmisor(req);
        idTransaccionEmisor=respuesta;
    } catch(error){
        console.log(error.respuesta);
        throw new Error(error.respuesta);
    }
}
comunicacionChargeBackEmisor= async (req) => {
    idTransaccionEmisor = await controladorPersistencia.consultarIDTransaccionEmisor(req.body.idTransaccion);
    let respuesta = await controladorPeticiones.enviarChargeBackEmisor(idTransaccionEmisor);
    return respuesta;
};
*/