const http = require('http');
const controllers = require('./controllers');

const { getAllMovies, addMovie } = controllers;

const PORT = 8000;

// Create a local server to receive data from
const server = http.createServer(
  (req, res) => {
    console.log('==== Incoming Request ====')
    console.log('url => ', req.url)
    console.log('method => ', req.method)

    if (req.url === '/movies') {
      switch (req.method) {
        case 'GET':
          getAllMovies(req, res);
          break;
        case 'POST':
          addMovie(req, res);
          break;
      }
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1> Not Found </h1>');
  }
);

server.listen(PORT, () => console.log(`Server running on ${PORT} port`));
