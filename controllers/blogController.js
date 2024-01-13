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

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details'});
    })
    .catch(err => console.log(err));
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create Blogs' });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    })
  // console.log(req.body);
}

const blog_delete = (req, res) => {
  const id = req.params.id;

  // Because there is a front-end AJAX request that's sending the delete command
  // to the db, Node cannot directly respond (i.e. redirect) in the process, so we have
  // to send json or text data back to the browser that will send a redirect property
  // on a json object
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => console.log(err));
}

module.exports = {
  blog_index,
  blog_details, 
  blog_create_get,
  blog_create_post,
  blog_delete
}