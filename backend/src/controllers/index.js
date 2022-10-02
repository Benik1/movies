const fs = require('fs');
const path = require('path');
const { createBrotliCompress } = require('zlib');

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

    setTimeout(() => {
      res.end(jsonData);
    }, 1000);
  });
}

const addMovie = (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'data.json');

  fs.readFile(filePath, (error, jsonData) => {
    if(error) {
      res.writeHead(500);
      res.end(JSON.stringify('Internal server error'));
      return;
    }

    const movie = req.body;
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

      setTimeout(() => {
        res.end(JSON.stringify(newMovie));
      }, 1000);
    })
  });
}

module.exports = {
  addMovie,
  getAllMovies
}
