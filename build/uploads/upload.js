"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const upload = (0, multer_1.default)({ storage: multer_1.default.diskStorage({
        destination: function (a, b, cb) {
            cb(null, 'uploads/'); // CAMBIAR LA Ruta donde se guardarán las imágenes
        },
        filename: function (a, file, cb) {
            // Generar un nombre de archivo único para evitar colisiones
            cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
        }
    }) });
exports.default = upload;
