const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
  // Note: with mongoose/MondoDB -- you don't need to add an _id property, as
  // it will be created automatically when creating new items in the collection

}, { timestamps: true })

// Timestamps: true option ojbect allows creation of auto timestamping

// 1st argument you add the blog name in mondo, the function will pluarize it and
// look for this collection in the connected DB.
// 2nd argument is the model we create above
const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog;