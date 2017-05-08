const Stats = require('./stats')
const Images = require('./images')
const Comments = require('./comments')
const async = require('async')
console.log(Stats)

module.exports = (viewModel, callback) => {
  console.log('in sidebar helper now')
  async.parallel([
    (next) => {
      Stats(next)
    },
    (next) => {
      Images.popular(next);
    },
    (next) => {
      Comments.newest(next)
    }
  ], (err, results) => {
    console.log('results',results)

    viewModel.sidebar = {
      stats: results[0],
      popular: results[1],
      comments: results[2]
    }
    callback(viewModel)
  })
}
