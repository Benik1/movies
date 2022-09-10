const fs = require('fs');
const path = require('path');

const getAllMovies = (req, res) => {
  const dataPath = path.join(__dirname, '..', '..', 'data.json');

  fs.readFile(dataPath, (error, jsonData) => {
    if(error) {
      res.writeHead(500);
      res.end(JSON.stringify('Internal server error'));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(jsonData);
  });
}

const addMovie = (req, res) => {
  let body = '';
  req.on('data', chunk => { body += chunk.toString('utf8') });

  req.on('end', () => {
    const dataPath = path.join(__dirname, '..', '..', 'data.json');

    fs.readFile(dataPath, (error, jsonData) => {
      if(error) {
        res.writeHead(500);
        res.end(JSON.stringify('Internal server error'));
        return;
      }

      const movie = JSON.parse(body);
      const fileData = JSON.parse(jsonData);
      const { movies } = fileData;
      movies.push({ id: movies.length + 1, ...movie });

      const writingData = JSON.stringify(fileData);

      fs.writeFile(dataPath, writingData, (error) => {
        if(error) {
          res.writeHead(500);
          res.end(JSON.stringify('Internal server error'));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{success: true}');
      })
    });
  });
}

module.exports = {
  addMovie,
  getAllMovies
}
