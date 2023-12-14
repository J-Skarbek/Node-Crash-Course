const http = require('http');


// This method acutally creates the server, and can be stored as
// const/let to use in advanced cases like creating web sockets

// 1st argument takes a callback function, which runs anytime a request
// comes into this server we created. This callback function provided access
// to two objects: the request and response objects
const server = http.createServer((req, res) => {
  console.log('Request made');
});

// .listen() method actually allows the server to listen for requests
// 1st argument is the port number
// 2nd arugment is the hostname -- it's defaulted to 'localhost' but it's
// explicitily called in this example
// 3rd argument is a callback that fires whenever a request is made to the
//server

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
})