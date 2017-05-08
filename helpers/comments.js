const models = require('../models')
const async = require('async')

module.exports = {
  newest: (cb) => {
    models.Comment.find({}, {}, { limit: 5, sort: {'timestamp': -1}})
    .then((comments) => {
      // console.log('comments', comments)

      let attachImage = (comment, next) => {
        // console.log('comment in attachImage', comment)
        // console.log(comment.image_id)
        models.Image.findOne({ _id: comment.image_id})
        .then((image) => {
          console.log('image', image)
          comment.image = image
          next()
        })
      }

      async.each(comments, attachImage, (err) => {
        if (err) throw err
        cb(err, comments)
      })

    })
  }
}
