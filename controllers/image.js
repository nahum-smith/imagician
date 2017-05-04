module.exports = {
  index: function(req, res) {
    res.render('image')
  },
  create: (req, res) => {
    res.send(`The image:create POST controller`)
  },
  like: (req, res) => {
    res.send(`The image:like controller`)
  },
  comment: (req, res) => {
    res.send(`The image:comment POST controller`)
  }
}
