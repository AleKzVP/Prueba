"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const encriptacion_1 = require("./encriptacion");
dotenv_1.default.config();
function productController(app, dbProductos, dbUsuarios) {
    // Manejador de ruta raíz
    //primer parámetro hace referencia a una url del navegador ('/test')
    app.post('/controller/products', (req, res) => {
        dbProductos.load();
        let productos = [] = dbProductos.data;
        let filtro = productos.filter((producto) => {
            return producto.categoria == req.body.requiero;
        });
        res.json(filtro);
    });
    app.post('/controller/addProduct', (req, res) => {
        dbProductos.load();
        dbProductos.data.push(req.body);
        dbProductos.save();
        res.json({
            response: "El proceso ha sido satisfactorio"
        });
    });
    app.post('/controller/registro', (req, res) => {
        dbUsuarios.load();
        let usuarioRegistrado = Object.assign({}, req.body);
        let secretKey = process.env.SECRET_KEY;
        usuarioRegistrado.name = (0, encriptacion_1.Codificar)(secretKey, usuarioRegistrado.name);
        usuarioRegistrado.password = (0, encriptacion_1.Codificar)(secretKey, usuarioRegistrado.password);
        usuarioRegistrado.email = (0, encriptacion_1.Codificar)(secretKey, usuarioRegistrado.email);
        console.log(usuarioRegistrado);
        console.log((0, encriptacion_1.Decodificar)(secretKey, usuarioRegistrado.name));
        dbUsuarios.data.push(usuarioRegistrado);
        res.json({
            estadoUsuario: "Usuario agregado"
        });
        dbUsuarios.save();
    });
    app.post('/controller/login', (req, res) => {
        console.log("DATOS DEL LOGIN ", req.body);
        dbUsuarios.load();
        let secretKey = process.env.SECRET_KEY;
        let usuarioLogin = Object.assign({}, req.body);
        let usuarioLoger = null;
        for (let i = 0; i < dbUsuarios.data.length; i++) {
            const element = dbUsuarios.data[i];
            if ((0, encriptacion_1.Decodificar)(secretKey, element.email) === usuarioLogin.email && (0, encriptacion_1.Decodificar)(secretKey, element.password) === usuarioLogin.password) {
                if (usuarioLoger == null) {
                    usuarioLoger = element;
                }
            }
        }
        if (usuarioLoger == null) {
            res.json({
                estadoUsuario: "No logueado",
                status: false
            });
        }
        else {
            res.json({
                estadoUsuario: "Se ha logueado con éxito",
                status: true
            });
        }
    });
}
exports.default = productController;
