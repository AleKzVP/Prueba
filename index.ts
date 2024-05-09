import express from 'express';
import path from 'path';
import miImportacion,{avion,buque} from "./test" 
import productController from './Backend/src/controllers/productController';
import db from "./Backend/db/db"
let dbProductos = new db("./Backend/db/productos.json")
let dbUsuarios = new db("./Backend/db/usuarios.json")

miImportacion()
console.log("inicializando aplicacion");
console.log(avion,"   ",buque);


const app = express();
const PORT = 3000;


// Define la ruta de la carpeta estática ////ruta relativa
const staticFolder = path.resolve('./FrontEnd/public');
const uploadFolder = path.resolve('./uploads');
//UPLOAD

// Configura Express para servir archivos estáticos desde la carpeta definida
app.use(express.static(staticFolder));
app.use("/uploads",express.static(uploadFolder));

app.use(express.json()); // app.use(express.static('build'));
productController(app,dbProductos,dbUsuarios)



// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});

