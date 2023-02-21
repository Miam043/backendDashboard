import mongoose, { connect } from "mongoose";
require('dotenv').config()
const {dbSettings} = require('./settings')

const uri = dbSettings.host
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: true,
    //useCreateIndex: true

  })
    .then(db => console.log('Database is connected'))
    .catch(error => console.log(error))