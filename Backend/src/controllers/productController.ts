import { response } from "express";
import db from "../../db/db";

export default function productController(app:any,dbProductos:db):void {

    // Manejador de ruta raíz
//primer parámetro hace referencia a una url del navegador ('/test')
app.post('/controller/products', (req:any, res:any) => {
    dbProductos.load()
    let productos: Array<any>= [] = dbProductos.data
    let filtro = productos.filter((producto:any)=>{
        return producto.categoria==req.body.requiero
    })
    res.json(filtro)
  });
  app.post('/controller/addProduct', (req:any, res:any) => {
    dbProductos.load()
    dbProductos.data.push(req.body)
    dbProductos.save()
    res.json({
        response: "El proceso ha sido satisfactorio"
    })
  });
}

