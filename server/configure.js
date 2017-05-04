const path = require('path')
const routes = require('./routes')
const exphbs = require('express-handlebars')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const errorHandler = require('errorhandler')
const moment = require('moment')
const multer = require('multer')


module.exports = (app) => {
app.use(morgan('dev'))
  // app.use(bodyParser({
  //   uploadDir:path.join(__dirname, 'public/upload/temp')
  // }))
  app.use(multer({
    dest: path.join(__dirname, '../public/upload/temp')
  }).any())
  app.use(methodOverride())
  app.use(cookieParser())
  app.use('/public/', express.static(path.join(__dirname, '../public')))

if ('development' === app.get('env')) {
  app.use(errorHandler())
}
  routes(app)

  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get(`views`) + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    helpers: {
      timeago: (timestamp) => {
        return moment(timestamp).startOf('minute').fromNow()
      }
    }
  }).engine)
  app.set('view engine', 'handlebars')
  return app
}
