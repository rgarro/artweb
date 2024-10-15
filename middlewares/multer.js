const multer = require('multer');

function uploadFile() {
		//TODO: se puede subir a OTRO sitio? (usercontent?)
    //TODO: sanitizar file name seguridad expresiones regulares -- 
    //TODO: cliente-limpio/imagenes/nombreimagen.jpg
    //TODO: limitar tamaño de imagenes con multer o express -- HECHO --
    //TODO: generar y validar captcha o passw para cliente

/*     const filenameValidationRegex = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$|([<>:"\/\\|?*])|(\.|\s)$/gi
    if (!imagen.filename.match(filenameValidationRegex)) {
    // throw new Error("Filename not valid")
    } */ 

    const storage = multer.diskStorage({

        destination: './public/files/',
        filename: function (req, file, cb) {
            const name = Date.now() + file.originalname;
               

            cb(null, name)
        }

    })

    const extensiones = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp'
    ]

    const upload = multer({
        storage: storage,


        fileFilter: (req, file, cb) => {
            
            if (!extensiones.includes(file.mimetype)) {
                return cb(new Error('file is not allowed'))
            }

            cb(null, true)
        },

        limits: { fileSize: 25000000 }

    }).array('imagenes');

    return upload

}


module.exports = uploadFile


