"use strict";
const express = require('express');
const multer = require('multer'); //IMPORTAR ESTA LIBRERÍA npm install --save multer
const path = require('path');
//crear app express
const app = express();
const port = 3000;
// Configurar multer para guardar las imágenes en una carpeta específica
const storage = multer.diskStorage({
    destination: function (a, b, cb) {
        cb(null, 'uploads/'); // CAMBIAR LA Ruta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        // Generar un nombre de archivo único para evitar colisiones
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: multer.diskStorage({
        destination: function (a, b, cb) {
            cb(null, 'uploads/'); // CAMBIAR LA Ruta donde se guardarán las imágenes
        },
        filename: function (a, file, cb) {
            // Generar un nombre de archivo único para evitar colisiones
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }) });
// Definir una ruta POST para recibir la imagen
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se proporcionó ninguna imagen');
    }
    // La imagen se ha cargado correctamente, puedes acceder a ella con req.file
    const imagePath = req.file.path;
    // Aquí puedes realizar otras acciones con la imagen, como guardar su ruta en una base de datos, etc.
    res.send('Imagen cargada exitosamente');
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
