const express = require('express')
const config = require('./server/configure')
const mongoose = require('mongoose')

let app = express()
const PORT = process.env.PORT || 3000

app.set('port', PORT)
app.set('views', `${__dirname}/views`)
app = config(app)

mongoose.connect('mongodb://localhost/mongoUploader')
mongoose.connection.on('open', () => {
  console.log('Mongoose connected...')
})

app.listen(app.get('port'), () => {
  console.log(`server listening on port ${app.get('port')}`)
})
