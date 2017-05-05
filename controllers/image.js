const fs = require('fs')
const path = require('path')
const sidebar = require('../helpers/sidebar')

module.exports = {
  index: function(req, res) {
    const viewModel = {
        image: {
          uniqueId:         1,
          title:            'Sample Image 1',
          description:      'This is a sample.',
          filename:         'sample1.jpg',
          views:            0,
          likes:            0,
          timestamp:        Date.now()
        },
        comments: [
          {
            image_id:       1,
            email:          'test@testing.com',
            name:           'Test Tester',
            gravatar:       'http://lorempixel.com/75/75/animals/1',
            comment:        'This is a test comment...',
            timestamp:      Date.now()
          }, {
            image_id:       1,
            email:          'test@testing.com',
            name:           'Test Tester',
            gravatar:       'http://lorempixel.com/75/75/animals/2',
            comment:        'Another follow up comment!',
            timestamp:      Date.now()
          }
        ]
      }

      sidebar(viewModel, (viewModel) => {
        res.render('image', viewModel)
      })
  },
  create: (req, res) => {
    console.log(req.files[0])
    console.log(req.files)
    console.log(req.files[0].originalname)
    const saveImage = (req, res) => {

      const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
      let imgUrl = ''

      for(let i = 0; i < 6; i++) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      let tempPath = req.files[0].path
      console.log(tempPath)
      let ext = path.extname(req.files[0].originalname).toLowerCase()
      let targetPath = path.resolve('../public/upload/' + imgUrl + ext)

      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        fs.rename(tempPath, targetPath, (err) => {
          if (err) throw err;
          res.redirect('/images/'+ imgUrl)
        })
      } else {
        fs.unlink(tempPath, () => {
          if (err) throw err;
          res.json(500, {error: 'Only image files are allowed.'});
        })
      }
    }
    saveImage(req, res)
  },
  like: (req, res) => {
    res.json({likes: 1})
  },
  comment: (req, res) => {
    res.send(`The image:comment POST controller`)
  }
}
