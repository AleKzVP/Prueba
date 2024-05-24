import fs from 'fs';
import https from 'https';
import http from 'http';
import cors from 'cors'; // Importar el paquete cors
import express from 'express';
import path from 'path';
import productController from './Backend/src/controllers/productController.js';
import db from "./Backend/db/db.js"
const Origins = process.env.ORIGINS || '*';
let dbProductos = new db("./Backend/db/productos.json")
let dbUsuarios = new db("./Backend/db/usuarios.json")
const app = express();

// Define la ruta de la carpeta estática ////ruta relativa
const staticFolder = path.resolve('./FrontEnd/public');
const uploadFolder = path.resolve('./uploads');
//UPLOAD

// Configura Express para servir archivos estáticos desde la carpeta definida
app.use(express.static(staticFolder));
app.use("/uploads",express.static(uploadFolder));

app.use(express.json()); // app.use(express.static('build'));
productController(app,dbProductos,dbUsuarios)

const PORT = 3080;
const PORTssl = 3443;
const privateKey = fs.readFileSync('./cert/private.key', 'utf8');
const certificate = fs.readFileSync('./cert/certificate.crt', 'utf8');
const certificateCA = fs.readFileSync('./cert/ca_bundle.crt', 'utf8');
const serverHTTPS = https.createServer({ key: privateKey, cert: certificate, ca: certificateCA}, app);
const serverHTTP = http.createServer(app);
serverHTTPS.listen(PORTssl, () => {console.log(`Servidor HTTPS https://localhost:${PORTssl}`);});
serverHTTP.listen(PORT, () => {console.log(`Servidor HTTP http://localhost:${PORT}`);});
