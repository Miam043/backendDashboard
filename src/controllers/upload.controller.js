const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./storage/imgs`)
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
})

//funcion de upload para subir imagenes
const upload = multer({ storage })

module.exports = upload
