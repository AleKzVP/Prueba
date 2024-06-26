import dotenv, { decrypt } from 'dotenv';
import { Codificar,Decodificar } from "./encriptacion.js";
import upload from "../../../uploads/upload.js";
dotenv.config();
export default function productController(app,dbProductos, dbUsuarios) {

    // Manejador de ruta raíz
//primer parámetro hace referencia a una url del navegador ('/test')

app.post('/controller/editProducts', (req, res) => {
  dbProductos.load()
  let productos = dbProductos.data
   for (let i = 0; i < productos.length; i++) {

    if (productos[i].ID==req.body.ID) {
      productos[i]={...productos[i],...req.body}
      break
    }
    
   }
  dbProductos.data=productos
  dbProductos.save() 
  res.json({status:true})
  
})

app.post('/controller/deleteProducts', (req, res) => {
  dbProductos.load()
  let productos = dbProductos.data
  productos = productos.filter((producto)=>{
    if (producto.ID) {
      return String(producto.ID)!==String (req.body.ID)
    }
  })
  dbProductos.data=productos
  dbProductos.save() 
  
})
app.post('/controller/products', (req, res) => {
    dbProductos.load()
    let productos = dbProductos.data
    let filtro;
    if (req.body.genero!=undefined) {  
      filtro = productos.filter((producto)=>{
        if (producto.genero) {
          return producto.genero.toLowerCase()==req.body.genero.toLowerCase()
        }
      })
      res.json(filtro); return;
    }
    if (req.body.requiero!=undefined) {
      filtro = productos.filter((producto)=>{return producto.categoría==req.body.requiero})
      res.json(filtro); return;
    }
    filtro = productos;
    res.json(filtro)
  });

  app.post('/controller/registro', (req, res) => {
console.log("testeando request", req.body)
    try {
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
    estadoUsuario:"Usuario agregado",
    status: true
  })
  dbUsuarios.save() 
} catch (error) {
  res.json({
    estadoUsuario:"Usuario no agregado",
    status: false
  })
}
  });

  app.post('/controller/uploadProducts', upload.single('image'), (req, res) => {
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

  app.post('/controller/login', (req, res) => {
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
      const admin = usuarioLoger.Admin?true:false
      res.json({
        estadoUsuario: "Se ha logueado con éxito",
        status: true,
        admin,
        data: {name: Decodificar(secretKey, usuarioLoger.name), email: Decodificar(secretKey, usuarioLoger.email)}
      })
    }
  });
} 
