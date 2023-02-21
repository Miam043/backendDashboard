import app from './app'
import './database'
require('dotenv').config()
const {appSettings} = require('./settings')

app.listen(appSettings.port, () => console.log(`Server listen on ${appSettings.port}`))