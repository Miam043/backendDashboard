const multer = require('multer')

//const FilesTypes = ["myFile/pdf", "myFile/epub"]


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.pdf`)
    },
    limits: {
        fieldSize: 20000000,
    },
});

//funcion de upload para subir imagenes
const uploadsFiles = multer({ storage })

module.exports = uploadsFiles