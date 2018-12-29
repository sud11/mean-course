const http = require('http');

// (req,res) {} is the func that gets called whenerver the http server gets a request
const server = http.createServer((req, res) => {

  res.end('This is my first response');

});

server.listen(process.env.PORT || 3000);
