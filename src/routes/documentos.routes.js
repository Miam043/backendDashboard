import { Router } from "express"
const router = Router()
const uploadsFiles = require('../controllers/uploadBooks.controller')
//const upload = require('../controllers/upload.controller')
//import *as controller from '../controllers/upload.controller'

import *as documentosCtrl from '../controllers/documentos.controllers';
//import {authjwt} from '../middlewares';

router.post("/", /*[authjwt.verifyToken, (authjwt.isTeacher || authjwt.isStudent)], upload.single('image'),*/ uploadsFiles.single('myFile'), documentosCtrl.CreateDocumento);

router.get("/", documentosCtrl.getDocumento);

router.get("/:documentosId", documentosCtrl.getDocumentoById);

router.get("/:key", documentosCtrl.searchDocumentoById);

router.put("/:documentosId", /*[authjwt.verifyToken, (authjwt.isTeacher || authjwt.isStudent)],*/ documentosCtrl.updateDocumentoById);

router.delete("/:documentosId", /*[authjwt.verifyToken, (authjwt.isStudent || authjwt.isTeacher)],*/ documentosCtrl.deleteDocumentoById);


export default router;
