const Blog = require('../models/blog');

const blog_index = (req, res) => {
   // Using -1 below sets the sort to descending order in the retunred results
   Blog.find().sort({ createdAt: -1 })
   .then((result) => {
     res.render('index', {
       title: 'All Blogs',
       blogs: result
     });
   })
   .catch((err) => {
     console.log(err);
   }) 
}

module.exports = {
  blog_index
}