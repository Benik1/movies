const { Movie } = require('../models');

const updateMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;
    const [_, movie] = await Movie.update(
      req.body,
      {
        where: { id: movieId },
        returning: true,
        plain: true
      }
    );
    res.json(movie);
  } catch(error) {
    res.status(500).json(error);
  }
}

const deleteMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;
    await Movie.destroy({ where: { id: movieId } });
    const movies = await Movie.findAll({
      order: [
        ['release_date', 'DESC']
      ],
    });
    res.json(movies);
  } catch(error) {
    res.status(500).json(error);
  }
}

const getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;
    const [movie] = await Movie.findAll({ where: { id: movieId } });
    res.json(movie);
  } catch(error) {
    res.status(500).json(error);
  }
}

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: [
        ['release_date', 'DESC']
      ],
    });
    res.json(movies);
  } catch(error) {
    res.status(500).json(error);
  }
}

const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json(movie);
  } catch(error) {
    res.status(500).json(error);
  }
}

module.exports = {
  addMovie,
  getMovieById,
  getAllMovies,
  deleteMovieById,
  updateMovieById
}
