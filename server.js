const express = require('express')
// const config = require('./server/configure')

const app = express()
const PORT = process.env.PORT || 3000

app.set('port', PORT)
app.set('views', `${__dirname}/views`)
// app = config(app)

app.get('/', (req, res) => {
  res.semd("Yo Son....I'm back...!")
})
app.listen(app.get('port'), () => {
  console.log(`server listening on port ${app.get('port')}`)
})
