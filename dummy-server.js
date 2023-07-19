const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`Received a request: ${req.url}`);

  let requestBody = '';
  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  req.on('end', () => {
    console.log('Request body:', requestBody);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Test Status', group: 'Test Group' }, null, 3));
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
