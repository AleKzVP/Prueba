"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function productController(app, dbProductos) {
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
}
exports.default = productController;
