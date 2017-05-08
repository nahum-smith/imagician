const models = require('../models')
const async = require('async')

module.exports = (cb) => {
    console.log('yo')
    async.parallel([
      (next) => {
        models.Image.count({}, next)
      },
      (next) => {
        models.Comment.count({}, next)
      },
      (next) => {
        models.Image.aggregate({ $group: {
          _id: '1',
          viewsTotal: { $sum: '$views'}
        }})
        .then((result) => {
          let viewsTotal = 0
          if (result.length > 0) {
            viewsTotal += result[0].viewsTotal
          }
          next(null, viewsTotal)
        })
      },
      (next) => {
        models.Image.aggregate({ $group: {
          _id: '1',
          likesTotal: { $sum: '$likes'}
        }})
        .then((result) => {
          let likesTotal = 0
          if (result.length > 0) {
            likesTotal += result[0].likesTotal
          }
          next(null, likesTotal)
        })
      }
    ], (err, results) => {
      cb(null, {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
      })
    }
    )
  }
