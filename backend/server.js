require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

var cors = require('cors');


mongoose.connect(process.env.DATABASE_URL_ELEVES) //, { useNewUrlParser: true } 
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use(cors());

app.use(express.json())

const saisonsRouter = require('./routes/saisons.js')
app.use('/saisons', saisonsRouter)

const elevesRouter = require('./routes/eleves.js')
app.use('/eleves', elevesRouter)

app.listen(3001, () => console.log('Server Started')) //3000
