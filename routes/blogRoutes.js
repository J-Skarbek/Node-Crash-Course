const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// This new method is querying all the items in the db collection
router.get('/blogs', (req, res) => {
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
})

router.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    })
  // console.log(req.body);
})

router.get('/all-blogs', (req, res) => {
  // .find() method will find and return items in the collection that 
  // exist in the Blog's model
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
})

router.get('/single-blog', (req, res) => {
  Blog.findById('659d70f147b2c210d73728d3')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
})

router.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details'});
    })
    .catch(err => console.log(err));
}) 

router.get('/new-blog', (req, res) => {
  res.render('create', { title: 'Create Blogs' });
})

router.delete('/blogs/:id', (req, res) => {
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
})

module.exports = router;