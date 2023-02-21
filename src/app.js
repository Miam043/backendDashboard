import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import bodyParser from 'body-parser'


//import { createRoles } from './libs/initialSetup'

import documentosRoutes from './routes/documentos.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/user.routes'
import userDataRoutes from './routes/userData.routes'

const app = express()
const cors = require("cors");
app.use(cors());

//createRoles();
app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) =>{
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static('./storage/imgs'))
app.use('/api/uploads', express.static('./public/uploads'))
//app.use('/public/documents', express.static(join(CURRENT_DIR, './public/uploads')))
app.use('/api/documentos', documentosRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/data', userDataRoutes)

export default app;