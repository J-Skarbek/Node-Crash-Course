const express = require('express');

const app = express();
app.set('view engine', 'ejs');
// Note -- you can use app.set() with two parameters, the 1st being
// 'views' and the 2nd being the folder you want ejs/express to 'look in'
// to find your ejs files

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  //res.send('<p>homepage is here -- express app</p>');
  // The following sendFile() method is using an 'options' object to
  // pass in the root of the file being equal to the current directory;
  // this can also be used by using the express 'path' module as seen
  // in other examples

  //commenting this out to work with EJS views
  //  res.sendFile('./views/index.html', { root: __dirname });

  // The .render() method renders a view from ejs, just
  // need to provide the name of the view minus the file extension
  res.render('index')
})

app.get('/about', (req, res) => {
  //res.send('<p>About Page is here -- express app</p>');
  // res.sendFile('./views/about.html', { root: __dirname });

  res.render('about')
})

app.get('/blogs/create', (req, res) => {
  res.render('create');
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

  res.status(404).render('404');
}) 