const express = require('express')
const config = require('./server/configure')

var app = express()
const PORT = process.env.PORT || 3000

app.set('port', PORT)
app.set('views', `${__dirname}/views`)
app = config(app)

app.get('/', (req, res) => {
  res.send("Yo Son....I'm back...!")
})
app.listen(app.get('port'), () => {
  console.log(`server listening on port ${app.get('port')}`)
})
