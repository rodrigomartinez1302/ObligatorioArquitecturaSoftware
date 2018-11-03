var persistencia= require("../Persistencia/mongoDBConeccion");
var axios = require('axios');
var https = require('https');
const peticiones= require("../Servicios/peticionesManejador");

module.exports  = function(app,db) {
  app.post('/Compras',async(req,res)=>{
    try{
    var compraGuardada=await persistencia.guardarCompra(req.body);
    }catch(error){
      res.status(400).send('No se pudo guardar la compra');
    }
    try{
      var respuestaGateway=await peticiones.enviarCompraGateway(compraGuardada);
      var respuestaRed=await peticiones.enviarCompraRed(compraGuardada);
      console.log('status gate '+respuestaGateway.status);
      console.log('status red '+respuestaRed.status);

      if(respuestaGateway.status != 200 || respuestaRed.status != 200){
      await persistencia.eliminarCompra(compraGuardada);
      res.status(400).send('No se pudo enviar la petición');
      }else{
        res.status(respuestaGateway.status).send(compraGuardada);
      }
}
    catch(error){
      console.log('Entre al catch');
      await persistencia.eliminarCompra(compraGuardada);
      res.status('400').send('No se pudo enviar la petición');
    }
  });
  app.delete("/Compras/:id", (req, res) => {
    var id = req.
    res.status(200).send('Compra borrada ${id}');
  });  
};


  


    /*

   
  
      var nuevaCompra=compra.crearCompra(
      tarjeta.crearTarjeta(1111,'12/10/2018','nombreTitular',1234),
      direccionEnvio.crearDireccionEnvio('Calle',1234,'Ciudad','Pais',1234),
      123,'12/12/2018',
      producto.crearProducto('NombreProducto','Categoria'),1)

      
      const nuevoMonto= req.
      console.log(nuevoMonto);
      var tarjetaRecibida=crearTarjeta();

      const  = req.params;

      res.send('Hello');
  });
}



let compra = require("../Modelo/Compra");
let tarjeta = require("../Modelo/Tarjeta");
let producto = require("../Modelo/Producto");
let direccionEnvio = require("../Modelo/DireccionEnvio");


let faker = require("faker");
let compra = require("../Model/Compra.js");


const appRouter = app =>{
  app.put("/compra", (req, res) => {
    //const {  } = req.params;
    let compra = new Compra(
        tarjeta = new Tarjeta(req.tarjeta.numero,req.tarjeta.vencimiento)
        direccionEnvio=,
        direccionFacturacion=faker.address.streetName(),
        monto=faker.impo;
        fechaTransaccion=fechaTransaccion;
        producto=producto;
    );
    newPeople.address = new address(
      faker.address.streetName(),
      faker.address.zipCode()
    );

    res.status(200).send(newPeople);
  });

  app.get("/people/:id", (req, res) => {
    const { id } = req.params;
    let newPeople = new people(
      faker.name.firstName(),
      faker.phone.phoneNumber()
    );
    res.status(200).send(newPeople);
  });

  app.post("/people", (req, res) => {
    let newPeople = new people(
      faker.name.firstName(),
      faker.phone.phoneNumber()
    );
    newPeople.address.push(
      new address(faker.address.streetName(), faker.address.zipCode())
    );
    res.status(200).send(JSON.stringify(newPeople));
  });

  app.post("/people/:id/address", (req, res) => {
    let newPeople = new people(
      faker.name.firstName(),
      faker.phone.phoneNumber()
    );
    newPeople.address = new address(
      faker.address.streetName(),
      faker.address.zipCode()
    );

    res.status(200).send(newPeople);
  });

  app.put("/people/:id", (req, res) => {
    const { id } = req.params;
    let updatedPeople = new people(
      faker.name.firstName(),
      faker.phone.phoneNumber()
    );
    res.status(200).send(updatedPeople);
  });

  app.delete("/people/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).send(`Borramos la persona ${id}`);
  });
};

module.exports = appRouter;
*/