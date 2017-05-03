module.exports = {
  index: (req, res) => {
    res.send(`The image:index controller ${req.params.image.id}`)
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
