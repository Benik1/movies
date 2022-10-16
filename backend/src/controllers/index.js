const fs = require('fs');
const path = require('path');

const updateMovieById = (req, res) => {
  const { movieId } = req.params;

  const filePath = path.join(__dirname, '..', '..', 'data.json');
  fs.readFile(filePath, 'utf-8', (error, jsonData) => {
    if (error) {
      res.writeHead(500);
      res.end(JSON.stringify('Internal server error'));
      return;
    }
    const { movies } = JSON.parse(jsonData);

    const newMovies = movies.map(movie => {
      if (movie.id === Number(movieId)) {
        return { ...movie, ...req.body }
      }
      return movie;
    });

    fs.writeFile(filePath, JSON.stringify({ movies: newMovies }), (error) => {
      if (error) {
        res.writeHead(500);
        res.end(JSON.stringify('Internal server error'));
        return;
      }

      setTimeout(() => {
        res.json({ movies: newMovies });
      }, 1000);
    })

  })

}


const deleteMovieById = (req, res) => {
  const { movieId } = req.params;

  const filePath = path.join(__dirname, '..', '..', 'data.json');
  fs.readFile(filePath, 'utf-8', (error, jsonData) => {
    if (error) {
      res.writeHead(500);
      res.end(JSON.stringify('Internal server error'));
      return;
    }
    const { movies } = JSON.parse(jsonData);

    const newMovies = movies.filter(movie => movie.id !== Number(movieId));

    fs.writeFile(filePath, JSON.stringify({ movies: newMovies }), (error) => {
      if (error) {
        res.writeHead(500);
        res.end(JSON.stringify('Internal server error'));
        return;
      }

      setTimeout(() => {
        res.json({ movies: newMovies });
      }, 1000);
    })

  })
}

const getMovieById = (req, res) => {
  const { movieId } = req.params;
  const filePath = path.join(__dirname, '..', '..', 'data.json');
  fs.readFile(filePath, 'utf-8', (error, jsonData) => {
    if (error) {
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
    if (error) {
      res.writeHead(500);
      res.end(JSON.stringify('Internal server error'));
      return;
    }

    setTimeout(() => {
      res.json(JSON.parse(jsonData));
    }, 1000);
  });
}

const addMovie = (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'data.json');

  fs.readFile(filePath, (error, jsonData) => {
    if (error) {
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
      if (error) {
        res.writeHead(500);
        res.end(JSON.stringify('Internal server error'));
        return;
      }

      setTimeout(() => {
        res.json(newMovie);
      }, 1000);
    })
  });
}

module.exports = {
  addMovie,
  getMovieById,
  getAllMovies,
  deleteMovieById,
  updateMovieById
}
