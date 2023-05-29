const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = 'C:\\Users\\admin\\Desktop\\capstone-project-frontend\\home\\home.html';

  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      res.statusCode = 500;
      res.end('Error loading HTML file');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      res.end(html);
    }
  });
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
