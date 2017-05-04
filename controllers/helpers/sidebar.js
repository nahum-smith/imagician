const Stats = require('./stats')
const Images = require('./images')
const Comments = require('./comments')

module.exports = (viewModel, callback) => {
  viewModel.sidebar = {
    stats: Stats(),
    popular: Images.popular(),
    comments: Comments.newest()
  }
  callback(viewModel)
}
