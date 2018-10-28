const persistencia= require("../Persistencia/mongoDBConeccion");
const peticiones= require("../Servicios/peticionesManejador");

module.exports  =  function(app,db) {
  app.post('/Compras',async(req,res)=>{
    var error=await persistencia.guardarCompra(req.body);
    
    await peticiones.enviarCompraTePagoYa(req,res);
    res.status(200).send(res.body);
    }); 
    /*
    async(error) => {
      if(error){
        res.status(400).send('Error al realizar la petición');
      }else{
        console.log('Entre al else')
        await peticiones.enviarCompraGateWay(req.body);
        res.status(201).send(res.op);
      }  
    });
    */
  app.delete("/Compras/:id", async (req, res) => {
      persistencia.eliminarCompra(req,(error)=>{
        if(error){
          res.status(400).send({error});
        }
      });
      res.status(201);
    });
  }

 
    /*
    db.collection('Tarjetas').insert(tarjeta,(err,resultado)=>{
       if(err){
        res.send({'Error':'An error has ocurred'});
      }else{
        res.send(resultado.op);
      }
      
  });
});

};
   
  
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