const fs = require('fs');
const path = require('path');

const getAllMovies = (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'data.json');

  fs.readFile(filePath, (error, jsonData) => {
    if(error) {
      res.writeHead(500);
      res.end(JSON.stringify('Internal server error'));
      return;
    }
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });
    res.end(jsonData);
  });
}

const addMovie = (req, res) => {
  let body = '';
  req.on('data', chunk => { body += chunk.toString('utf8') });

  req.on('end', () => {
    const filePath = path.join(__dirname, '..', '..', 'data.json');

    fs.readFile(filePath, (error, jsonData) => {
      if(error) {
        res.writeHead(500);
        res.end(JSON.stringify('Internal server error'));
        return;
      }

      const movie = JSON.parse(body);
      const fileData = JSON.parse(jsonData);
      const { movies } = fileData;
      const newMovie = { id: movies.length + 1, ...movie }
      movies.push(newMovie);
      const writingData = JSON.stringify(fileData);

      fs.writeFile(filePath, writingData, (error) => {
        if(error) {
          res.writeHead(500);
          res.end(JSON.stringify('Internal server error'));
          return;
        }

        res.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(newMovie));
      })
    });
  });
}

module.exports = {
  addMovie,
  getAllMovies
}
