const mongoose = require('mongoose')
const Schema = mongoose.Schema
const path = require('path')

const ImageSchema = new Schema({
  title:          { type: String },
  description:    { type: String },
  filename:       { type: String },
  uniqueId:       { type: String },
  views:          { type: Number, 'default': 0 },
  likes:          { type: Number, 'default': 0 },
  timestamp:      { type: Date, 'default': Date.now() }
})

// ImageSchema.virtual('uniqueId')
// .get(() => {
//   console.log(`This is equal to: ${this}`)
//    if (this != undefined) {
//      return this.filename.replace(path.extname(this.filename), '')
//    } else {
//      return undefined
//    }
// })

module.exports = mongoose.model('Image', ImageSchema)
