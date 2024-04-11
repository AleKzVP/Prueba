import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.get('/hey', (req, res) => {
  res.send('¡Hola! Este es un servidor Express que sirve archivos estáticos.');
});

// Define la ruta de la carpeta estática
const staticFolder = path.resolve('./FrontEnd/public');

// Configura Express para servir archivos estáticos desde la carpeta definida
app.use(express.static(staticFolder));

// Manejador de ruta raíz
app.get('/', (req, res) => {
  res.send('¡Hola! Este es un servidor Express que sirve archivos estáticos.');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});