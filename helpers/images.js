const models = require('../models')

module.exports = {
  popular: (cb) => {
    models.Image.find({}, {}, { limit: 9, sort: { likes: -1 }})
    .then((images) => {
      cb(null, images)
    })
  }
}
