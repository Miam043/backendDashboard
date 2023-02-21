import { Router } from 'express'
const router = Router()

import *as userCtrl from '../controllers/user.controller'
import {authjwt, verifySignup} from '../middlewares'
const upload = require ('../controllers/upload.controller')

router.get('/',[
    /*authjwt.verifyToken, 
    authjwt.isAdmin*/
    verifySignup.checkRolesExisted
], userCtrl.getUsers)

router.get('/:userId',[
    /*authjwt.verifyToken, 
    authjwt.isAdmin,*/
    verifySignup.checkRolesExisted
], userCtrl.getUsersById)



router.post('/',[
    verifySignup.checkRolesExisted
], userCtrl.createUser)

router.put('/:userId',[
    /*authjwt.verifyToken, 
    authjwt.isAdmin,*/
    verifySignup.checkRolesExisted
], userCtrl.updateUsersById)

router.delete('/:userId',[
    /*authjwt.verifyToken, 
    authjwt.isAdmin,*/
    verifySignup.checkRolesExisted
], userCtrl.deleteUsersById)



export default router;