var peticiones= require("../Servicios/controladorPeticiones");
var persistencia= require("../Persistencia/controladorDB");
var configAutenticacion= require("../Config/autenticacion");
var idTransaccionGateway;
var idTransaccionRed;
var idTransaccionEmisor;

exports.comunicacionTransaccion= async (req) => {
    await validacionAutenticacion(req);
    try {
        let respuesta = await comunicacionTransaccionGateway(req);
        idTransaccionGateway = respuesta.idTransaccion;
    } catch (error) {
        throw new Error(error.respuesta);
    }
    try {
        let respuesta = await comunicacionTransaccionRed(req);
        idTransaccionRed = respuesta;
    } catch(error) {
        let idborradoGate = await revertirTransaccionGateway(req.body.gateway,idTransaccionGateway);
        throw new Error(error.respuesta);
    }
    try {
        let respuesta = await comunicacionTransaccionEmisor(req);
        idTransaccionEmisor = respuesta;
    } catch (error) {
        let idborradoGate = await revertirTransaccionGateway(req.body.gateway,idTransaccionGateway);
        let idborradoRed = await revertirTransaccionRed(idTransaccionRed);
        throw new Error(error.respuesta);
    }
    try {
        //throw new Error('Probando el roll back');
        idTransaccionTePagoYa = await guardarTransaccion(req);
    } catch(error) {
        let idborradoGate = await revertirTransaccionGateway(req,idTransaccionGateway);
        let idborradoRed = await revertirTransaccionRed(idTransaccionRed);
        let idborradoEmisor = await revertirTransaccionEmisor(idTransaccionEmisor);
        throw new Error(error.respuesta.data);
    }
    return idTransaccionTePagoYa;
};   
exports.buscarURLGateway = async (nombreGate) => {
    let URL= await persistencia.buscarURLGateway(nombreGate);
    return URL;
}; 
comunicacionTransaccionGateway = async (req) => {
    let URL = await buscarURLGateway(req.body.gateway);
    let respuesta = await peticiones.enviarTransaccionGateway(req,URL);
    return respuesta;
};
revertirTransaccionGateway = async (nombreGate) => {
    let URL = await buscarURLGateway(nombreGate);
    let respuesta = await peticiones.revertirTransaccionGateway(idTransaccionGateway,URL);
    return respuesta;
};
buscarURLGateway = async (nombreGate) => {
    let URL = await persistencia.buscarURLGateway(nombreGate);
    return URL;
};
comunicacionTransaccionRed = async (req) => {
    let respuesta = await peticiones.enviarTransaccionRed(req);
    return respuesta;
};
revertirTransaccionRed = async (idTransaccionEliminar) => {
    let respuesta = await peticiones.revertirTransaccionRed(idTransaccionEliminar);
    return respuesta;
};
comunicacionTransaccionEmisor = async (req) => {
    let respuesta = await peticiones.enviarTransaccionEmisor(req);
    return respuesta;
}; 
revertirTransaccionEmisor = async (idTransaccionEliminar) => {
    let respuesta = await peticiones.revertirTransaccionEmisor(idTransaccionEliminar);
    return respuesta;
};
guardarTransaccion = async (req) => {
    req.body.idTransaccionGate = idTransaccionGateway;
    req.body.idTransaccionRed = idTransaccionRed;
    req.body.idTransaccionEmisor = idTransaccionEmisor;
    let idTransaccion = await persistencia.guardarTransaccion(req);
    return idTransaccion;
}; 
revertirTransaccion = async (idTransaccionEliminarTePagoYa) => {
    let idTransaccion = await persistencia.eliminarTransaccion(idTransaccionEliminarTePagoYa);
    return idTransaccion;
}; 
exports.ComunicacionDevolucion = async (req) => {
    idTransaccionTePagoYa=req.body.idTransaccion;
    await comunicacionDevolucionTransaccionGateway();
    await comunicacionDevolucionTransaccionRed();
    await comunicacionDevolucionTransaccionEmisor();
    try {
        await persistencia.realizarDevolucionTransaccion(idTransaccionTePagoYa);
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
        await peticiones.enviarDevolucionTransaccionGateway(idTransaccionGateway);
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
        await peticiones.enviarDevolucionTransaccionRed(idTransaccionRed);
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
        await peticiones.enviarDevolucionTransaccionEmisor(idTransaccionEmisor);
    } catch (error) {
        throw new Error(error.message);
    }
};
 consultarIDTransaccionEmisor = async () => {
     idTransaccionEmisor = await persistencia.consultarIDTransaccionEmisor(idTransaccionTePagoYa); 
};
consultarIDTransaccionRed = async () => {
    idTransaccionRed = await persistencia.consultarIDTransaccionRed(idTransaccionTePagoYa);
};
consultarIDTransaccionGateway = async () => {
    idTransaccionGateway = await persistencia.consultarIDTransaccionGateway(idTransaccionTePagoYa);
};

exports.comunicacionChargeBack =  async (req) => {
    idTransaccionTePagoYa=req.body.idTransaccion;
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
        await persistencia.realizarChargeBack(idTransaccionTePagoYa);
    } catch(error) {
        throw new Error(error.respuesta);
    }
    
    return idTransaccionEmisor;
}
comunicacionChargeBackGateway= async (req) => {
    await peticiones.enviarChargeBackGateway(idTransaccionGateway);
};
comunicacionChargeBackRed= async (req) => {
    await peticiones.enviarChargeBackRed(idTransaccionRed);
};
comunicacionChargeBackComercio= async (req) => {
    await peticiones.comunicacionChargeBackComercio(idTransaccionTePagoYa);
};
exports.loginAutenticacion = async () => {
    try {
        let respuesta = await peticiones.loginAutenticacion();
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
    let respuesta = await peticiones.validacionAutenticacion(req);
    if (!respuesta.auth) {
        throw new Error(respuesta.message);
    }
}

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
    idTransaccionEmisor = await persistencia.consultarIDTransaccionEmisor(idTransaccion);
};
consultarIDTransaccionRed= async (idTransaccion) => {
    idTransaccionRed = await persistencia.consultarIDTransaccionRed(idTransaccion);
};
consultaridTransaccionGateway= async (idTransaccion) => {
    idTransaccionGateway = await persistencia.consultaridTransaccionGateway(idTransaccion);
};
buscarNombreGateway = async (idTransaccion) => {
    let gateway = await persistencia.buscarNombreGateway(idTransaccion);
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
    idTransaccionEmisor = await persistencia.consultarIDTransaccionEmisor(req.body.idTransaccion);
    let respuesta = await peticiones.enviarChargeBackEmisor(idTransaccionEmisor);
    return respuesta;
};
*/