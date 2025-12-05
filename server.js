const https = require('https');
const fs = require('fs');
const path = require('path');

// Secure certificate check
function safeRead(file) {
  try {
    return fs.readFileSync(path.join(__dirname, file));
  } catch (err) {
    console.error('ERR_CERT_MISSING'); // short code for logs
    console.error('Required TLS files not found.');
    process.exit(1); // abort startup
  }
}

const options = {
  key: safeRead('server.key'),
  cert: safeRead('server.cert'),
};


const PORT = 8443;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
};

https.createServer(options, (req, res) => {
  if (req.url === '/data') {
    fs.readFile(path.join(__dirname, 'numberplates.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to read JSON file' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
    return;
  }

  let filePath = req.url;
  if (filePath === '/' || filePath === '') {
    filePath = '/index.html';
  }
  filePath = path.join(__dirname, filePath);

  fs.exists(filePath, (exists) => {
    if (!exists) {
      console.error('ERROR: 404 NOT FOUND');

      const notFoundPage = path.join(__dirname, '404.html');

      fs.readFile(notFoundPage, (err, content) => {
        if (err) {
          // If 404.html is missing or unreadable
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('NOT_FOUND');
          return;
        }

        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(content);
      });

      return;
    }


    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
}).listen(PORT, () => {
  console.log(`HTTPS server starting at https://localhost:${PORT}/`);
});
