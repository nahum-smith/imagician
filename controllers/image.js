const fs = require('fs')
const path = require('path')
const sidebar = require('../helpers/sidebar')
const Models = require('../models')
const md5 = require('MD5')


module.exports = {
  index: function(req, res) {
    const viewModel = {
        image: {},
        comments: []
      }
      Models.Image.findOne({ filename: {$regex: req.params.image_id} },
        (err, image) => {
          if (err) throw err
          if (image) {

            image.views += 1
            viewModel.image = image
            image.save()
            console.log('checking for comments')
            Models.Comment.find({
              image_id: image._id }, {},
              { sort: {'timestamp': 1}},
              (err, comments) => {
                console.log(comments)
                if (err) throw err
                viewModel.comments = comments
                sidebar(viewModel, (viewModel) => {
                  res.render('image', viewModel)
                })
            })
          } else {
            res.redirect('/')
          }

      })
  },
  create: (req, res) => {
    // console.log(req.files[0])
    // console.log(req.files)
    // console.log(req.files[0].originalname)
    const saveImage = () => {

      const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
      let imgUrl = ''

      for(let i = 0; i < 6; i++) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      Models.Image.find({ filename: imgUrl }, (err, images) => {
        if (images.length > 0) {
          saveImage()
        } else {

          let tempPath = req.files[0].path
          let ext = path.extname(req.files[0].originalname).toLowerCase()
          let targetPath = path.resolve('./public/upload/' + imgUrl + ext)

          if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {

            fs.rename(tempPath, targetPath, (err) => {
              if (err) throw err;

              const newImg = new Models.Image({
                title: req.body.title,
                filename: imgUrl + ext,
                uniqueId: imgUrl,
                description: req.body.description
              })
              newImg.save((err, image) => {
                res.redirect('/images/'+ image.uniqueId)
              })
            })

          } else {
            fs.unlink(tempPath, () => {
              if (err) throw err
              res.json(500, {error: 'Only image files are allowed.'});
            })
          }
        }
      })
    }
    saveImage()
  },
  like: (req, res) => {
    Models.Image.findOne({ filename: { $regex: req.params.image_id }},
    (err, image) => {
      if (!err && image) {
        image.likes ++
        image.save((err) => {
          if (err) {
            res.json(err)
          } else {
            res.json({ likes: image.likes })
          }
        })
      }
    })
  },
  comment: (req, res) => {
    Models.Image.findOne({ filename: { $regex: req.params.image_id }},
    (err, image) => {
      if (!err && image) {
        let newComment = new Models.Comment(req.body)
        newComment.gravatar = md5(newComment.email)
        newComment.image_id = image._id
        newComment.save((err, comment) => {
          if (err) throw err
          res.redirect(`/images/${image.uniqueId}#${comment._id}`)
        })
      } else {
        res.redirect('/')
      }
    })
  },
  remove: (req, res) => {
    console.log('entering the remove middleware')
    console.log(req.params.image_id)
    Models.Image.findOne({ filename: { $regex: req.params.image_id}})
    .then((image) => {
      console.log(image)
      fs.unlink(path.resolve(`./public/upload/${image.filename}`), (err) => {
        if (err) throw err
        Models.Comment.remove({ image_id: image._id}, (err) => {
          image.remove((err) => {
            if (!err) {
              res.json(true)
            } else {
              res.json(false)
            }
          })
        })
      })
    })
  }
}
