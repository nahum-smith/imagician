const sidebar = require('../helpers/sidebar')
const ImageModel = require('../models').Image

module.exports = {
  index: (req, res) => {
    const viewModel = {
      images: []
    }
    ImageModel.find({}, {}, { sort: { timestamp: -1 }}, (err, images) => {
      if (err) throw err

      viewModel.images = images

      sidebar(viewModel, (viewModel) => {
        console.log('about to call sidebar')
        res.render('index', viewModel)
      })
    })
  }
}
