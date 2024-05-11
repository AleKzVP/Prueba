import { response } from "express";
import db from "../../db/db";
import dotenv, { decrypt } from 'dotenv';
import { Codificar,Decodificar } from "./encriptacion";
import upload from "../../../uploads/upload";
dotenv.config();
export default function productController(app:any,dbProductos:db, dbUsuarios:db):void {

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

  app.post('/controller/registro', (req:any, res:any) => {
    dbUsuarios.load()
    let usuarioRegistrado = {...req.body}
    let secretKey = process.env.SECRET_KEY
    usuarioRegistrado.name = Codificar(secretKey,usuarioRegistrado.name)
    usuarioRegistrado.password = Codificar(secretKey,usuarioRegistrado.password)
    usuarioRegistrado.email = Codificar(secretKey,usuarioRegistrado.email)
    console.log(usuarioRegistrado)
    console.log(Decodificar(secretKey,usuarioRegistrado.name))
    dbUsuarios.data.push(usuarioRegistrado)
    res.json({
      estadoUsuario:"Usuario agregado"
    })
    dbUsuarios.save() 
  });

  app.post('/controller/uploadProducts', upload.single('image'), (req:any, res:any) => {
    dbProductos.load()
    if (!req.file) {
      return res.status(400).send('No se proporcionó ninguna imagen');
    }
    
    // La imagen se ha cargado correctamente, puedes acceder a ella con req.file
    const imagePath = req.file.path;
    console.log(req.body.propiedad)
    let producto={...req.body}
    producto.image=imagePath.replaceAll("\\","/")
    dbProductos.data.push(producto)
    dbProductos.save()    
    // Aquí puedes realizar otras acciones con la imagen, como guardar su ruta en una base de datos, etc.
    console.log(imagePath)
    res.send('Imagen cargada exitosamente');

  })

  app.post('/controller/login', (req:any, res:any) => {
    console.log("DATOS DEL LOGIN ",req.body)
    dbUsuarios.load()
    let secretKey = process.env.SECRET_KEY
    let usuarioLogin = {...req.body}
    let usuarioLoger = null
    for (let i = 0; i < dbUsuarios.data.length; i++) {
      const element = dbUsuarios.data[i];
      if (Decodificar(secretKey, element.email)===usuarioLogin.email  &&  Decodificar(secretKey, element.password)===usuarioLogin.password){
        if (usuarioLoger == null) {
          usuarioLoger = element         
        }
      }
    }
    if (usuarioLoger== null){
      res.json({
        estadoUsuario: "No logueado",
        status: false
      })
    }
    else {
      res.json({
        estadoUsuario: "Se ha logueado con éxito",
        status: true
      })
    }
  });
} 