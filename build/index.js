"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
// Define la ruta de la carpeta estática
const staticFolder = path_1.default.resolve('./FrontEnd/public');
// Configura Express para servir archivos estáticos desde la carpeta definida
app.use(express_1.default.static(staticFolder));
// Manejador de ruta raíz
app.get('/', (req, res) => {
    res.send('¡Hola! Este es un servidor Express que sirve archivos estáticos.');
});
// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
