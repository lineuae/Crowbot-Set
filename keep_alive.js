var http = require('http');

http.createServer(function (req, res) {
  res.write("Hey Line, don't worry i will always be by your side!");
  res.end();
}).listen(8080);
