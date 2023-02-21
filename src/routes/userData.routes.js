import {Router} from 'express'
const router = Router()

import * as authCtrl from '../controllers/userData.controller'


router.post('/userData', authCtrl.userData)

export default router;