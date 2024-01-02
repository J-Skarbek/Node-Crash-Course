const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// 1st argument takes a callback function, which runs anytime a request
// comes into this server we created. This callback function provided access
// to two objects: the request and response objects
const server = http.createServer((req, res) => {
  console.log('Request made');
  // console.log(req.url, req.method);

  // Lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('hello');
  });

  greet();

  // set Header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
      case '/':
        path += 'index.html';
        res.statusCode = 200; //This method lets us set status codes - success
        break;
      case '/about':
        path += 'about.html';
        res.statusCode = 200; //This method lets us set status codes - success
        break;
      case '/about-me':
        res.statusCode = 301; //This method lets us set status codes - permanant redirect
        res.setHeader('Location', '/about'); //This is taking 2 arguments, the capital-L 'Location' and the route we want to redirct to
        res.end(); //Need to explicitly add with a call to .end() on a redirect
        break;
      default:
        path += '404.html';
        res.statusCode = 404; //This method lets us set status codes - page not found
        break;
    }

  // Send an HTML file
  fs.readFile(path, (err, data) => {
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