import express from 'express';
import path from 'path';
import miImportacion,{avion,buque} from "./test" 
import productController from './Backend/src/controllers/productController';
import db from "./Backend/db/db"
import multer from "multer"
let dbProductos = new db("./Backend/db/productos.json")

miImportacion()
console.log("inicializando aplicacion");
console.log(avion,"   ",buque);


const app = express();
const PORT = 3000;


// Define la ruta de la carpeta estática ////ruta relativa
const staticFolder = path.resolve('./FrontEnd/public');
//UPLOAD
const upload = multer({ storage: multer.diskStorage({
  destination: function (a:any, b:any, cb:any) {
    cb(null, 'uploads/') // CAMBIAR LA Ruta donde se guardarán las imágenes
  },
  filename: function (a:any, file:any, cb:any) {
    // Generar un nombre de archivo único para evitar colisiones
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
}) });
// Configura Express para servir archivos estáticos desde la carpeta definida
app.use(express.static(staticFolder));
app.use(express.json()); // app.use(express.static('build'));
productController(app,dbProductos)



// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});

