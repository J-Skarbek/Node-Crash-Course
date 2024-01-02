const express = require('express');

const app = express();

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  //res.send('<p>homepage is here -- express app</p>');
  // The following sendFile() method is using an 'options' object to
  // pass in the root of the file being equal to the current directory;
  // this can also be used by using the express 'path' module as seen
  // in other examples
  res.sendFile('./views/index.html', { root: __dirname });
})

app.get('/about', (req, res) => {
  //res.send('<p>About Page is here -- express app</p>');

  res.sendFile('./views/about.html', { root: __dirname });
})