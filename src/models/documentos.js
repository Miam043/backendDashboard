import { Schema, model } from 'mongoose'
require('dotenv').config()
const { appSettings } = require('../settings')

const documentosSchema = new Schema({
    Titulo: {
        type: String,
        require: true,
    },
    Autor: {
        type: String,
        require: true,
    },
    ISBN: {
        type: String
    },
    Genero: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true,
        maxlength: 500
    },
    ISSN: {
        type: String
    },
    img: {
        type: String
    },
    fileUrl: {
        type: String,
        require: true
    },
    imgUrl: {
        data: Buffer,
        contentType: String
    },
}, {
    timestamps: true,
    versionKey: false
})

/*documentosSchema.methods.setImgUrl = function setImgUrl (filename) {
    const { host, port } = appSettings
    this.imgUrl = `${host}:${port}/public/${filename}`
}*/

documentosSchema.methods.setFileUrl = function setFileUrl(filename) {
    const { host, port } = appSettings
    this.fileUrl = `${host}:${port}/api/uploads/${filename}`
}

export default model('Documento', documentosSchema);