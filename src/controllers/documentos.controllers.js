import { Document } from 'mongoose';
import Documento from '../models/documentos'
//const fs = require('fs');

export const CreateDocumento = async (req, res) => {

    const { Titulo, Autor, ISBN, Genero, descripcion, ISSN, img } = req.body

    const newDocumento = new Documento({ Titulo, Autor, ISBN, Genero, descripcion, ISSN, img });

    // 1KB = 1000 bytes
    // 1MB = 1,000,000 bytes 
    // 1 Byte = 8 bits

   /* if (req.file.imgUrl) {
        if (req.file.imgUrl.size > 1000000) {
            return res.status(400).json({
                error: "La imagen debe tener menos de 1 MB de tamaño"
            })
        }
        Documento.imgUrl.data = fs.readFileSync(req.file.imgUrl.path);
        Documento.imgUrl.contentType = req.file.imgUrl.type;
    }*/

    /*if (req.file) {
        const { filename } = req.file
        newDocumento.setImgUrl(filename)    
    }*/

    if (req.file) {
        const { filename } = req.file
        newDocumento.setFileUrl(filename)
    }

    const documentoSaved = await newDocumento.save()

    res.status(201).json(documentoSaved)
}

export const getDocumento = async (req, res) => {
    const documentos = await Documento.find()
    .select("-imgUrl");
    res.json(documentos)

}

export const getDocumentoById = async (req, res) => {
    const documentos = await Documento.findById(req.params.documentosId);
    res.status(200).json(documentos)
}

export const updateDocumentoById = async (req, res) => {
    const updatedDocumentos = await Documento.findByIdAndUpdate(req.params.documentosId, req.body, {
        new: true
    })
    res.status(200).json(updatedDocumentos)
}

export const deleteDocumentoById = async (req, res) => {
    const { documentosId } = req.params;
    await Documento.findByIdAndDelete(documentosId)
    res.status(204).json()
};

export const searchDocumentoById = async (req, res) => {
    const key = await Documento.find(
        {
            "$or": [
                { Titulo: { $regex: req.params.key } },
                { Autor: { $regex: req.params.key } },
                { descripcion: { $regex: req.params.key } },
                { ISBN: { $regex: req.params.key } },
                { ISSN: { $regex: req.params.key } }
            ]
        }
    )
    res.send(key);
};