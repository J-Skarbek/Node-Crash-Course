const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const keys = requrire('keys.env');
const Blog = require('./models/blog')

const app = express();

//connection urls on local doc




app.set('view engine', 'ejs');
// Note -- you can use app.set() with two parameters, the 1st being
// 'views' and the 2nd being the folder you want ejs/express to 'look in'
// to find your ejs files

//listen for requests -- moved into the async function above, only runs once the db connection is made

// Middleware & static files

// This .static() method takes a folder name for it's argument, and makes the static
// files in it available to the front end
app.use(express.static('public'));


// Sample middleware that logs details -- will run on every request since it's at the top
// of the middleware list (ie. it's before other requests that explicitly return a response
// to the browser such as .get() requests.

// Commenting out to use Morgan middleware

// app.use((req, res, next) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);

//   // Once the above code runs, the browser tab is left in a state of hanging because
//   // the middleware isn't explicitly moving on to the next function, thus you need
//   // to add the .next() function
//   next();
// })

app.use(morgan('dev'));


// Mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  // Make sure to import the Blog object/constructor in top of file
  // Then pass in the correct params
  const blog = new Blog({
    title: 'New Blog',
    snippet: 'About my new blog...',
    body: 'More information about my blog...'
  });

  // blog.save() is an async function
  blog.save()
    .then((result) => {
      res.send(result)
      // Note, the result sent back is not the same thing as the object crated
      // above, with ' = new Blog() ' -- instead it sends back the fully fleshed-out
      // object that is created in the mongoDB collection
    })
    .catch((err) => {
      console.log(err)
    })
})


app.get('/', (req, res) => {
  //res.send('<p>homepage is here -- express app</p>');
  // The following sendFile() method is using an 'options' object to
  // pass in the root of the file being equal to the current directory;
  // this can also be used by using the express 'path' module as seen
  // in other examples

  //commenting this out to work with EJS views
  //  res.sendFile('./views/index.html', { root: __dirname });

  // You can pass in an array of data to a view like so
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];

  // The .render() method renders a view from ejs, just
  // need to provide the name of the view minus the file extension

  // res.render() can accept a data object as 2nd parameter which
  // can then be used dynamically in views pages
  res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
  //res.send('<p>About Page is here -- express app</p>');
  // res.sendFile('./views/about.html', { root: __dirname });

  res.render('about', { title: 'About Us' })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create Blogs' });
})

//404 handling

// The .use() method will fire on every request, but only if it the request
// reaches this point in the code (ie. is not handled by the previous .get() )
// methods -- if this went above the other route handlers, this .use() method
// would fire and it won't reacht the subsequent handlers
app.use((req, res) => {

  // For this line, you need to manually add the .status() method to 
  // send the correct status code to the browser
  // res.status(404).sendFile('./views/404.html', { root: __dirname });

  res.status(404).render('404', { title: 'Page Not Found!' });
}) 