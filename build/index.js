"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const test_1 = __importStar(require("./test"));
const productController_1 = __importDefault(require("./Backend/src/controllers/productController"));
const db_1 = __importDefault(require("./Backend/db/db"));
const multer_1 = __importDefault(require("multer"));
let dbProductos = new db_1.default("./Backend/db/productos.json");
let dbUsuarios = new db_1.default("./Backend/db/usuarios.json");
(0, test_1.default)();
console.log("inicializando aplicacion");
console.log(test_1.avion, "   ", test_1.buque);
const app = (0, express_1.default)();
const PORT = 3000;
// Define la ruta de la carpeta estática ////ruta relativa
const staticFolder = path_1.default.resolve('./FrontEnd/public');
//UPLOAD
const upload = (0, multer_1.default)({ storage: multer_1.default.diskStorage({
        destination: function (a, b, cb) {
            cb(null, 'uploads/'); // CAMBIAR LA Ruta donde se guardarán las imágenes
        },
        filename: function (a, file, cb) {
            // Generar un nombre de archivo único para evitar colisiones
            cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
        }
    }) });
// Configura Express para servir archivos estáticos desde la carpeta definida
app.use(express_1.default.static(staticFolder));
app.use(express_1.default.json()); // app.use(express.static('build'));
(0, productController_1.default)(app, dbProductos, dbUsuarios);
// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});
