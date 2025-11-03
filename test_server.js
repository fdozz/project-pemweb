const http = require('http');
const port = 3005;
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('test ok');
}).listen(port, () => console.log('Test server listening on', port));
