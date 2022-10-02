const fs = require('fs');
const path = require('path');

const getMovieById = (req, res) => {
  const { movieId } = req.params;
  const filePath = path.join(__dirname, '..', '..', 'data.json');
  fs.readFile(filePath,  'utf-8', (error, jsonData) => {
    if(error) {
      res.writeHead(500);
      res.end(JSON.stringify('Internal server error'));
      return;
    }
    setTimeout(() => {
      const { movies } = JSON.parse(jsonData);
      const movie = movies?.find(movie => movie.id === Number(movieId)) || null;
      res.json(movie);
    }, 1000);
  })
}

const getAllMovies = (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'data.json');

  fs.readFile(filePath, (error, jsonData) => {
    if(error) {
      res.writeHead(500);
      res.end(JSON.stringify('Internal server error'));
      return;
    }

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
    const rate = Math.round(Math.random() * (10 - 1) + 1);
    const newMovie = { id: movies.length + 1, ...movie, rate }
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
  getMovieById,
  getAllMovies
}
