import multer from "multer"
import path from 'path';

const upload = multer({ storage: multer.diskStorage({
    destination: function (a, b, cb) {
      cb(null, 'uploads/') // CAMBIAR LA Ruta donde se guardarán las imágenes
    },
    filename: function (a, file, cb) {
      // Generar un nombre de archivo único para evitar colisiones
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  }) });

  export default upload