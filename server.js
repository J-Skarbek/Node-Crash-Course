const http = require('http');
const fs = require('fs');

// 1st argument takes a callback function, which runs anytime a request
// comes into this server we created. This callback function provided access
// to two objects: the request and response objects
const server = http.createServer((req, res) => {
  console.log('Request made');
  console.log(req.url, req.method);

  // set Header content type
    res.setHeader('Content-Type', 'text/html');

  // Send an HTML file
  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.log(err);
      res.end(); // good practice to use this whenever a request is made and needs a response to prevent hanging in the browser
    } else {
      // res.write(data);
      // because we're only passing one element of data, this can be passed
      // through the res.end() method
      res.end(data);
    }
  })

  // // set header content
  //   res.write('<p>Hello, John S.</p>');
  //   res.write('<p>This is in HTML.</p>');
  // // send the header as a response in the browser
  //   res.end();
});

// .listen() method actually allows the server to listen for requests
// 1st argument is the port number -- 3000 is commonly used for local
// web development
// 2nd arugment is the hostname -- it's defaulted to 'localhost' but it's
// explicitily called in this example
// 3rd argument is a callback that fires whenever a request is made to the
//server

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
});